
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Tablet, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DevicePreviewProps {
  htmlContent: string;
}

type DeviceSize = "mobile" | "tablet" | "desktop";

export function DevicePreview({ htmlContent }: DevicePreviewProps) {
  const [device, setDevice] = useState<DeviceSize>("desktop");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const deviceSizes = {
    mobile: "w-full max-w-[375px]",
    tablet: "w-full max-w-[768px]",
    desktop: "w-full",
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between p-2 bg-muted/30 border-b border-border/30 rounded-t-md">
        <Tabs defaultValue={device} onValueChange={(v) => setDevice(v as DeviceSize)}>
          <TabsList className="bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="mobile" className="flex items-center gap-1">
              <Smartphone size={14} />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="tablet" className="flex items-center gap-1">
              <Tablet size={14} />
              <span className="hidden sm:inline">Tablet</span>
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center gap-1">
              <Monitor size={14} />
              <span className="hidden sm:inline">Desktop</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="h-8 w-8 p-0"
          disabled={isLoading}
        >
          <RefreshCw size={16} className={cn("transition-all", isLoading && "animate-spin")} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden bg-white rounded-b-md border border-border/30">
        <div className="h-full flex items-center justify-center overflow-auto">
          <div className={cn("h-full transition-all duration-300", deviceSizes[device])}>
            <iframe
              srcDoc={htmlContent}
              title="Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
