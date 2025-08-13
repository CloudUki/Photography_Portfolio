import { Flex, Box, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  
  return (
    <Box fontFamily={"'Playfair Display', serif"}>
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
        <ChakraLink as={RouterLink} to="/" fontSize="xl" color="#000">
          Brandon Yang
        </ChakraLink>
        <HStack spacing={4} gap={5}>
          {location.pathname === '/contact' ? (
            <ChakraLink as={RouterLink} to="/galleries" color="#000" fontSize="xl">
              Gallery
            </ChakraLink>
          ) : (
            <ChakraLink as={RouterLink} to="/contact" color="#000" fontSize="xl">
              Contact
            </ChakraLink>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}
export default Navbar