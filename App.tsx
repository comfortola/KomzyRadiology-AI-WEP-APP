import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import Disclaimer from './components/Disclaimer';
import { ModelType, Mode } from './types';

const App: React.FC = () => {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean>(false);
  const [chatKey, setChatKey] = useState<number>(0);
  const [model, setModel] = useState<ModelType>('gemini');
  const [mode, setMode] = useState<Mode>('professional');

  useEffect(() => {
    const isAccepted = localStorage.getItem('disclaimerAccepted');
    if (isAccepted === 'true') {
      setDisclaimerAccepted(true);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setDisclaimerAccepted(true);
  };

  const handleNewChat = () => {
    setChatKey(prevKey => prevKey + 1);
  };
  
  const handleModelChange = (newModel: ModelType) => {
    if (model !== newModel) {
      setModel(newModel);
      handleNewChat(); // Reset chat when model changes
    }
  };
  
  const handleModeChange = (newMode: Mode) => {
    if (mode !== newMode) {
      setMode(newMode);
      handleNewChat(); // Reset chat when mode changes
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans text-slate-900">
      <Header 
        onNewChat={handleNewChat} 
        model={model} 
        onModelChange={handleModelChange}
        mode={mode}
        onModeChange={handleModeChange}
      />
      <main className="flex-1 flex flex-col items-center p-4 sm:p-6">
        {disclaimerAccepted ? (
          <ChatInterface key={`${chatKey}-${model}-${mode}`} model={model} mode={mode} />
        ) : (
          <Disclaimer onAccept={handleAcceptDisclaimer} />
        )}
      </main>
    </div>
  );
};

export default App;