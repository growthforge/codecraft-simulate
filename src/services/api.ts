
import { toast } from "sonner";

// Define our supported models
export type Model = 
  | "llama-3-70b" 
  | "qwen-coder" 
  | "nvidia-nemotron" 
  | "llama-3-8b"
  | "mistral-nemo"
  | "gemini-flash"
  | "llama-3-vision"
  | "deepseek-coder"
  | "claude-3-5-sonnet";

export interface GenerationParams {
  prompt: string;
  model: Model;
  temperature?: number;
  maxTokens?: number;
}

interface ApiResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
  }[];
}

// Local storage key for API key
const API_KEY_STORAGE_KEY = "openrouter-api-key";

/**
 * Gets the API key from local storage
 */
export const getApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

/**
 * Sets the API key in local storage
 */
export const setApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

/**
 * Clears the API key from local storage
 */
export const clearApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

/**
 * Generates code using the OpenRouter API
 */
export const generateCode = async ({
  prompt,
  model,
  temperature = 0.3,
  maxTokens = 4000,
}: GenerationParams): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    toast.error("API key is required. Please set your OpenRouter API key.");
    throw new Error("API key is required");
  }

  try {
    // Map our simplified model names to the actual OpenRouter model IDs
    const modelMap: Record<Model, string> = {
      "llama-3-70b": "meta-llama/llama-3.3-70b-instruct",
      "qwen-coder": "qwen/qwen2.5-coder-32b-instruct",
      "nvidia-nemotron": "nvidia/llama-3.1-nemotron-70b-instruct",
      "llama-3-8b": "meta-llama/llama-3.1-8b-instruct",
      "mistral-nemo": "mistralai/mistral-nemo",
      "gemini-flash": "google/gemini-flash-1.5-experimental",
      "llama-3-vision": "meta-llama/llama-3.2-11b-vision-instruct",
      "deepseek-coder": "deepseek-ai/deepseek-coder-33b-instruct",
      "claude-3-5-sonnet": "anthropic/claude-3-5-sonnet"
    };

    const openRouterModel = modelMap[model];
    
    console.log(`Using model: ${openRouterModel} for request`);
    
    // Craft a specialized system prompt for code generation
    const systemPrompt = `You are an expert full-stack developer who specializes in creating clean, modern, responsive web applications using React, Tailwind CSS, and shadcn/ui components. 
    
You only respond with complete, production-ready code. 
No explanations or comments outside the code itself.
Your code should be valid, efficient, and follow best practices.
Ensure all HTML is semantic and accessible.
Use modern CSS features (flexbox, grid, variables).
Include responsive breakpoints for mobile, tablet, and desktop.
Add proper error handling and input validation.`;

    // Enhance the user prompt with specific technical requirements
    const enhancedPrompt = `
Generate a complete, standalone web page based on the following requirements:

${prompt}

Technical Requirements:
1. Create semantic HTML5 with proper accessibility attributes
2. Use Tailwind CSS for styling, with a consistent design system
3. Include responsive design (mobile, tablet, desktop)
4. Add appropriate interactivity with clean JavaScript
5. Optimize for performance and loading speed
6. Include subtle animations and transitions for polish

Return ONLY the complete HTML document with embedded CSS and JavaScript.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin, // Required for OpenRouter API
        "X-Title": "CodeCraft Generator" // Optional but good practice
      },
      body: JSON.stringify({
        model: openRouterModel,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: enhancedPrompt
          }
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("API error:", error);
      throw new Error(error.error?.message || "Failed to generate code");
    }

    const data: ApiResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to generate code";
    console.error("Generation error:", errorMessage);
    toast.error(errorMessage);
    throw error;
  }
};
