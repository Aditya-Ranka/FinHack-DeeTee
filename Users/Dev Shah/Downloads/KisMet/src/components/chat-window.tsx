import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Message, Profile } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  match: { profile: Profile };
  onSendMessage: (content: string) => void;
}

export function ChatWindow({ messages, match, onSendMessage }: ChatWindowProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = handleSubmit(({ message }) => {
    if (message.trim()) {
      onSendMessage(message);
      reset();
    }
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <img
          src={match.profile.photos[0]}
          alt={match.profile.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-semibold">{match.profile.name}</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === match.profile.id ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender_id === match.profile.id
                  ? 'bg-gray-100'
                  : 'bg-blue-500 text-white'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {format(new Date(message.created_at), 'HH:mm')}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={onSubmit} className="p-4 border-t flex gap-2">
        <Input
          {...register('message')}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}