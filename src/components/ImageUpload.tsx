import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (imageData: string, description: string) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageDescription, setImageDescription] = useState('');
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setImageDescription(`${file.name} - Crop/Field Image Analysis`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      onImageUpload(selectedImage, imageDescription);
      setSelectedImage('');
      setImageDescription('');
      toast({
        title: "Image uploaded successfully",
        description: "AI is analyzing your crop image..."
      });
    }
  };

  const clearImage = () => {
    setSelectedImage('');
    setImageDescription('');
  };

  return (
    <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/20">
      {!selectedImage ? (
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Camera className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Upload crop/field images for AI analysis
          </p>
          <label htmlFor="image-upload" className="cursor-pointer">
            <Button variant="outline" className="gap-2" asChild>
              <span>
                <Upload className="h-4 w-4" />
                Choose Image
              </span>
            </Button>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-2">
            JPG, PNG up to 5MB
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected crop"
              className="w-full h-32 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={clearImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUpload} className="flex-1 gap-2">
              <Upload className="h-4 w-4" />
              Analyze Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;