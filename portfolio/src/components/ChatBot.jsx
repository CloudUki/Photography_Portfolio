import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  selectMessages,
  selectInputValue,
  selectIsTyping,
  selectShowQuickQuestions,
  selectIsOpen,
  selectHasNewMessage,
  setInputValue,
  initializeChat,
  toggleChat,
  sendMessage,
  setHasNewMessage
} from '../store/chatSlice';

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
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const inputValue = useAppSelector(selectInputValue);
  const isTyping = useAppSelector(selectIsTyping);
  const showQuickQuestions = useAppSelector(selectShowQuickQuestions);
  const isOpen = useAppSelector(selectIsOpen);
  const hasNewMessage = useAppSelector(selectHasNewMessage);
  
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(initializeChat());
  }, [dispatch]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      dispatch(setHasNewMessage(true));
    }
  }, [messages, isOpen, dispatch]);

  const handleSendMessage = (messageText = null) => {
    dispatch(sendMessage(messageText));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleToggleChat = () => {
    dispatch(toggleChat());
  };

  const handleInputChange = (e) => {
    dispatch(setInputValue(e.target.value));
  };

  return (
    <>
      {/* Chat Button */}
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={9999}
      >
        <IconButton
          onClick={handleToggleChat}
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

      {/* Chatbot Window */}
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
                  onClick={handleToggleChat}
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
                  onChange={handleInputChange}
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