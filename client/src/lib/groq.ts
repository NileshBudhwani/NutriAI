interface GroqChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class GroqClient {
  private apiKey: string;
  private baseUrl = "https://api.groq.com/openai/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: GroqChatMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error("Groq API key is required");
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error: ${response.status} ${errorText}`);
      }

      const data: GroqResponse = await response.json();
      return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response at the moment.";
    } catch (error) {
      console.error("Groq API error:", error);
      throw error;
    }
  }
}

// Create a singleton instance
const apiKey = import.meta.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY || "";
export const groqClient = new GroqClient(apiKey);
