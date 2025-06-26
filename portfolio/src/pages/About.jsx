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
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
export default AboutMe