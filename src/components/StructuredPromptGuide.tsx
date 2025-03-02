
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
                  Describe the sections you want (header, hero, features, etc.) and their arrangement.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Design Preferences</h4>
                <p className="text-muted-foreground">
                  Specify colors, typography, spacing, and visual style.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Functionality Needs</h4>
                <p className="text-muted-foreground">
                  Detail interactive elements, animations, and behaviors.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Example Structure:</h4>
                <pre className="p-3 bg-muted/30 rounded-md text-xs overflow-x-auto">
{`Create a page with:
- [Layout description]
- [Design preferences]
- [Functional requirements]
- [Content details]
- [Responsive considerations]`}
                </pre>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
