import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ImageUpload from './ImageUpload';
import ExpertConnect from './ExpertConnect';
import VoiceAssistant from './VoiceAssistant';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Users, X } from 'lucide-react';

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
      text: 'നമസ്കാരം! ഞാൻ AgroMentorAi ആണ്! നിങ്ങളുടെ സ്മാർട്ട് കൃഷി സഹായി. ചിത്രങ്ങൾ അപ്‌ലോഡ് ചെയ്യുക, ചോദ്യങ്ങൾ ചോദിക്കുക അല്ലെങ്കിൽ പ്രാദേശിക വിദഗ്ധരുമായി സംസാരിക്കുക!\n\nHello! I\'m AgroMentorAi, your smart farming assistant. Upload crop images, ask questions, or connect with local experts!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showExpertConnect, setShowExpertConnect] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
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
    setShowSuggestions(false);

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

  const handleImageUpload = (imageData: string, description: string) => {
    const imageMessage: Message = {
      id: Date.now().toString(),
      text: `📸 Image uploaded: ${description}`,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, imageMessage]);
    setIsLoading(true);
    setShowImageUpload(false);

    // Simulate AI image analysis
    setTimeout(() => {
      const analysisResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'ചിത്രം വിശകലനം ചെയ്തു! നിങ്ങളുടെ വിളയിൽ ഇലപ്പൊള്ളൽ രോഗത്തിന്റെ ലക്ഷണങ്ങൾ കാണുന്നു. കോപ്പർ സൾഫേറ്റ് സ്പ്രേ ചെയ്യുക.\n\nImage analyzed! I can see signs of leaf blight in your crop. Spray copper sulfate solution for treatment. Also ensure proper drainage and avoid overhead watering.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, analysisResponse]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-chat-background">
      <ChatHeader />
      
      {/* Feature Buttons */}
      <div className="flex gap-2 px-4 py-2 border-b border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowImageUpload(!showImageUpload)}
          className="gap-2"
        >
          <Camera className="h-4 w-4" />
          Upload Image
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowExpertConnect(!showExpertConnect)}
          className="gap-2"
        >
          <Users className="h-4 w-4" />
          Local Experts
        </Button>
      </div>

      {/* Image Upload Panel */}
      {showImageUpload && (
        <Card className="mx-4 my-2 p-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => setShowImageUpload(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <ImageUpload onImageUpload={handleImageUpload} />
        </Card>
      )}

      {/* Expert Connect Panel */}
      {showExpertConnect && (
        <Card className="mx-4 my-2 p-4 relative max-h-80 overflow-y-auto">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => setShowExpertConnect(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <ExpertConnect />
        </Card>
      )}
      
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
          
          {showSuggestions && messages.length === 1 && (
            <div className="space-y-3 my-4">
              <p className="text-muted-foreground text-sm text-center">Try these common questions:</p>
              <div className="grid gap-2">
                {[
                  "എന്റെ നെൽവയലിൽ കീടങ്ങളുണ്ട്, എന്ത് ചെയ്യാം? (Pests in my rice field)",
                  "മുളക് കൃഷിക്ക് എത്ര വള വേണം? (Fertilizer for chili cultivation)", 
                  "കാലാവസ്ഥ മാറുമ്പോൾ എന്ത് ശ്രദ്ധിക്കണം? (Weather change precautions)"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion.split('(')[0].trim())}
                    className="text-left p-3 bg-muted/50 hover:bg-muted rounded-lg border border-border text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
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

      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        onVoiceClick={() => setShowVoiceAssistant(true)}
      />
      
      <VoiceAssistant 
        isOpen={showVoiceAssistant}
        onClose={() => setShowVoiceAssistant(false)}
      />
    </div>
  );
};

export default ChatBot;