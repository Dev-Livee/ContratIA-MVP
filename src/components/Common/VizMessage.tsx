import { Box, Text, VStack } from '@chakra-ui/react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import Viz, { VizPose } from './Viz';

const MotionDiv = motion.div;

interface VizMessageProps {
  pose: VizPose;
  message: string;
  size?: number;
  animate?: boolean;
}

export default function VizMessage({ pose, message, size = 120, animate = true }: VizMessageProps) {
  const animProps: HTMLMotionProps<'div'> = animate
    ? { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }
    : {};

  return (
    <MotionDiv style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }} {...animProps}>
      <Box bg="white" borderRadius="2xl" px={4} py={3} borderWidth="1px" borderColor="brand.100" boxShadow="0 12px 30px rgba(22, 163, 74, 0.12)">
        <VStack spacing={2}>
          <Viz pose={pose} size={size} />
          <Box bg="brand.50" borderRadius="xl" px={4} py={3} borderWidth="1px" borderColor="brand.100" maxW="320px">
            <Text fontSize="sm" color="gray.700" fontWeight="600" textAlign="center">{message}</Text>
          </Box>
        </VStack>
      </Box>
    </MotionDiv>
  );
}
