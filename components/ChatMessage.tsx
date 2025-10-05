import React from 'react';
import { Message } from '../types';
import UserIcon from './icons/UserIcon';
import BotIcon from './icons/BotIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Prevent rendering empty model messages, which are used as placeholders for streaming
  if(message.role === 'model' && !message.content) {
    return null;
  }

  return (
    <div className={`flex items-start gap-3 animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <BotIcon className="h-6 w-6 text-blue-600" />
         </div>
      )}
      <div
        className={`max-w-md md:max-w-lg rounded-2xl p-4 text-base leading-relaxed ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-slate-100 text-slate-800 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
       {isUser && (
         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <UserIcon className="h-6 w-6 text-slate-500" />
         </div>
      )}
    </div>
  );
};

export default ChatMessage;