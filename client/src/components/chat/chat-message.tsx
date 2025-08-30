import { Bot, User } from "lucide-react";
import type { ChatMessage } from "@shared/schema";

interface ChatMessageProps {
  message: ChatMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.isUser;
  const timestamp = message.timestamp ? new Date(message.timestamp) : new Date();

  return (
    <div className={`chat-message mb-4 ${isUser ? "flex justify-end" : "flex"}`} data-testid={`chat-message-${message.id}`}>
      {isUser ? (
        <div className="flex items-start gap-3 max-w-[80%]">
          <div className="bg-primary text-white rounded-2xl p-4 order-2">
            <p className="mb-1" data-testid="text-message-content">{message.message}</p>
            <small className="opacity-75 text-xs" data-testid="text-message-timestamp">
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </small>
          </div>
          <div className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center order-1">
            <User className="h-5 w-5" />
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 max-w-[80%]">
          <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div className="bg-muted rounded-2xl p-4">
            <p className="mb-1" data-testid="text-message-content">{message.message}</p>
            <small className="text-muted-foreground text-xs" data-testid="text-message-timestamp">
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
