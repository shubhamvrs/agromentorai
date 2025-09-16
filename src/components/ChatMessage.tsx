interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-user-message text-user-message-foreground rounded-br-md'
            : 'bg-bot-message text-bot-message-foreground rounded-bl-md border border-border'
        } transition-all duration-200 animate-in slide-in-from-bottom-1`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
          {message}
        </p>
        <p className={`text-xs mt-2 ${isUser ? 'text-user-message-foreground/70' : 'text-muted-foreground'}`}>
          {timestamp.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;