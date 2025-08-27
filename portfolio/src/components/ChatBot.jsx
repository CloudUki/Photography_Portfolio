import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Flex,
  Badge,
  IconButton,
  Wrap,
  WrapItem,
  Spinner,
  Avatar
} from '@chakra-ui/react';
import {useColorModeValue} from "@/components/ui/color-mode";
import { Send, Camera, Clock, DollarSign, Calendar, MapPin, MessageCircle, X, Minimize2 } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const botBubbleColor = useColorModeValue('gray.100', 'gray.700');
  const userBubbleColor = useColorModeValue('blue.500', 'blue.300');

  const quickQuestions = [
    { text: "What are your rates?", icon: DollarSign },
    { text: "Do you do weddings?", icon: Camera },
    { text: "How long is a session?", icon: Clock },
    { text: "What's included?", icon: Calendar },
    { text: "When do I get my photos?", icon: Clock },
    { text: "Do you travel?", icon: MapPin }
  ];

  const botResponses = {
    greeting: "Hi! 👋 I'm here to help with your photography questions. How can I assist you today?",
    
    rates: `My photography rates vary by session type:

    Portrait Sessions: $150-300
    Engagement: $350-500
    Weddings: $700-1200
    Events: $50-120/hour
    Cars: $100-200

    Would you like details about a specific type of session?`,

        weddings: `I have yet to shoot a wedding! I am open to doing wedding photography.

    Wedding Packages:
    • Essentials: 6 hours, 300+ photos ($700)
    • Premium: 8 hours, 500+ photos, engagement session ($800)  
    • Luxury: 10 hours, 800+ photos, engagement + bridal session ($1200)

    All packages include online gallery and photos emailed. Would you like to schedule?`,
        
        duration: `Session lengths depend on the type:

    Portrait sessions: 1-2 hours
    Engagement sessions: 1.5-2 hours
    Wedding coverage: 6-10 hours
    Event photography: 2-6 hours
    Car shoots: 1-2 hours

    This gives us plenty of time for variety and different lighting!`,
        
        included: `Here's what's typically included:

    Professional editing of all photos
    Online gallery for easy sharing
    High-resolution digital downloads
    Print release for personal use
    Pre-session consultation
    Wardrobe and location guidance

    Physical prints and albums available separately!`,
        
        turnaround: `You'll receive your photos:

    Sneak peeks: 24-48 hours
    Full gallery: 2-3 weeks for portraits
    Wedding galleries: 4-6 weeks

    I believe in quality over speed - every photo is carefully edited!`,
        
        travel: `Yes, I'm available for travel! 

    Local area (within 30 miles): No extra charge
    Destination sessions: Custom quote including travel

    I love exploring new locations for unique photos!`,
        
        booking: `Ready to book? Here's how:

    1. Email brandon.yang1210@gmail.com, or follow me on Instagram @brandony_photography
    2. We'll discuss your vision and needs
    3. Sign contract and pay 50% retainer
    4. Plan your session details
    5. Capture amazing photos!

    Would you like my contact information?`,
        
        contact: `Here's how to reach me:

    Email: brandon.yang1210@gmail.com
    Phone: (717) 723-1227
    Based in: Lancaster, PA

    I typically respond within 24 hours!`,

        portfolio: `You can view my work on this website or my Instagram brandony_photography:

    I'd love to show you examples for your specific needs!`,
  };

  const getResponse = (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('how much')) {
      return botResponses.rates;
    }
    if (msg.includes('wedding')) {
      return botResponses.weddings;
    }
    if (msg.includes('how long') || msg.includes('duration') || msg.includes('session')) {
      return botResponses.duration;
    }
    if (msg.includes('include') || msg.includes('get') || msg.includes('package')) {
      return botResponses.included;
    }
    if (msg.includes('when') || msg.includes('delivery') || msg.includes('receive') || msg.includes('turnaround')) {
      return botResponses.turnaround;
    }
    if (msg.includes('travel') || msg.includes('location') || msg.includes('distance')) {
      return botResponses.travel;
    }
    if (msg.includes('book') || msg.includes('schedule') || msg.includes('appointment')) {
      return botResponses.booking;
    }
    if (msg.includes('contact') || msg.includes('reach') || msg.includes('phone') || msg.includes('email')) {
      return botResponses.contact;
    }
    if (msg.includes('portfolio') || msg.includes('work') || msg.includes('photos') || msg.includes('examples')) {
      return botResponses.portfolio;
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return botResponses.greeting;
    }
    
    return botResponses.default;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([{
      text: botResponses.greeting,
      isBot: true,
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleSendMessage = (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowQuickQuestions(false);

    setTimeout(() => {
      const botResponse = {
        text: getResponse(messageText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {/* Button */}
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={9999}
      >
        <IconButton
          onClick={toggleChat}
          size="lg"
          colorScheme="blue"
          borderRadius="full"
          boxShadow="2xl"
          w="60px"
          h="60px"
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: '3xl'
          }}
          transition="all 0.3s ease"
          position="relative"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          
          {hasNewMessage && !isOpen && (
            <Box
              position="absolute"
              top="-2px"
              right="-2px"
              w="12px"
              h="12px"
              bg="red.500"
              borderRadius="full"
              border="2px solid white"
            />
          )}
        </IconButton>
      </Box>

      {/* Chatbot */}
      {isOpen && (
        <Box
          position="fixed"
          bottom="100px"
          right="20px"
          w={{ base: "calc(100vw - 40px)", md: "400px" }}
          maxW="400px"
          zIndex={9998}
          transform="translateY(0)"
          transition="all 0.3s ease-in-out"
        >
          <Box
            bg={bgColor}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
            shadow="2xl"
            h="500px"
            display="flex"
            flexDirection="column"
            overflow="hidden"
            transform={isOpen ? "scale(1)" : "scale(0.95)"}
            transition="all 0.3s ease-out"
          >
            {/* Header */}
            <Box
              bgGradient="linear(to-r, blue.500, purple.600)"
              color="white"
              p={4}
            >
              <HStack spacing={3}>
                <Avatar.Root size="sm">
                  <Avatar.Fallback name="Photography Assistant" />
                  <Avatar.Image src="/FullSTI.jpg" alt="Photography Assistant" />
                </Avatar.Root>
                <VStack spacing={0} align="start" flex={1}>
                  <Text fontWeight="bold" fontSize="sm">
                    Photography Assistant
                  </Text>
                  <Text fontSize="xs" opacity={0.9}>
                    Ask me about sessions & pricing
                  </Text>
                </VStack>
                <Badge colorScheme="green">
                  Online
                </Badge>
                <IconButton
                  size="sm"
                  variant="ghost"
                  color="whiteAlpha.800"
                  _hover={{ color: "white", bg: "whiteAlpha.200" }}
                  onClick={toggleChat}
                  icon={<Minimize2 size={16} />}
                />
              </HStack>
            </Box>

            {/* Messages */}
            <Box
              flex={1}
              p={4}
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'gray.300',
                  borderRadius: '24px',
                },
              }}
            >
              <VStack spacing={3} align="stretch">
                {messages.map((message, index) => (
                  <Flex
                    key={index}
                    justify={message.isBot ? 'flex-start' : 'flex-end'}
                  >
                    <Box
                      maxW="85%"
                      px={4}
                      py={3}
                      borderRadius="lg"
                      bg={message.isBot ? botBubbleColor : userBubbleColor}
                      color={message.isBot ? 'inherit' : 'white'}
                      whiteSpace="pre-line"
                      fontSize="sm"
                      lineHeight="1.5"
                      borderBottomLeftRadius={message.isBot ? 'sm' : 'lg'}
                      borderBottomRightRadius={message.isBot ? 'lg' : 'sm'}
                    >
                      {message.text}
                    </Box>
                  </Flex>
                ))}
                
                {isTyping && (
                  <Flex justify="flex-start">
                    <HStack
                      bg={botBubbleColor}
                      px={4}
                      py={3}
                      borderRadius="lg"
                      borderBottomLeftRadius="sm"
                    >
                      <Spinner size="sm" />
                      <Text fontSize="sm" color="gray.600">
                        Typing...
                      </Text>
                    </HStack>
                  </Flex>
                )}
                <div ref={messagesEndRef} />
              </VStack>
            </Box>

            {/* Quick Questions */}
            {showQuickQuestions && (
              <Box px={4} pb={2}>
                <Box h="1px" bg={borderColor} mb={3} />
                <Text fontSize="xs" color="gray.500" mb={2}>
                  Quick questions:
                </Text>
                <Wrap spacing={2}>
                  {quickQuestions.map((question, index) => {
                    const IconComponent = question.icon;
                    return (
                      <WrapItem key={index}>
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<IconComponent size={14} />}
                          onClick={() => handleQuickQuestion(question.text)}
                          fontSize="xs"
                          h="auto"
                          py={2}
                          borderRadius="full"
                          _hover={{
                            bg: 'blue.50',
                            borderColor: 'blue.300'
                          }}
                        >
                          {question.text}
                        </Button>
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </Box>
            )}

            {/* Input */}
            <Box p={4} bg={useColorModeValue('gray.50', 'gray.900')}>
              <HStack spacing={2}>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about photography..."
                  borderRadius="full"
                  bg={bgColor}
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 1px blue.400'
                  }}
                />
                <IconButton
                  onClick={() => handleSendMessage()}
                  colorScheme="blue"
                  borderRadius="full"
                  icon={<Send size={18} />}
                  isDisabled={!inputValue.trim()}
                />
              </HStack>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Chatbot;