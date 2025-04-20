import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, TextField, IconButton, Typography, List, ListItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';

const Chatbot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parkingLevels = useSelector(state => state.parking.levels);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your parking assistant. How can I help you with parking spot booking?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [bookingState, setBookingState] = useState({
    step: 0,
    level: null,
    slot: null
  });

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);

    // Handle booking flow
    if (input.toLowerCase().includes('book') || bookingState.step > 0) {
      handleBookingFlow(input);
    } else {
      // Regular chat responses
      const response = generateResponse(input.toLowerCase());
      setTimeout(() => {
        setMessages(prev => [...prev, { text: response, isBot: true }]);
      }, 500);
    }

    setInput('');
  };

  const getAvailableSpots = (level) => {
    const spots = parkingLevels[level];
    return spots.reduce((acc, spot, index) => {
      if (spot === null) acc.push(index + 1);
      return acc;
    }, []);
  };

  const handleBookingFlow = (userInput) => {
    switch (bookingState.step) {
      case 0:
        const availableLevels = Object.entries(parkingLevels)
          .filter(([_, spots]) => spots.some(spot => spot === null))
          .map(([level]) => level)
          .join(', ');

        setBookingState({ ...bookingState, step: 1 });
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            text: `Available levels are: ${availableLevels}. Which level would you prefer?`, 
            isBot: true 
          }]);
        }, 500);
        break;

      case 1:
        const level = userInput.toUpperCase();
        if (level >= 'A' && level <= 'H' && level.length === 1) {
          const availableSpots = getAvailableSpots(level);
          if (availableSpots.length === 0) {
            setTimeout(() => {
              setMessages(prev => [...prev, { 
                text: "Sorry, this level is full. Please choose another level.", 
                isBot: true 
              }]);
            }, 500);
          } else {
            setBookingState({ ...bookingState, step: 2, level });
            setTimeout(() => {
              setMessages(prev => [...prev, { 
                text: `Available spots in level ${level} are: ${availableSpots.join(', ')}. Please choose a spot number.`, 
                isBot: true 
              }]);
            }, 500);
          }
        } else {
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              text: "Please enter a valid level (A to H)", 
              isBot: true 
            }]);
          }, 500);
        }
        break;

      case 2:
        const slot = parseInt(userInput);
        const availableSpots = getAvailableSpots(bookingState.level);
        
        if (availableSpots.includes(slot)) {
          setBookingState({ step: 0, level: null, slot: null });
          navigate('/parking', {
            state: {
              level: bookingState.level,
              slot: slot - 1,
              fromChatbot: true,
              singleSlotView: true  // Add this flag
            }
          });
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              text: `Perfect! I'm taking you to book level ${bookingState.level}, slot ${slot}. Please confirm your booking details.`, 
              isBot: true 
            }]);
          }, 500);
        } else {
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              text: `Please choose from available spots: ${availableSpots.join(', ')}`, 
              isBot: true 
            }]);
          }, 500);
        }
        break;
    }
  };

  const generateResponse = (message) => {
    if (message.includes('book') || message.includes('slot')) {
      const availableLevels = Object.entries(parkingLevels)
        .filter(([_, spots]) => spots.some(spot => spot === null))
        .map(([level]) => level)
        .join(', ');
      
      setBookingState({ ...bookingState, step: 1 });
      return `I can help you book a parking spot. Available levels are: ${availableLevels}. Which level would you prefer?`;
    }
    if (message.includes('cancel')) {
      return "To cancel a booking, go to 'My Bookings' section and select the booking you want to cancel.";
    }
    if (message.includes('payment')) {
      return "We accept all major credit/debit cards and digital wallets for payment.";
    }
    return "I'm here to help! You can ask me about booking slots, cancellations, payments, or any other questions you have.";
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#1976d2',
          color: 'white',
          '&:hover': { backgroundColor: '#1565c0' }
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat window */}
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ p: 2, backgroundColor: '#1976d2', color: 'white' }}>
            <Typography variant="h6">Parking Assistant</Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: msg.isBot ? 'flex-start' : 'flex-end',
                    padding: '5px'
                  }}
                >
                  <Paper
                    sx={{
                      p: 1,
                      backgroundColor: msg.isBot ? '#f5f5f5' : '#e3f2fd',
                      maxWidth: '80%'
                    }}
                  >
                    <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                      {msg.text}
                    </Typography>
                  </Paper>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <IconButton onClick={handleSend} color="primary">
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Chatbot;