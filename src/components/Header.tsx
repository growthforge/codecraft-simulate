
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { getApiKey } from "@/services/api";
import { Settings, Key } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export function Header() {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  
  const handleExportCode = () => {
    // This will be implemented in a future version
    toast.info("Export functionality will be available in the next update");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-border/30 backdrop-blur-md bg-background/80 sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-md bg-primary/90 flex items-center justify-center text-white font-bold">C</div>
        <h1 className="text-xl font-medium">CodeCraft</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setApiKeyModalOpen(true)}
          className="flex items-center gap-2 animate-hover-scale"
        >
          <Key size={16} />
          <span>{getApiKey() ? "Change API Key" : "Set API Key"}</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportCode}
          className="flex items-center gap-2 animate-hover-scale"
        >
          <Settings size={16} />
          <span>Settings</span>
        </Button>
      </div>
      
      <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} />
    </header>
  );
}
