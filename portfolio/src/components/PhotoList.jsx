import { useParams, Link as RouterLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'
import { Image, SimpleGrid, Box, Text, Heading, Button } from '@chakra-ui/react'

function GalleryPage() {
  const { id } = useParams()
  const [photos, setPhotos] = useState([])

  useEffect(() => {
  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('gallery_id', id)

    if (error) {
      console.error('Error fetching photos:', error)
    } else {
      // console.log('✅ photos from DB:', data)
      setPhotos(data)
    }
  }

  fetchPhotos()
  // console.log('URL gallery ID:', id);
  // console.log('Photos from DB:', photos);
}, [id])


  return (
    <Box p={4}>
      <Button mb={4} as={RouterLink} to="/galleries" colorScheme="blue">
        Back to Galleries
      </Button>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {photos.map((photo) => (
          <Box key={photo.id} overflow="hidden" borderRadius="md" boxShadow="sm">
            <Image
              loading='lazy'
              src={photo.image_url}
              alt={photo.caption || 'Photo'}
              objectFit="cover"
              width="100%"
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
export default GalleryPage