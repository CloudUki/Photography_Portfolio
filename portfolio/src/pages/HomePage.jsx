import {
  Box,
  Heading,
  Text,
  Button,
  VStack
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function HomePage() {
    return (
        <Box
        position="relative"
        h="100vh"
        bgImage="url('/FullSTI.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        >
        <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="blackAlpha.700"
            zIndex="1"
        />

        <VStack
            position="relative"
            zIndex="2"
            spacing={6}
            h="100%"
            align="center"
            justify="center"
            color="white"
            textAlign="center"
            px={4}
        >
            <Heading fontSize={['3xl', '5xl']} fontWeight="bold">
            Brandon Yang Photography
            </Heading>
            <Text fontSize="lg" maxW="xl">
            Capturing life through the lens — a curated showcase of my best moments and visual stories.
            </Text>
            <Button as={RouterLink} to="/galleries" colorScheme="whiteAlpha" size="lg">
            View Galleries
            </Button>
        </VStack>
        </Box>
    )
}
export default HomePage