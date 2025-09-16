import { Sprout } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="bg-primary text-primary-foreground p-4 border-b shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-primary-foreground/10 p-2 rounded-full">
          <Sprout className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">AgroMentorAi</h1>
          <p className="text-primary-foreground/80 text-sm">
            Your Smart Farming Assistant • Malayalam | English | Hindi
          </p>
          <div className="flex gap-3 mt-1">
            <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">📱 WhatsApp Ready</span>
            <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">🔌 Works Offline</span>
            <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">👨‍🌾 Local Experts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;