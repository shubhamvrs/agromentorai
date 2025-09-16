import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Mock responses in Malayalam and English for demonstration
const mockResponses = [
  {
    keywords: ['കീടനാശിനി', 'pesticide', 'കീടം', 'pest'],
    response: 'കീടനാശിനി ഉപയോഗിക്കുമ്പോൾ സുരക്ഷാ നിർദ്ദേശങ്ങൾ പാലിക്കണം. അളവ് ശ്രദ്ധിച്ച് ഉപയോഗിക്കുക. For pest control, use organic neem oil or consult your local agricultural officer for appropriate pesticides.',
  },
  {
    keywords: ['നെൽകൃഷി', 'rice', 'അരി', 'paddy'],
    response: 'നെൽകൃഷിക്ക് മതിയായ വെള്ളവും വളവും ആവശ്യമാണ്. മൺസൂൺ കാലത്ത് നടുക. Rice cultivation requires proper water management and fertilization. Plant during monsoon season for best results.',
  },
  {
    keywords: ['വള', 'fertilizer', 'കമ്പോസ്റ്റ്', 'compost'],
    response: 'ജൈവ വളം ഉപയോഗിക്കുന്നത് മണ്ണിന്റെ ആരോഗ്യത്തിന് നല്ലതാണ്. കമ്പോസ്റ്റ് വളം തയ്യാറാക്കാം. Organic fertilizers improve soil health. You can prepare compost at home using kitchen waste and farm residues.',
  },
  {
    keywords: ['കാലാവസ്ഥ', 'weather', 'മഴ', 'rain'],
    response: 'കാലാവസ്ഥാ വ്യതിയാനത്തോട് പൊരുത്തപ്പെടാൻ കൃഷി രീതികൾ മാറ്റണം. Weather monitoring is important for farming. Use weather apps and follow meteorological department updates for better crop planning.',
  },
];

const getRandomResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Find matching response based on keywords
  const matchingResponse = mockResponses.find(response =>
    response.keywords.some(keyword => lowerMessage.includes(keyword))
  );
  
  if (matchingResponse) {
    return matchingResponse.response;
  }
  
  // Default responses
  const defaultResponses = [
    'നിങ്ങളുടെ ചോദ്യം രസകരമാണ്! കൂടുതൽ വിവരങ്ങൾ തരാമോ? That\'s an interesting question! Could you provide more details?',
    'കൃഷിയുമായി ബന്ധപ്പെട്ട കൂടുതൽ വിവരങ്ങൾക്ക് പ്രാദേശിക കൃഷി ഓഫീസറുമായി ബന്ധപ്പെടുക. For detailed farming information, please consult your local agricultural officer.',
    'എനിക്ക് നിങ്ങളെ സഹായിക്കാൻ കഴിയും! കൂടുതൽ വിശദമായി ചോദിക്കൂ. I can help you! Please ask more specific questions about farming.',
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി സഹായിയാണ്. എന്തെങ്കിലും കൃഷി സംബന്ധമായ സംശയങ്ങൾ ചോദിക്കൂ!\n\nHello! I\'m your farming assistant. Ask me any agriculture-related questions in Malayalam, English, or Hindi!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(messageText),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-chat-background">
      <ChatHeader />
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-2">
        <div className="space-y-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-bot-message border border-border rounded-2xl rounded-bl-md px-4 py-3 max-w-[75%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatBot;