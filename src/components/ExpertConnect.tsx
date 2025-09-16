import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, MessageCircle, MapPin, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ExpertConnect = () => {
  const { toast } = useToast();

  const localExperts = [
    {
      name: "രാജു സാർ (Raju Sir)",
      specialty: "Rice & Paddy Expert",
      location: "Kottayam District",
      rating: 4.8,
      experience: "15 years",
      languages: "Malayalam, English"
    },
    {
      name: "സുനിത ടീച്ചർ (Sunitha Teacher)", 
      specialty: "Organic Farming",
      location: "Thrissur District",
      rating: 4.9,
      experience: "12 years",
      languages: "Malayalam, Hindi"
    },
    {
      name: "അനിൽ കുമാർ (Anil Kumar)",
      specialty: "Pest Control Specialist",
      location: "Ernakulam District", 
      rating: 4.7,
      experience: "10 years",
      languages: "Malayalam, English, Tamil"
    }
  ];

  const handleConnect = (expertName: string, method: string) => {
    toast({
      title: "Connecting to Expert",
      description: `Connecting you with ${expertName} via ${method}...`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <MessageCircle className="h-5 w-5" />
        <h3 className="font-semibold">Connect with Local Experts</h3>
      </div>
      
      <div className="grid gap-3">
        {localExperts.map((expert, index) => (
          <Card key={index} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-sm">{expert.name}</h4>
                <p className="text-xs text-muted-foreground">{expert.specialty}</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{expert.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{expert.location}</span>
              </div>
              <span>{expert.experience}</span>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3">
              Languages: {expert.languages}
            </p>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 gap-1 text-xs"
                onClick={() => handleConnect(expert.name, 'Call')}
              >
                <Phone className="h-3 w-3" />
                Call
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 gap-1 text-xs"
                onClick={() => handleConnect(expert.name, 'WhatsApp')}
              >
                <MessageCircle className="h-3 w-3" />
                WhatsApp
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Available 9 AM - 6 PM • Response within 30 minutes
      </p>
    </div>
  );
};

export default ExpertConnect;