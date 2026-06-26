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
import { FiArrowRight, FiBarChart2, FiCheckCircle, FiHash, FiMapPin, FiSearch, FiShield } from 'react-icons/fi';
import PublicNavbar from '@/components/Layout/PublicNavbar';
import Hero3DBackground from '@/components/Common/Hero3DBackground';
import Viz from '@/components/Common/Viz';
import VizMessage from '@/components/Common/VizMessage';
import { DISTRICTS } from '@/utils/constants';

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

  const highlights = [
    {
      title: 'Consulta rápida',
      description: 'Encuentra obras por distrito o por código en segundos.',
      icon: FiMapPin,
      accent: 'brand.100',
    },
    {
      title: 'Datos claros',
      description: 'Revisa estado, riesgo y avance sin complicaciones.',
      icon: FiBarChart2,
      accent: 'green.100',
    },
    {
      title: 'Más confianza',
      description: 'Una vista más transparente para ciudadanos, entidades y empresas.',
      icon: FiShield,
      accent: 'teal.100',
    },
  ];

  return (
    <Box minH="100vh" bg="linear-gradient(180deg, #f8fff9 0%, #ffffff 45%, #f7fcf8 100%)">
      <PublicNavbar />

      <Box position="relative" py={{ base: 20, md: 28 }} overflow="hidden">
        <Hero3DBackground />
        <Container maxW="1100px" position="relative" zIndex={1}>
          <Grid templateColumns={{ base: '1fr', lg: '0.95fr 1fr' }} gap={10} alignItems="center">
            <VStack align="flex-start" spacing={5} textAlign={{ base: 'center', lg: 'left' }} maxW="560px">
              <Badge px={4} py={2} borderRadius="full" bg="brand.100" color="brand.700" fontWeight="800" letterSpacing="0.08em">
                Viz está en línea
              </Badge>
              <Heading
                as="h1"
                size={{ base: '3xl', md: '4xl', lg: '5xl' }}
                color="gray.900"
                fontWeight="900"
                lineHeight="1.02"
              >
                Conversa con Viz y encuentra la obra pública que necesitas.
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }} maxW="560px">
                Una interfaz más humana con respuestas claras, búsquedas por distrito o código y una experiencia visual poderosa.
              </Text>
              <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', lg: 'flex-start' }}>
                <Button size="lg" bg="brand.700" color="white" _hover={{ bg: 'brand.800' }} onClick={goToObras}>
                  Explorar obras
                </Button>
                <Button size="lg" variant="outline" borderColor="brand.600" color="brand.700" _hover={{ bg: 'brand.50' }} onClick={() => navigate('/auth/login')}>
                  Acceder como entidad
                </Button>
              </HStack>
            </VStack>

            <Box position="relative" maxW="full" mx="auto" py={{ base: 10, md: 0 }}>
              <Box
                position="absolute"
                top="20%"
                left="50%"
                transform="translateX(-50%)"
                w="360px"
                h="360px"
                bg="rgba(74, 222, 128, 0.18)"
                borderRadius="full"
                filter="blur(120px)"
                zIndex={0}
              />
              <Box
                position="absolute"
                top="32%"
                right="12%"
                w="180px"
                h="180px"
                bg="rgba(16, 185, 129, 0.12)"
                borderRadius="full"
                filter="blur(90px)"
                zIndex={0}
              />
              <Box
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={{ base: 0, md: 0 }}
                minH="420px"
              >
                <Viz pose="greeting" size={320} />

                <Box
                  position="absolute"
                  bottom="12%"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="white"
                  borderRadius="3xl"
                  px={5}
                  py={4}
                  boxShadow="0 30px 70px rgba(15, 23, 42, 0.14)"
                  maxW="360px"
                  textAlign="left"
                  border="1px solid rgba(226, 232, 240, 0.9)"
                >
                  <Flex align="center" mb={3}>
                    <Box w={10} h={10} borderRadius="full" bg="green.100" mr={3} />
                    <Text fontWeight="700" color="brand.700">Viz responde en vivo</Text>
                  </Flex>
                  <Text fontSize="md" fontWeight="700" color="gray.900" mb={2}>
                    “¡Hola! Dime qué proyecto buscas y te llevo directo al detalle.”
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Disponible para ayudarte con datos claros y búsquedas inmediatas.
                  </Text>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Container maxW="1100px" pb={16}>
        <Box bg="white" borderRadius="3xl" p={{ base: 6, md: 8 }} border="1px solid rgba(22, 163, 74, 0.14)" boxShadow="0 30px 60px rgba(15, 23, 42, 0.08)" mb={10}>
          <Text fontSize="sm" fontWeight="700" color="brand.700" textAlign="center">
            Búsqueda rápida
          </Text>
          <Text fontSize="3xl" fontWeight="800" color="gray.900" mt={4} textAlign="center">
            Busca tu obra por distrito o por código oficial.
          </Text>
          <Text color="gray.600" maxW="640px" mx="auto" mt={3} textAlign="center">
            Usa el formulario a continuación para iniciar tu búsqueda con estilo y velocidad.
          </Text>
        </Box>

        <Box
          bg="rgba(255, 255, 255, 0.92)"
          borderRadius="3xl"
          p={{ base: 5, md: 6 }}
          border="1px solid rgba(226, 232, 240, 0.9)"
          boxShadow="0 30px 60px rgba(15, 23, 42, 0.08)"
        >
          <VStack spacing={5} align="stretch">
            <Box bg="brand.50" borderRadius="2xl" p={5} border="1px solid rgba(72, 187, 120, 0.16)">
              <Text fontSize="sm" fontWeight="700" color="gray.800" mb={4}>Por distrito</Text>
              <Select
                placeholder="Selecciona un distrito"
                value={distrito}
                onChange={e => setDistrito(e.target.value)}
                bg="white"
                size="lg"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.2)' }}
              >
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </Select>
              <Button mt={5} w="100%" size="lg" bg="brand.600" color="white" _hover={{ bg: 'brand.700' }} rightIcon={<FiArrowRight />} onClick={goToObras}>
                Ver obras cercanas
              </Button>
            </Box>

            <Box bg="white" borderRadius="2xl" p={5} border="1px solid rgba(226, 232, 240, 0.9)">
              <Text fontSize="sm" fontWeight="700" color="gray.800" mb={3}>Por código</Text>
              <Text fontSize="xs" color="gray.500" mb={3}>Ejemplo: <Text as="span" fontFamily="mono" color="brand.700">COD-2025-0012</Text></Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="brand.500" />
                </InputLeftElement>
                <Input
                  placeholder="COD-2025-0012"
                  value={codigo}
                  onChange={e => setCodigo(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && goToCodigo()}
                  bg="gray.50"
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="transparent"
                  _focus={{ bg: 'white', borderColor: 'brand.400', boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.18)' }}
                  fontFamily="mono"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  px={12}
                  py={6}
                />
              </InputGroup>
              <Button
                mt={5}
                w="100%"
                size="lg"
                bgGradient="linear(to-r, brand.500, brand.600)"
                color="white"
                _hover={{ bgGradient: 'linear(to-r, brand.600, brand.700)' }}
                onClick={goToCodigo}
                isDisabled={!codigo.trim()}
                rightIcon={<FiArrowRight />}
              >
                Buscar obra
              </Button>
            </Box>
          </VStack>
        </Box>
      </Container>

      <Container maxW="1100px" pb={16}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
          {highlights.map(item => (
            <Box key={item.title} bg="white" borderRadius="xl" p={5} borderWidth="1px" borderColor="gray.100" boxShadow="sm">
              <Box p={2.5} bg={item.accent} borderRadius="lg" w="fit-content" mb={3}>
                <Icon as={item.icon} boxSize={5} color="brand.700" />
              </Box>
              <Text fontWeight="700" color="gray.800" mb={1}>{item.title}</Text>
              <Text fontSize="sm" color="gray.600">{item.description}</Text>
            </Box>
          ))}
        </SimpleGrid>

        <Box bg="white" borderRadius="2xl" p={{ base: 6, md: 8 }} borderWidth="1px" borderColor="gray.100" boxShadow="sm">
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap={4}>
            <Box maxW="560px">
              <Text fontSize="sm" fontWeight="700" color="brand.600">Tu experiencia, mejor organizada</Text>
              <Heading as="h2" size="lg" color="gray.900" mt={2}>
                Menos ruido, más claridad para tomar decisiones informadas.
              </Heading>
              <Text color="gray.600" mt={3}>
                Desde ciudadanos que buscan información hasta entidades y empresas que necesitan seguimiento, la plataforma está pensada para ser intuitiva y útil.
              </Text>
            </Box>
            <VStack align="flex-start" spacing={2}>
              {['Búsqueda intuitiva', 'Información centralizada', 'Seguimiento más claro'].map(item => (
                <HStack key={item} spacing={2}>
                  <Icon as={FiCheckCircle} color="brand.600" />
                  <Text color="gray.700" fontWeight="500">{item}</Text>
                </HStack>
              ))}
            </VStack>
          </Flex>
        </Box>
      </Container>

      <Container maxW="1100px" pb={10}>
        <Flex justify="center">
          <VizMessage pose="greeting" message="¡Hola! Soy Viz, tu guía para encontrar información de obras públicas de forma simple y rápida." size={90} />
        </Flex>
      </Container>

      <Box bg="gray.900" py={5} textAlign="center">
        <Text fontSize="sm" color="gray.400">
          ContrataIA Perú — Plataforma de transparencia en contrataciones públicas
        </Text>
      </Box>
    </Box>
  );
}
