import { Box, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Viz, { VizPose } from './Viz';

const MotionVStack = motion(VStack);

interface VizMessageProps {
  pose: VizPose;
  message: string;
  size?: number;
  animate?: boolean;
}

export default function VizMessage({ pose, message, size = 120, animate = true }: VizMessageProps) {
  const Wrapper = animate ? MotionVStack : VStack;
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Wrapper
      spacing={3}
      align="center"
      py={6}
      {...(animProps as Record<string, unknown>)}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        px={4}
        py={3}
        borderWidth="1px"
        borderColor="brand.100"
        boxShadow="0 12px 30px rgba(22, 163, 74, 0.12)"
      >
        <VStack spacing={2}>
          <Viz pose={pose} size={size} />
          <Box
            bg="brand.50"
            borderRadius="xl"
            px={4}
            py={3}
            borderWidth="1px"
            borderColor="brand.100"
            maxW="320px"
          >
            <Text fontSize="sm" color="gray.700" fontWeight="600" textAlign="center">
              {message}
            </Text>
          </Box>
        </VStack>
      </Box>
    </Wrapper>
  );
}
