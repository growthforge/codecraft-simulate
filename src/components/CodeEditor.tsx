
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  code: string;
  language: string;
  title?: string;
  isCollapsible?: boolean;
}

export function CodeEditor({
  code,
  language,
  title = "Generated Code",
  isCollapsible = true,
}: CodeEditorProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formattedCode, setFormattedCode] = useState(code);

  useEffect(() => {
    // Simple syntax highlighting (in a real app, we'd use a library like Prism.js)
    setFormattedCode(code);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-md border border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm animate-fade-in">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50">
        <div className="flex items-center space-x-2">
          {isCollapsible && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </Button>
          )}
          <span className="font-medium text-sm">{title}</span>
          <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted/50">
            {language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleCopy}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </Button>
      </div>
      <div
        className={cn(
          "overflow-auto transition-all duration-300 ease-in-out",
          collapsed ? "max-h-0" : "max-h-[500px]"
        )}
      >
        <pre className="p-4 text-sm code-window">
          <code>{formattedCode}</code>
        </pre>
      </div>
    </div>
  );
}
