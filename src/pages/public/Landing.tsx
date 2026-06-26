import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiHash,
  FiMapPin,
  FiSearch,
  FiShield,
} from 'react-icons/fi';
import PublicNavbar from '@/components/Layout/PublicNavbar';
import Hero3DBackground from '@/components/Common/Hero3DBackground';
import Viz from '@/components/Common/Viz';
import { DISTRICTS } from '@/utils/constants';

const EXAMPLE_CODES = ['COD-2025-0012', 'CUI-1234567', 'OBR-0001'];

const highlights = [
  {
    title: 'Busqueda en segundos',
    description:
      'Ingresa el codigo de obra o selecciona un distrito y obtiene informacion detallada de forma inmediata.',
    icon: FiSearch,
  },
  {
    title: 'Datos oficiales del Estado',
    description:
      'Toda la informacion proviene directamente de los sistemas de contratacion publica del Peru.',
    icon: FiShield,
  },
  {
    title: 'Seguimiento de riesgo',
    description:
      'Identifica obras con alertas de retraso, sobrecosto o irregularidades en tiempo real.',
    icon: FiBarChart2,
  },
];

const platformStats = [
  { value: '12,847', label: 'obras registradas' },
  { value: '89', label: 'distritos' },
  { value: 'Hoy', label: 'ultima actualizacion' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [distrito, setDistrito] = useState('');
  const [codigo, setCodigo] = useState('');

  const goToObras = () => {
    if (distrito) navigate(`/obras?distrito=${encodeURIComponent(distrito)}`);
    else navigate('/obras');
  };

  const goToCodigo = () => {
    if (codigo.trim()) navigate(`/obras/${codigo.trim().toUpperCase()}`);
  };

  return (
    <Box minH="100vh" bg="linear-gradient(180deg, #f0fdf4 0%, #ffffff 40%, #f8fafc 100%)">
      <PublicNavbar />

      {/* ── HERO ─────────────────────────────────────── */}
      <Box position="relative" py={{ base: 20, md: 28 }} overflow="hidden">
        <Hero3DBackground />
        <Container maxW="1100px" position="relative" zIndex={1}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={12}
            alignItems="center"
          >
            {/* Left — marketing copy */}
            <VStack
              align={{ base: 'center', lg: 'flex-start' }}
              spacing={6}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              <Badge
                px={4}
                py={2}
                borderRadius="full"
                bg="green.50"
                color="green.700"
                fontWeight="700"
                letterSpacing="0.1em"
                border="1px solid"
                borderColor="green.200"
                fontSize="xs"
                textTransform="uppercase"
              >
                Transparencia publica activa
              </Badge>

              <Heading
                as="h1"
                size={{ base: '3xl', md: '4xl', lg: '5xl' }}
                color="gray.900"
                fontWeight="900"
                lineHeight="1.06"
              >
                Toda contratacion publica,{' '}
                <Box as="span" color="green.600">
                  visible para todos.
                </Box>
              </Heading>

              <Text
                color="gray.600"
                fontSize={{ base: 'md', md: 'lg' }}
                maxW="500px"
                lineHeight="1.75"
              >
                Consulta el avance, estado y riesgos de obras de infraestructura
                en tiempo real. Informacion oficial, directa y sin intermediarios.
              </Text>

              <HStack
                spacing={4}
                flexWrap="wrap"
                justify={{ base: 'center', lg: 'flex-start' }}
              >
                <Button
                  size="lg"
                  bg="green.600"
                  color="white"
                  _hover={{ bg: 'green.700', transform: 'translateY(-1px)' }}
                  transition="all 0.2s"
                  onClick={goToObras}
                  rightIcon={<Icon as={FiArrowRight} />}
                  px={8}
                >
                  Explorar obras
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="green.500"
                  color="green.700"
                  _hover={{ bg: 'green.50' }}
                  onClick={() => navigate('/auth/login')}
                >
                  Acceder como entidad
                </Button>
              </HStack>
            </VStack>

            {/* Right — stats card + mascot */}
            <VStack spacing={5} align="center">
              <Box
                bg="white"
                borderRadius="2xl"
                p={5}
                boxShadow="0 20px 60px rgba(0,0,0,0.09)"
                border="1px solid"
                borderColor="gray.100"
                w="100%"
                maxW="360px"
              >
                <Flex align="center" mb={5}>
                  <Box
                    w={2}
                    h={2}
                    bg="green.400"
                    borderRadius="full"
                    mr={2}
                    flexShrink={0}
                  />
                  <Text fontSize="sm" fontWeight="700" color="green.700">
                    Plataforma en linea
                  </Text>
                </Flex>

                <SimpleGrid columns={3} gap={4} mb={4}>
                  <VStack spacing={0} textAlign="center">
                    <Text fontSize="xl" fontWeight="800" color="gray.900">
                      12,847
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      obras
                    </Text>
                  </VStack>
                  <VStack spacing={0} textAlign="center">
                    <Text fontSize="xl" fontWeight="800" color="gray.900">
                      89
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      distritos
                    </Text>
                  </VStack>
                  <VStack spacing={0} textAlign="center">
                    <Text fontSize="xl" fontWeight="800" color="green.600">
                      100%
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      transparente
                    </Text>
                  </VStack>
                </SimpleGrid>

                <Box
                  pt={4}
                  borderTop="1px solid"
                  borderColor="gray.100"
                >
                  <Text fontSize="xs" color="gray.400">
                    Informacion oficial actualizada en tiempo real
                  </Text>
                </Box>
              </Box>

              <Viz pose="greeting" size={280} rounded={false} />
            </VStack>
          </Grid>
        </Container>
      </Box>

      {/* ── SEARCH MODULE ────────────────────────────── */}
      <Container maxW="1100px" pb={16}>
        <Box
          bg="linear-gradient(135deg, #064E3B 0%, #065F46 55%, #047857 100%)"
          borderRadius="3xl"
          p={{ base: 7, md: 12 }}
          boxShadow="0 40px 80px rgba(6, 78, 59, 0.3), 0 0 0 1px rgba(74,222,128,0.12)"
        >
          {/* Header */}
          <VStack spacing={2} textAlign="center" mb={9}>
            <Text
              color="green.300"
              fontWeight="700"
              fontSize="xs"
              letterSpacing="0.16em"
              textTransform="uppercase"
            >
              Busqueda oficial de obras publicas
            </Text>
            <Heading color="white" fontWeight="800" size="xl">
              Encuentra cualquier obra al instante
            </Heading>
            <Text color="green.100" maxW="460px" fontSize="md" lineHeight="1.65">
              El codigo de obra es la forma mas directa y precisa de acceder
              a toda la informacion de un contrato publico.
            </Text>
          </VStack>

          {/* PRIMARY — code search */}
          <Box mb={8}>
            <HStack spacing={3} align="stretch" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
              <InputGroup flex={1} minW={0}>
                <InputLeftElement h="64px" pl={5}>
                  <Icon as={FiHash} color="green.500" boxSize={5} />
                </InputLeftElement>
                <Input
                  placeholder="Ingresa el codigo de obra — ej: COD-2025-0012"
                  value={codigo}
                  onChange={e => setCodigo(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && goToCodigo()}
                  bg="white"
                  color="gray.900"
                  fontFamily="mono"
                  fontSize={{ base: 'sm', md: 'md' }}
                  h="64px"
                  borderRadius="2xl"
                  border="3px solid transparent"
                  _focus={{
                    border: '3px solid',
                    borderColor: '#4ade80',
                    boxShadow: 'none',
                  }}
                  _placeholder={{ color: 'gray.400' }}
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  pl="54px"
                />
              </InputGroup>
              <Button
                h="64px"
                px={8}
                bg="#22c55e"
                color="white"
                fontSize="md"
                fontWeight="700"
                borderRadius="2xl"
                flexShrink={0}
                _hover={{ bg: '#16a34a', transform: 'translateY(-1px)' }}
                transition="all 0.2s"
                onClick={goToCodigo}
                isDisabled={!codigo.trim()}
                rightIcon={<Icon as={FiArrowRight} />}
                w={{ base: '100%', md: 'auto' }}
              >
                Buscar obra
              </Button>
            </HStack>

            {/* Example chips */}
            <HStack mt={3} spacing={2} flexWrap="wrap">
              <Text color="green.400" fontSize="xs" fontWeight="600">
                Prueba con:
              </Text>
              {EXAMPLE_CODES.map(ex => (
                <Box
                  key={ex}
                  as="button"
                  onClick={() => setCodigo(ex)}
                  px={3}
                  py={1}
                  bg="rgba(255,255,255,0.08)"
                  color="green.200"
                  borderRadius="full"
                  fontSize="xs"
                  fontFamily="mono"
                  border="1px solid rgba(255,255,255,0.14)"
                  cursor="pointer"
                  _hover={{ bg: 'rgba(255,255,255,0.16)' }}
                  transition="all 0.15s"
                >
                  {ex}
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Divider */}
          <Flex align="center" gap={4} mb={8}>
            <Box flex={1} h="1px" bg="rgba(255,255,255,0.1)" />
            <Text
              color="green.400"
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.12em"
              textTransform="uppercase"
              flexShrink={0}
            >
              O busca por distrito
            </Text>
            <Box flex={1} h="1px" bg="rgba(255,255,255,0.1)" />
          </Flex>

          {/* SECONDARY — district search */}
          <HStack spacing={3} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
            <Box position="relative" flex={1} minW={0}>
              <Box
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                pointerEvents="none"
                zIndex={1}
              >
                <Icon as={FiMapPin} color="green.300" boxSize={4} />
              </Box>
              <Select
                placeholder="Selecciona un distrito..."
                value={distrito}
                onChange={e => setDistrito(e.target.value)}
                h="52px"
                bg="rgba(255,255,255,0.1)"
                color="white"
                borderRadius="xl"
                border="1px solid rgba(255,255,255,0.2)"
                pl="40px"
                _focus={{
                  borderColor: '#4ade80',
                  boxShadow: '0 0 0 1px #4ade80',
                }}
                sx={{
                  option: { color: '#111827', background: 'white' },
                }}
              >
                {DISTRICTS.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </Box>
            <Button
              h="52px"
              px={7}
              variant="outline"
              borderColor="rgba(255,255,255,0.3)"
              color="white"
              borderRadius="xl"
              flexShrink={0}
              _hover={{ bg: 'rgba(255,255,255,0.1)' }}
              onClick={goToObras}
              rightIcon={<Icon as={FiArrowRight} />}
              w={{ base: '100%', md: 'auto' }}
            >
              Ver obras
            </Button>
          </HStack>

          {/* Platform stats */}
          <SimpleGrid
            columns={3}
            gap={6}
            mt={10}
            pt={7}
            borderTop="1px solid rgba(255,255,255,0.08)"
          >
            {platformStats.map(s => (
              <VStack key={s.label} spacing={0} textAlign="center">
                <Text color="white" fontWeight="800" fontSize={{ base: 'xl', md: '2xl' }}>
                  {s.value}
                </Text>
                <Text color="green.300" fontSize="xs">
                  {s.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Container>

      {/* ── BENEFITS ─────────────────────────────────── */}
      <Container maxW="1100px" pb={16}>
        <VStack mb={8} spacing={2} textAlign="center">
          <Text
            fontSize="xs"
            fontWeight="700"
            color="green.600"
            textTransform="uppercase"
            letterSpacing="0.12em"
          >
            Por que ContrataIA
          </Text>
          <Heading size="lg" color="gray.900" fontWeight="800">
            Transparencia que genera confianza
          </Heading>
          <Text color="gray.500" maxW="520px" fontSize="md">
            Una plataforma pensada para ciudadanos, entidades y empresas que
            necesitan datos claros sobre el gasto publico.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {highlights.map(item => (
            <Box
              key={item.title}
              bg="white"
              borderRadius="2xl"
              p={6}
              border="1px solid"
              borderColor="gray.100"
              boxShadow="sm"
              _hover={{ boxShadow: 'md', transform: 'translateY(-3px)', borderColor: 'green.200' }}
              transition="all 0.22s"
            >
              <Box
                p={3}
                bg="green.50"
                borderRadius="xl"
                w="fit-content"
                mb={4}
                border="1px solid"
                borderColor="green.100"
              >
                <Icon as={item.icon} boxSize={5} color="green.600" />
              </Box>
              <Text fontWeight="700" color="gray.800" mb={2} fontSize="md">
                {item.title}
              </Text>
              <Text fontSize="sm" color="gray.500" lineHeight="1.65">
                {item.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* ── FOOTER ───────────────────────────────────── */}
      <Box bg="gray.900" py={5} textAlign="center">
        <Text fontSize="sm" color="gray.400">
          ContrataIA Peru &mdash; Plataforma de transparencia en contrataciones publicas
        </Text>
      </Box>
    </Box>
  );
}
