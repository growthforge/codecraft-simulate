
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { CodeEditor } from "@/components/CodeEditor";
import { DevicePreview } from "@/components/DevicePreview";
import { StructuredPromptGuide } from "@/components/StructuredPromptGuide";
import { generateCode, Model, getApiKey } from "@/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { ApiKeyModal } from "@/components/ApiKeyModal";

// Default code for preview
const defaultHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeCraft Preview</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f8fafc;
    }
    .welcome {
      text-align: center;
      animation: fade-in 1s ease-out;
    }
    .logo {
      width: 80px;
      height: 80px;
      background-color: #3b82f6;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      font-weight: bold;
      margin: 0 auto 2rem;
    }
    h1 {
      margin-bottom: 1rem;
      font-size: 2.5rem;
      font-weight: 600;
    }
    p {
      margin-bottom: 2rem;
      color: #64748b;
      max-width: 600px;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="welcome">
    <div class="logo">C</div>
    <h1>Welcome to CodeCraft</h1>
    <p>Enter a detailed description in the prompt area to generate a website. Your code will appear here in the preview panel.</p>
  </div>
</body>
</html>
`;

const defaultCss = `/* Generated CSS will appear here */`;
const defaultJs = `/* Generated JavaScript will appear here */`;

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [htmlCode, setHtmlCode] = useState(defaultHtml);
  const [cssCode, setCssCode] = useState(defaultCss);
  const [jsCode, setJsCode] = useState(defaultJs);
  const [previewHtml, setPreviewHtml] = useState(defaultHtml);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

  useEffect(() => {
    // Check if API key exists on mount
    const hasApiKey = !!getApiKey();
    if (!hasApiKey) {
      setTimeout(() => {
        setApiKeyModalOpen(true);
      }, 500);
    }
  }, []);

  // Function to extract HTML, CSS, and JS from generated code
  const parseGeneratedCode = (fullCode: string) => {
    try {
      let html = fullCode;
      let css = "";
      let js = "";

      // Extract CSS from <style> tags
      const styleRegex = /<style>([\s\S]*?)<\/style>/;
      const styleMatch = fullCode.match(styleRegex);
      if (styleMatch && styleMatch[1]) {
        css = styleMatch[1].trim();
      }

      // Extract JS from <script> tags
      const scriptRegex = /<script>([\s\S]*?)<\/script>/;
      const scriptMatch = fullCode.match(scriptRegex);
      if (scriptMatch && scriptMatch[1]) {
        js = scriptMatch[1].trim();
      }

      return { html, css, js };
    } catch (error) {
      console.error("Error parsing generated code:", error);
      return { html: fullCode, css: "", js: "" };
    }
  };

  const handleGenerate = async (
    prompt: string,
    model: Model,
    temperature: number
  ) => {
    try {
      setIsGenerating(true);
      
      // Enhanced prompt with specific instructions
      const enhancedPrompt = `
Generate a complete HTML webpage based on the following requirements. 
Include all HTML, CSS, and JavaScript in a single file. 
Ensure the design is modern, clean, and responsive.

USER REQUIREMENTS:
${prompt}

SPECIFIC INSTRUCTIONS:
1. Create valid, semantic HTML5
2. Use modern CSS features (flexbox, grid, variables)
3. Add responsive breakpoints for mobile, tablet, and desktop
4. Include subtle animations and transitions for a polished feel
5. Generate placeholder content that matches the requested theme
6. Ensure all interactive elements have hover/focus states
7. All code must be self-contained in the HTML file

Return ONLY the complete HTML document with embedded CSS and JavaScript.
      `;
      
      const generatedCode = await generateCode({
        prompt: enhancedPrompt,
        model,
        temperature,
        maxTokens: 8000,
      });
      
      const { html, css, js } = parseGeneratedCode(generatedCode);
      
      setHtmlCode(html);
      setCssCode(css || defaultCss);
      setJsCode(js || defaultJs);
      setPreviewHtml(html);
      
      toast.success("Code generated successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate code";
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6 px-4 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left Column - Prompt and Code */}
          <div className="flex flex-col space-y-6">
            <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
            <StructuredPromptGuide />
            
            <div className="flex-1">
              <Tabs defaultValue="html" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-2">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                </TabsList>
                <TabsContent value="html" className="mt-0">
                  <CodeEditor code={htmlCode} language="html" title="HTML" />
                </TabsContent>
                <TabsContent value="css" className="mt-0">
                  <CodeEditor code={cssCode} language="css" title="CSS" />
                </TabsContent>
                <TabsContent value="js" className="mt-0">
                  <CodeEditor code={jsCode} language="javascript" title="JavaScript" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Right Column - Preview */}
          <div className="flex flex-col h-full min-h-[600px] border border-border/30 rounded-md bg-card/20 backdrop-blur-sm">
            <DevicePreview htmlContent={previewHtml} />
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-6 border-t border-border/30 text-center text-sm text-muted-foreground">
        <p>CodeCraft • Built with precision and care</p>
      </footer>
      
      <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} />
    </div>
  );
};

export default Index;
