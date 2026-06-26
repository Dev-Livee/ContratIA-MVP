import { Box, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

export type VizPose =
  | 'greeting'    // 🦊 Inicio de sesión — saluda con la pata
  | 'celebrating' // 🎉 Registro exitoso — salta de alegría
  | 'searching'   // 🔍 Buscando — lupa y guiño
  | 'laptop'      // 💻 Laptop/tablet — analiza documentos
  | 'thinking'    // 🤔 Comparando — dedo en el mentón
  | 'sitting'     // 😕 Sin resultados / sin proyectos — sentado triste
  | 'waving'      // 👋 Saludando / señalando
  | 'checkmark'   // ✅ Proceso completado — sostiene check verde
  | 'meditating'  // 🧘 Carga general — ojos cerrados, meditando
  | 'error';      // 😅 Error de conexión — de espaldas

const float = keyframes`
  0%, 100% { transform: translateY(0px) }
  50% { transform: translateY(-6px) }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1) }
  50% { transform: scale(1.04) }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg) }
  25% { transform: rotate(-3deg) }
  75% { transform: rotate(3deg) }
`;

const POSE_ANIMATION: Record<VizPose, string> = {
  greeting:    `${wiggle} 2s ease-in-out infinite`,
  celebrating: `${wiggle} 0.8s ease-in-out infinite`,
  searching:   `${wiggle} 1.5s ease-in-out infinite`,
  laptop:      `${float} 3s ease-in-out infinite`,
  thinking:    `${pulse} 3s ease-in-out infinite`,
  sitting:     `${float} 4s ease-in-out infinite`,
  waving:      `${wiggle} 2s ease-in-out infinite`,
  checkmark:   `${pulse} 2s ease-in-out infinite`,
  meditating:  `${float} 3.5s ease-in-out infinite`,
  error:       `${float} 4s ease-in-out infinite`,
};

interface VizProps {
  pose: VizPose;
  size?: number | string;
}

export default function Viz({ pose, size = 120 }: VizProps) {
  const pxSize = typeof size === 'number' ? `${size}px` : size;
  const imageSrc = pose === 'greeting' ? '/viz.png' : `/viz/${pose}.png`;

  return (
    <Box w={pxSize} h={pxSize} flexShrink={0} position="relative">
      <Box
        position="absolute"
        inset="-10px"
        bgGradient="radial(circle, rgba(74, 222, 128, 0.3) 0%, rgba(74, 222, 128, 0) 70%)"
        filter="blur(10px)"
        borderRadius="full"
        zIndex={0}
      />
      <Box
        position="relative"
        w="100%"
        h="100%"
        borderRadius="full"
        bgGradient="linear(135deg, #f0fdf4 0%, #ffffff 80%)"
        p={2}
        border="1px solid"
        borderColor="brand.100"
        boxShadow="0 16px 40px rgba(22, 163, 74, 0.16)"
        overflow="hidden"
      >
        <Image
          src={imageSrc}
          alt={`Viz — ${pose}`}
          w="100%"
          h="100%"
          objectFit="contain"
          animation={POSE_ANIMATION[pose]}
          draggable={false}
          loading="eager"
        />
      </Box>
    </Box>
  );
}
