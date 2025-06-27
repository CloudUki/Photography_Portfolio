import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import '../styles/about.css'


function AboutMe() {
  return (
    <Box p={8} id="about">
      <Heading mb={6} textAlign="center">About Me</Heading>
        <Flex
            direction={['column', 'column', 'row']}
            align="center"
            justify="center"
            gap={8}
        >
        <Image
          src="/profile.JPG"
          alt="Brandon Yang"
          borderRadius="md"
          boxSize="300px"
          objectFit="cover"
        />
        <Box maxW="600px">
          <Text fontSize="xl">
            Hi, I'm <strong>Brandon Yang</strong>, a passionate photographer based in the United States.
            I’m a Software Engineer by day, but I love capturing moments through my lens in my free time.
            I also worked a student photographer for Moravian University from 2023 - 2025, where I was working within the Office of Marketing and Communications.
          </Text>
          <Text fontSize="xl" mt={4}>
            This portfolio showcases some of my favorite work, and I hope it gives you a glimpse into my world through photography.
          </Text>
          <Text fontSize="xl" mt={4}>
            Feel free to connect with me on social media or reach out via email if you have any questions or just want to chat about photography!
          </Text>
        <Flex mt={6} gap={4}>
            <a href="mailto:brandon.yang1210@gmail.com" target="_blank" rel="noopener noreferrer">
                <Text color="white.500" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                    Email
                </Text>
            </a>
            <a href="https://www.linkedin.com/in/brandonyyang/" target="_blank" rel="noopener noreferrer">
                <Text color="white.500" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                    LinkedIn
                </Text>
            </a>
        </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
export default AboutMe