import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  inputValue: '',
  isTyping: false,
  showQuickQuestions: true,
  isOpen: false,
  hasNewMessage: false,
  botResponses: {
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
  - Essentials: 6 hours, 300+ photos ($700)
  - Premium: 8 hours, 500+ photos, engagement session ($800)  
  - Luxury: 10 hours, 800+ photos, engagement + bridal session ($1200)

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
      
      default: "I'm not sure about that specific question. You can ask me about rates, sessions, booking, or contact information. How can I help you?"
  }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Input management
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    
    clearInput: (state) => {
      state.inputValue = '';
    },
    
    // Message management
    addMessage: (state, action) => {
      state.messages.push({
        ...action.payload,
        timestamp: new Date().toISOString()
      });
    },
    
    initializeChat: (state) => {
      state.messages = [{
        text: state.botResponses.greeting,
        isBot: true,
        timestamp: new Date().toISOString()
      }];
    },
    
    // Typing indicator
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    
    // Quick questions visibility
    setShowQuickQuestions: (state, action) => {
      state.showQuickQuestions = action.payload;
    },
    
    hideQuickQuestions: (state) => {
      state.showQuickQuestions = false;
    },
    
    // Chat window state
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) {
        state.hasNewMessage = false;
      }
    },
    
    openChat: (state) => {
      state.isOpen = true;
      state.hasNewMessage = false;
    },
    
    closeChat: (state) => {
      state.isOpen = false;
    },
    
    // New message notification
    setHasNewMessage: (state, action) => {
      state.hasNewMessage = action.payload;
    },
    
    markMessagesAsRead: (state) => {
      state.hasNewMessage = false;
    }
  }
});

// Action creators
export const {
  setInputValue,
  clearInput,
  addMessage,
  initializeChat,
  setIsTyping,
  setShowQuickQuestions,
  hideQuickQuestions,
  toggleChat,
  openChat,
  closeChat,
  setHasNewMessage,
  markMessagesAsRead
} = chatSlice.actions;

// Selectors
export const selectMessages = (state) => state.chat.messages;
export const selectInputValue = (state) => state.chat.inputValue;
export const selectIsTyping = (state) => state.chat.isTyping;
export const selectShowQuickQuestions = (state) => state.chat.showQuickQuestions;
export const selectIsOpen = (state) => state.chat.isOpen;
export const selectHasNewMessage = (state) => state.chat.hasNewMessage;
export const selectBotResponses = (state) => state.chat.botResponses;

export const sendMessage = (messageText) => (dispatch, getState) => {
  const state = getState();
  const message = messageText || state.chat.inputValue;
  
  if (!message.trim()) return;

  // Add user message
  dispatch(addMessage({
    text: message,
    isBot: false
  }));
  
  dispatch(clearInput());
  dispatch(setIsTyping(true));
  dispatch(hideQuickQuestions());

  // Bot response delay
  setTimeout(() => {
    const botResponse = getBotResponse(message, state.chat.botResponses);
    
    dispatch(addMessage({
      text: botResponse,
      isBot: true
    }));
    
    dispatch(setIsTyping(false));
  }, 1000 + Math.random() * 1000);
};

// Helper function to get bot response
const getBotResponse = (message, botResponses) => {
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

export default chatSlice.reducer;