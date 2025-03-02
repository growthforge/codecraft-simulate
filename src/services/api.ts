
import { toast } from "sonner";

// Define our supported models
export type Model = "deepseek-coder" | "qwen";

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
const API_KEY_STORAGE_KEY = "groq-api-key";

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
 * Generates code using the Groq API
 */
export const generateCode = async ({
  prompt,
  model,
  temperature = 0.3,
  maxTokens = 4000,
}: GenerationParams): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    toast.error("API key is required. Please set your Groq API key.");
    throw new Error("API key is required");
  }

  try {
    // Map our simplified model names to the actual Groq model IDs
    // Updated to use the correct model names available in Groq API
    const modelMap: Record<Model, string> = {
      "deepseek-coder": "llama3-70b-8192",
      "qwen": "llama3-8b-8192",
    };

    const groqModel = modelMap[model];
    
    console.log(`Using model: ${groqModel} for request`);
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: groqModel,
        messages: [
          {
            role: "system",
            content: "You are an expert website developer who specializes in creating clean, modern code. You only respond with code, no explanations. Your code should be valid, efficient, and follow best practices."
          },
          {
            role: "user",
            content: prompt
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
