import { Sprout } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="bg-primary text-primary-foreground p-4 border-b shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-primary-foreground/10 p-2 rounded-full">
          <Sprout className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold">കൃഷി സഹായി (Krishi Sahaayi)</h1>
          <p className="text-primary-foreground/80 text-sm">
            Your Multilingual Farming Assistant • Malayalam | English | Hindi
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;