
import React from 'react';
import BotIcon from './icons/BotIcon';

const Loader: React.FC = () => {
    return (
        <div className="flex items-start gap-3">
             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <BotIcon className="h-6 w-6 text-blue-600" />
             </div>
            <div className="bg-slate-200 text-slate-900 rounded-2xl rounded-bl-lg p-4 flex items-center space-x-2">
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
            </div>
        </div>
    );
};

export default Loader;