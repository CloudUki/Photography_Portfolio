import Navbar from '@/components/NavBar'
import { Box, Heading, Text, VStack, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Contact() {
  return (
    <Box minH="91vh" bg="#FAF9F8" fontFamily={"'Playfair Display', serif"} color="#000">
      <Navbar />
      <VStack 
        spacing={6} 
        align="center" 
        justify="center" 
        minH="80vh"
        px={4}
      >
        <Heading fontSize="4xl" fontFamily={"'Playfair Display', serif"}>
          Let's Get in Touch!
        </Heading>
        
        <Text fontSize="xl" textAlign="center">
          For inquiries, please email me at: <Link href="mailto:brandon.yang1210@gmail.com" color="#000">brandon.yang1210@gmail.com</Link>
        </Text>
        
        <Text fontSize="xl" textAlign="center">
          Or connect with me on social media:
        </Text>
        
        <VStack spacing={4}>
          <Link href="https://www.instagram.com/brandony_photography/" isExternal color="#000" fontSize="xl" target='_blank'>
            Instagram
          </Link>
          <Link href="https://www.linkedin.com/in/brandonyyang/" isExternal color="#000" fontSize="xl" target="_blank">
            LinkedIn
          </Link>
        </VStack>
      </VStack>
    </Box>
  )
}