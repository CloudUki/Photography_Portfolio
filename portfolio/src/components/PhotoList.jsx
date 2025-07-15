import { useParams, Link as RouterLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'
import { Image, SimpleGrid, Box, Text, Heading, Button } from '@chakra-ui/react'
import Footer from '@/components/Footer'

function GalleryPage() {
  const { id } = useParams()
  const [photos, setPhotos] = useState([])
  const [gallery, setGallery] = useState(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('gallery_id', id)

      if (error) console.error('Error fetching photos:', error)
      else setPhotos(data)
    }

    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .eq('id', id)
        .single()

      if (error) console.error('Error fetching gallery:', error)
      else setGallery(data)
    }

    fetchPhotos()
    fetchGallery()
  }, [id])

  // grabbing color from db or default to white
  const bgColor = gallery?.theme_color || '#00000'

  return (
    <Box p={4} minHeight="100vh" bg={bgColor}>
      <Button mb={4} as={RouterLink} to="/galleries" colorScheme="blue">
        Back to Galleries
      </Button>

      {gallery && (
        <Heading mb={6} textAlign="center">
          {gallery.name}
        </Heading>
      )}

      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {photos.map((photo) => (
          <Box key={photo.id} overflow="hidden" borderRadius="md" boxShadow="sm">
            <Image
              loading="eager"
              src={photo.image_url}
              alt={photo.caption || 'Photo'}
              objectFit="cover"
              width="100%"
            />
          </Box>
        ))}
      </SimpleGrid>

      <Footer />
    </Box>
  )
}

export default GalleryPage