import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ChatMessage from "@/components/chat/chat-message";
import { Bot, Send, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage as ChatMessageType } from "@shared/schema";

// Mock user ID for demo - in real app this would come from auth
const MOCK_USER_ID = "user-123";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["/api/chat/messages", MOCK_USER_ID],
    enabled: !!MOCK_USER_ID,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const response = await apiRequest("POST", "/api/chat/send", {
        userId: MOCK_USER_ID,
        message: messageText,
        isUser: true,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages", MOCK_USER_ID] });
      setMessage("");
      setIsTyping(false);
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsTyping(false);
    },
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsTyping(true);
    sendMessageMutation.mutate(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const suggestedQuestions = [
    "Create a 1500 calorie meal plan for weight loss",
    "What's the nutritional value of quinoa?",
    "How can I increase my protein intake?",
    "Generate a workout plan for beginners",
  ];

  return (
    <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
      <div className="grid lg:grid-cols-4 gap-6 flex-1">
        {/* Chat History Sidebar */}
        <div className="hidden lg:block bg-muted rounded-lg">
          <div className="p-4 border-b">
            <h6 className="font-semibold" data-testid="text-chat-history">Chat History</h6>
          </div>
          <div className="p-3">
            <div className="space-y-2">
              <Card className="cursor-pointer hover:bg-accent/50" data-testid="card-chat-history-item">
                <CardContent className="p-3">
                  <div className="font-medium text-sm">Meal Planning Discussion</div>
                  <small className="text-muted-foreground">2 hours ago</small>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-accent/50" data-testid="card-chat-history-item">
                <CardContent className="p-3">
                  <div className="font-medium text-sm">Calorie Questions</div>
                  <small className="text-muted-foreground">Yesterday</small>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="lg:col-span-3 flex flex-col">
          {/* Chat Header */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h5 className="font-semibold" data-testid="text-ai-assistant-name">NutriAI Assistant</h5>
                  <small className="text-green-500 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Online
                  </small>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          {/* Chat Messages */}
          <Card className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4" data-testid="scroll-area-chat-messages">
              {isLoading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              
              {!isLoading && messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2" data-testid="text-welcome-title">Welcome to NutriAI!</h3>
                  <p className="text-muted-foreground mb-4" data-testid="text-welcome-message">
                    I'm here to help you with nutrition advice, meal planning, and fitness tips. 
                    Ask me anything about your health journey!
                  </p>
                  <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left justify-start h-auto p-3"
                        onClick={() => setMessage(question)}
                        data-testid={`button-suggested-question-${index}`}
                      >
                        <Lightbulb className="h-4 w-4 mr-2 text-accent" />
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((msg: ChatMessageType) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              
              {isTyping && (
                <div className="chat-message mb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-muted-foreground text-sm">NutriAI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me about nutrition, calories, or fitness..."
                  onKeyPress={handleKeyPress}
                  disabled={sendMessageMutation.isPending}
                  className="flex-1"
                  data-testid="input-chat-message"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2">
                <small className="text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  Try: "Create a 1500 calorie meal plan" or "What's the nutritional value of quinoa?"
                </small>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
