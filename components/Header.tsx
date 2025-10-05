import React from 'react';
import { ModelType, Mode } from '../types';

const MedicalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
      clipRule="evenodd"
    />
  </svg>
);

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);


interface HeaderProps {
    onNewChat: () => void;
    model: ModelType;
    onModelChange: (model: ModelType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat, model, onModelChange, mode, onModeChange }) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm p-4 border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MedicalIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            AI Radiology Assistant
          </h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-slate-100 p-1 rounded-lg flex space-x-1">
                <button onClick={() => onModeChange('professional')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${mode === 'professional' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
                    Professional
                </button>
                <button onClick={() => onModeChange('patient')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${mode === 'patient' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
                    Patient
                </button>
            </div>
            <div className="flex items-center">
                <label htmlFor="model-select" className="sr-only">Select Model</label>
                <select
                    id="model-select"
                    value={model}
                    onChange={(e) => onModelChange(e.target.value as ModelType)}
                    className="block w-full pl-3 pr-8 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                    <option value="gemini">Gemini</option>
                    <option value="mistral">Mistral (Ollama)</option>
                </select>
            </div>
            <button
              onClick={onNewChat}
              title="Start New Chat"
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5"/>
              <span className="hidden sm:inline">New Chat</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
