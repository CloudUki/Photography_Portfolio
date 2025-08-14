import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useEffect, useState, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import About from './About'

// animation keyframes
const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-20px) rotate(2deg) scale(1.05);
  }
  50% {
    transform: translateY(-30px) rotate(-1deg) scale(0.95);
  }
  75% {
    transform: translateY(-15px) rotate(1deg) scale(1.02);
  }
`;

const moveShape = keyframes`
  0% {
    transform: translateX(-50px) translateY(0) rotate(0deg);
  }
  25% {
    transform: translateX(50px) translateY(-30px) rotate(90deg);
  }
  50% {
    transform: translateX(100px) translateY(0) rotate(180deg);
  }
  75% {
    transform: translateX(25px) translateY(30px) rotate(270deg);
  }
  100% {
    transform: translateX(-50px) translateY(0) rotate(360deg);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function HomePage() {
    const images = [
        '/FullSTI.jpg',
        '/ASAHoco.jpg',
        '/porsche.jpg',
        '/LivCollin.jpg',
        '/MUTailGate.jpg'
    ]

    const [currentIndex, setCurrentIndex] = useState(0)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleFloatingImageClick = (e) => {

        const ripple = document.createElement('div')
        
        Object.assign(ripple.style, {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            transform: 'scale(0)',
            animation: 'ripple 0.8s ease-out',
            left: '50%',
            top: '50%',
            width: '30px',
            height: '30px',
            marginLeft: '-15px',
            marginTop: '-15px',
            pointerEvents: 'none'
        })
        
        e.currentTarget.appendChild(ripple)
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove()
            }
        }, 800)
    }

    const floatingImageConfigs = [
        { 
            top: '5%', 
            left: '8%', 
            delay: '0s', 
            duration: '8s',
            size: '35%',
            imageIndex: 1 // ASAHoco.jpg
        },
        { 
            top: '8%', 
            right: '5%', 
            delay: '2s', 
            duration: '10s',
            size: '35%',
            imageIndex: 2 // porsche.jpg
        },
        { 
            top: '65%', 
            left: '10%', 
            delay: '4s', 
            duration: '7s',
            size: '35%',
            imageIndex: 3 // LivCollin.jpg
        },
        { 
            top: '65%', 
            right: '5%', 
            delay: '1s', 
            duration: '9s',
            size: '35%',
            imageIndex: 4 // MUTailGate.jpg
        },
    ]

    return (
        <>
            <style>{`
            @keyframes ripple {
                to {
                transform: scale(6);
                opacity: 0;
                }
            }
            `}</style>

            <main>
            <Box
                as="section"
                position="relative"
                h="100vh"
                bg="#FAF9F8"
                overflow="hidden"
            >
                <Box as="aside" position="absolute" inset="0" pointerEvents="none" zIndex="2">
                {floatingImageConfigs.map((config, index) => (
                    <Box
                    key={index}
                    position="absolute"
                    w={config.size}
                    h={config.size}
                    cursor="pointer"
                    pointerEvents="auto"
                    animation={`${float} ${config.duration} ease-in-out infinite`}
                    _hover={{
                        transform: 'scale(1.1)',
                        filter: 'brightness(1.1)',
                    }}
                    transition="all 0.3s ease"
                    style={{
                        top: config.top,
                        left: config.left,
                        right: config.right,
                        animationDelay: config.delay,
                        transform: `translateY(${scrollY * (index + 1) * 0.3}px) rotate(${
                        scrollY * 0.05
                        }deg)`,
                    }}
                    onClick={handleFloatingImageClick}
                    >
                    <Image
                        src={images[config.imageIndex]}
                        alt={`Photography ${config.imageIndex + 1}`}
                        w= "100%"
                        h= "100%"
                        objectFit= "cover"
                        pointerEvents= "none"
                        filter= "drop-shadow(0 10px 20px rgba(0,0,0,0.15))"
                        loading = "eager"
                    />
                    </Box>
                ))}
                </Box>

                <VStack
                as="header"
                position="relative"
                zIndex="3"
                spacing={6}
                h="100%"
                align="center"
                justify="center"
                color="gray.800"
                textAlign="center"
                px={4}
                >
                <Heading
                    as="h1"
                    className='title'
                    fontSize={['3xl', '5xl']}
                    fontWeight="bold"
                    animation={`${fadeInUp} 1s ease-out`}
                    fontFamily={"playfair display, serif"}
                >
                    Brandon&apos;s Photography
                </Heading>
                <Text
                    as="p"
                    className='tagline'
                    fontSize="lg"
                    maxW="xl"
                    animation={`${fadeInUp} 1s ease-out 0.3s both`}
                    fontFamily={"playfair display, serif"}
                >
                    Capturing life through the lens.
                </Text>
                <Button
                    as={RouterLink}
                    className='gallery-button'
                    to="/galleries"
                    size="lg"
                    colorScheme="blue"
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontFamily={"playfair display, serif"}
                    borderRadius="full"
                    boxShadow="2xl"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: '1md' }}
                    _active={{ transform: 'scale(0.98)' }}
                    transition="all 0.3s ease"
                    animation={`${fadeInUp} 1s ease-out 0.6s both`}
                >
                    View Gallery
                </Button>
                </VStack>
            </Box>

            <section>
                <About />
            </section>
            </main>
        </>
    )

}

export default HomePage