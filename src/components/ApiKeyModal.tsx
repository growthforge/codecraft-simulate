
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setApiKey, getApiKey } from "@/services/api";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApiKeyModal({ open, onOpenChange }: ApiKeyModalProps) {
  const [apiKey, setApiKeyValue] = useState(getApiKey() || "");

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    setApiKey(apiKey.trim());
    toast.success("API key saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OpenRouter API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenRouter API key to access powerful AI models for code generation. 
            You can get a free API key from{" "}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline inline-flex items-center"
            >
              OpenRouter
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyValue(e.target.value)}
              placeholder="sk-or-v1-..."
              className="col-span-3"
            />
            <p className="text-xs text-muted-foreground mt-1">
              CodeCraft gives you access to 9 powerful AI models including Llama, Qwen, DeepSeek, 
              Claude, and more - all available with a free OpenRouter account.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
