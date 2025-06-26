import { Flex, Box, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function Navbar() {
  return (
    <Flex
      as="nav"
      p={0}
      pl={4}
      pr={4}
      pt={2}
      justify="space-between"
      align="center"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <ChakraLink as={RouterLink} to="/" fontWeight="bold" fontSize="xl" color="white">
        Brandon Yang
      </ChakraLink>
      <HStack spacing={4} gap={5}>
        <ChakraLink href="#about" color="white" fontSize="xl">About</ChakraLink>
        <ChakraLink as={RouterLink} to="/galleries" color="white" fontSize="xl">Gallery</ChakraLink>
        <ChakraLink as={RouterLink} to="/contact" color="white" fontSize="xl">Contact</ChakraLink>
      </HStack>
    </Flex>
  )
}
export default Navbar