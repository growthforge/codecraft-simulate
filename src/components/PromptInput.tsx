
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Model } from "@/services/api";
import { Loader2, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface PromptInputProps {
  onGenerate: (
    prompt: string,
    model: Model,
    temperature: number
  ) => Promise<void>;
  isGenerating: boolean;
}

export function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<Model>("llama-3-70b");
  const [temperature, setTemperature] = useState(0.3);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    try {
      await onGenerate(prompt, model, temperature);
    } catch (error) {
      // Error is handled in the parent component
    }
  };

  const promptPlaceholder = `Describe the website you want to generate in detail. For example:

Create a product landing page for a minimalist desk lamp with:
- A hero section with product image and headline
- 3 feature highlights with small icons
- An animated product showcase
- Customer testimonials
- A responsive pricing section
- Mobile-friendly navigation

The design should be clean, with lots of white space, using a palette of light gray, white, and subtle blue accents. Typography should be modern sans-serif.`;

  return (
    <Card className="w-full min-h-[200px] shadow-sm animate-fade-in border border-border/40 bg-card/30 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Code Generator</CardTitle>
        <CardDescription>
          Describe the page you want to create in detail
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder={promptPlaceholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[200px] resize-y bg-background/50 border-border/30"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <Select 
                value={model} 
                onValueChange={(value) => setModel(value as Model)}
              >
                <SelectTrigger className="bg-background/50 border-border/30">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llama-3-70b">Llama 3.3 70B (Powerful)</SelectItem>
                  <SelectItem value="qwen-coder">Qwen 2.5 Coder 32B (Code-focused)</SelectItem>
                  <SelectItem value="nvidia-nemotron">NVIDIA Nemotron 70B (Precise)</SelectItem>
                  <SelectItem value="llama-3-8b">Llama 3.1 8B (Fast)</SelectItem>
                  <SelectItem value="mistral-nemo">Mistral Nemo 12B (Multilingual)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Temperature: {temperature.toFixed(1)}</label>
              </div>
              <Slider
                value={[temperature]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(values) => setTemperature(values[0])}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
