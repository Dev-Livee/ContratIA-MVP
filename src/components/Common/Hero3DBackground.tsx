import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type NodeData = {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  vel: THREE.Vector3;
};

export default function Hero3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const NODE_COUNT = 72;
    const SPREAD_X = 20;
    const SPREAD_Y = 12;
    const SPREAD_Z = 4;
    const CONNECT_DIST = 4.6;

    const positions = Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD_X,
        (Math.random() - 0.5) * SPREAD_Y,
        (Math.random() - 0.5) * SPREAD_Z - 1
      )
    );

    const sharedGeo = new THREE.SphereGeometry(0.055, 8, 8);

    const nodeData: NodeData[] = positions.map((pos, i) => {
      const isWhite  = i % 5 === 0;
      const isMid    = i % 3 === 0;
      const color    = isWhite ? 0xffffff : isMid ? 0x4ade80 : 0x22c55e;
      const opacity  = isWhite ? 0.7 : 0.92;
      const mat      = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh     = new THREE.Mesh(sharedGeo, mat);
      mesh.position.copy(pos);
      scene.add(mesh);
      return {
        mesh,
        mat,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.007,
          (Math.random() - 0.5) * 0.006,
          0
        ),
      };
    });

    // Single pre-allocated LineSegments buffer — no GC pressure per frame
    const MAX_LINES = 800;
    const linePosArray = new Float32Array(MAX_LINES * 6);
    const lineGeo     = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePosArray, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute('position', linePosAttr);
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0.2,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      nodeData.forEach(({ mesh, vel }, i) => {
        const pos = positions[i];
        pos.addScaledVector(vel, 1);
        if (pos.x < -SPREAD_X / 2 || pos.x > SPREAD_X / 2) vel.x *= -1;
        if (pos.y < -SPREAD_Y / 2 || pos.y > SPREAD_Y / 2) vel.y *= -1;
        mesh.position.copy(pos);
        const s = 1 + Math.sin(t * 1.8 + i * 0.85) * 0.22;
        mesh.scale.setScalar(s);
      });

      let lc = 0;
      for (let i = 0; i < NODE_COUNT && lc < MAX_LINES; i++) {
        for (let j = i + 1; j < NODE_COUNT && lc < MAX_LINES; j++) {
          if (positions[i].distanceTo(positions[j]) < CONNECT_DIST) {
            const b = lc * 6;
            linePosArray[b]     = positions[i].x;
            linePosArray[b + 1] = positions[i].y;
            linePosArray[b + 2] = positions[i].z;
            linePosArray[b + 3] = positions[j].x;
            linePosArray[b + 4] = positions[j].y;
            linePosArray[b + 5] = positions[j].z;
            lc++;
          }
        }
      }
      linePosAttr.needsUpdate = true;
      lineGeo.setDrawRange(0, lc * 2);

      camera.position.x = Math.sin(t * 0.06) * 0.4;
      camera.position.y = Math.cos(t * 0.08) * 0.25;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      sharedGeo.dispose();
      nodeData.forEach(({ mat }) => mat.dispose());
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
