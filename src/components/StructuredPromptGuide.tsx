
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function StructuredPromptGuide() {
  return (
    <div className="w-full animate-fade-in">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-border/30">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <div className="flex items-center">
              <span>Prompt Structure Guide</span>
              <Badge variant="outline" className="ml-2 bg-primary/10">
                Tips
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm space-y-4 pt-2 pb-1">
              <div>
                <h4 className="font-medium mb-1">Layout Structure</h4>
                <p className="text-muted-foreground">
                  Describe sections (header, hero, features) and their arrangement. Include UI components like cards, forms, or tables.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Design Preferences</h4>
                <p className="text-muted-foreground">
                  Specify color scheme, typography, spacing, shadows, and visual style (minimal, bold, etc.).
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Functionality & Interactivity</h4>
                <p className="text-muted-foreground">
                  Describe interactive elements (dropdowns, sliders), animations, form validations, and user flows.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Content Details</h4>
                <p className="text-muted-foreground">
                  Specify key content including headings, main messages, call-to-action text, and placeholder images.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Example Structure:</h4>
                <pre className="p-3 bg-muted/30 rounded-md text-xs overflow-x-auto">
{`Create a [type] website for [subject/purpose] with:
- [Layout sections]
- [Design specifications]
- [Interactive elements]
- [Content needs]
- [Responsive considerations]
- [Key features]`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-1">Model Tips:</h4>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li><span className="font-medium">Llama 3.3 70B:</span> Best for detailed, complex pages with sophisticated layouts</li>
                  <li><span className="font-medium">Qwen Coder:</span> Ideal for functionality-heavy sites with complex interactions</li>
                  <li><span className="font-medium">NVIDIA Nemotron:</span> Great for precise, technical implementations</li>
                  <li><span className="font-medium">Llama 3.1 8B:</span> Fast results for simpler pages and quick iterations</li>
                  <li><span className="font-medium">Mistral Nemo:</span> Excellent for multilingual websites</li>
                  <li><span className="font-medium">Google Gemini:</span> Well-rounded with good visual understanding</li>
                  <li><span className="font-medium">Llama 3.2 Vision:</span> Best for sites needing visual components and image descriptions</li>
                  <li><span className="font-medium">DeepSeek Coder:</span> Superior for complex web applications and advanced JS</li>
                  <li><span className="font-medium">Claude 3.5 Sonnet:</span> Premium model with exceptional reasoning and design skills</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
