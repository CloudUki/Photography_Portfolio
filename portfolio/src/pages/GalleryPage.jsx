import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'
import { Box, Heading, Text, SimpleGrid, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function GalleryList() {
  const [galleries, setGalleries] = useState([])

  useEffect(() => {
    const fetchGalleries = async () => {
      const { data, error } = await supabase.from('galleries').select('*')
      if (error) console.error(error)
      else setGalleries(data)
    }

    fetchGalleries()
  }, [])


  return (
    <Box p={4}>
      <Navbar />
      <Heading mb={6} textAlign="center">
        Gallery
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {galleries.map((gallery) => (
          <Link
            as={RouterLink}
            to={`/gallery/${gallery.id}`}
            key={gallery.id}
            _hover={{ textDecoration: 'none' }}
          >

            <Box position="relative" h="330px" width="100%"> 
                <img 
                    src={gallery.cover_image} 
                    alt={gallery.name}
                    style={{
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                    }}
                />
              <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bg="blackAlpha.600"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                  px={4}
                >
                  {gallery.name}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
        <Footer mt={8} />
    </Box>
  )
}