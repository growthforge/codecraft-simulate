
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getApiKey, setApiKey, clearApiKey } from "@/services/api";
import { toast } from "@/components/ui/sonner";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApiKeyModal({ open, onOpenChange }: ApiKeyModalProps) {
  const [apiKey, setApiKeyState] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedKey = getApiKey();
    if (storedKey) {
      setApiKeyState(storedKey);
    }
  }, [open]);

  const handleSave = () => {
    setIsSaving(true);
    try {
      if (apiKey.trim()) {
        setApiKey(apiKey.trim());
        toast.success("API key saved successfully");
        onOpenChange(false);
      } else {
        clearApiKey();
        toast.success("API key cleared");
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to save API key");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl shadow-lg animate-scale-in border border-border/40">
        <DialogHeader>
          <DialogTitle className="text-xl">Groq API Key</DialogTitle>
          <DialogDescription>
            Enter your Groq API key to enable code generation features.
            Your key is stored locally and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              id="apiKey"
              placeholder="Enter your Groq API key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Don't have an API key? <a href="https://console.groq.com/keys" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                Get one from Groq
              </a>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
