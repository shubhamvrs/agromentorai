import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onVoiceClick: () => void;
}

const ChatInput = ({ onSendMessage, isLoading, onVoiceClick }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-background border-t border-border">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="നിങ്ങളുടെ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക... (Type your farming question here...)"
        className="flex-1 border-border focus:ring-primary text-base"
        disabled={isLoading}
      />
      <Button 
        type="button"
        size="icon" 
        variant="outline"
        className="shrink-0"
        onClick={onVoiceClick}
        disabled={isLoading}
      >
        <Mic className="h-4 w-4" />
      </Button>
      <Button 
        type="submit" 
        size="icon" 
        className="bg-primary hover:bg-primary/90 transition-colors shrink-0"
        disabled={!message.trim() || isLoading}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;