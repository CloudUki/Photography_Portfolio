import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'
import { Box, Heading, Text, SimpleGrid, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import Navbar from '@/components/NavBar'

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
        <Heading mb={4}>Galleries</Heading>
        {galleries.map(gallery => (
            <Box key={gallery.id} mb={3}>
            <Link as={RouterLink} to={`/gallery/${gallery.id}`}>
                <Text fontSize="xl">{gallery.name}</Text>
            </Link>
            </Box>
        ))}
        </Box>
    )
}