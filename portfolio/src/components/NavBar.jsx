import { Flex, Box, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function Navbar() {
  return (
    <Flex
      as="nav"
      p={4}
      justify="space-between"
      align="center"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <ChakraLink as={RouterLink} to="/" fontWeight="bold" fontSize="xl" color="white">
        Brandon Yang
      </ChakraLink>
      <HStack spacing={4}>
        <ChakraLink as={RouterLink} to="/about" color="white" fontSize="xl">About</ChakraLink>
      </HStack>
    </Flex>
  )
}
export default Navbar