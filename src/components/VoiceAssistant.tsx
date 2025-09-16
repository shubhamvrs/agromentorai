import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, MicOff } from 'lucide-react';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceAssistant = ({ isOpen, onClose }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Initialize dots
    const initialDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 200,
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    setDots(initialDots);

    // Animate dots
    const interval = setInterval(() => {
      setDots(prev => prev.map(dot => ({
        ...dot,
        x: (dot.x + dot.vx + 200) % 200,
        y: (dot.y + dot.vy + 200) % 200,
        vx: dot.vx + (Math.random() - 0.5) * 0.1,
        vy: dot.vy + (Math.random() - 0.5) * 0.1,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card rounded-2xl p-8 shadow-xl border border-border max-w-md w-full mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Voice Assistant</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Animated Ball */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary/30">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {dots.map(dot => (
                <circle
                  key={dot.id}
                  cx={dot.x}
                  cy={dot.y}
                  r={isListening ? Math.random() * 3 + 1 : 1}
                  fill="hsl(var(--primary))"
                  opacity={isListening ? Math.random() * 0.8 + 0.2 : 0.5}
                  className="transition-all duration-100"
                />
              ))}
            </svg>
          </div>
          
          {/* Center pulse effect */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/60 ${isListening ? 'animate-ping' : 'animate-pulse'}`} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground mb-2">
            {isListening ? 'Listening... Speak now' : 'Tap to start speaking'}
          </p>
          <p className="text-sm text-muted-foreground">
            Ask your farming questions in Malayalam or English
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            variant={isListening ? "destructive" : "default"}
            size="lg"
            onClick={toggleListening}
            className="min-w-32"
          >
            {isListening ? (
              <>
                <MicOff className="h-5 w-5 mr-2" />
                Stop
              </>
            ) : (
              <>
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
                Start Speaking
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;