import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import About from './About'
import Navbar from '@/components/NavBar'

function HomePage() {
    const images = [
    '/FullSTI.jpg',
    '/ASAHoco.jpg',
    '/porsche.jpg',
    '/LivCollin.jpg',
    '/MUTailGate.jpg'
]

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Box
        position="relative"
        h="100vh"
        bgImage={`url(${images[currentIndex]})`}
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
        <Navbar padding="0" />
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
            Brandon's Photography
            </Heading>
            <Text fontSize="lg" maxW="xl">
            Capturing life through the lens — a curated showcase of my best moments and visual stories.
            </Text>
        </VStack>
        <About />
        </Box>
    )
}
export default HomePage