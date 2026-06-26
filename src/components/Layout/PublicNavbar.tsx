import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <Box
      as="nav"
      bg="rgba(255,255,255,0.92)"
      backdropFilter="blur(18px)"
      borderBottomWidth="1px"
      borderColor="rgba(15, 23, 42, 0.08)"
      h="72px"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} h="100%" align="center" justify="space-between">
        <RouterLink to="/">
          <Box>
            <Text
              fontWeight="800"
              fontSize={{ base: 'lg', md: '2xl' }}
              bgGradient="linear(to-r, brand.600, brand.700)"
              bgClip="text"
            >
              ContrataIA
            </Text>
            <Text fontSize="xs" fontWeight="500" color="gray.500" letterSpacing="0.08em" mt={0.5}>
              Transparencia pública
            </Text>
          </Box>
        </RouterLink>

        <Button
          size="sm"
          bg="brand.600"
          color="white"
          _hover={{ bg: 'brand.700' }}
          onClick={() => navigate('/auth/login')}
        >
          Acceder
        </Button>
      </Flex>
    </Box>
  );
}
