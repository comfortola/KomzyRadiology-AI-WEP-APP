import React from 'react';
import BotIcon from './icons/BotIcon';
import { Mode } from '../types';

interface WelcomeProps {
    onPromptClick: (prompt: string) => void;
    mode: Mode;
}

const professionalPrompts = [
    "Differential diagnosis for a ring-enhancing lesion in the brain on MRI.",
    "Explain the key imaging features of interstitial lung disease on HRCT.",
    "What are the PI-RADS classifications for prostate MRI?",
    "Describe the appearance of a Colle's fracture on an X-ray."
];

const patientPrompts = [
    "What is an MRI and how does it work?",
    "How should I prepare for a CT scan with contrast?",
    "What is the difference between an X-ray and a CT scan?",
    "Why might a doctor order an ultrasound?"
];

const professionalUsers = [
    { title: "Radiology Residents & Fellows", description: "Deepen your understanding and quickly reference differential diagnoses." },
    { title: "Medical Students", description: "Learn key radiological concepts and prepare for clinical rotations." },
    { title: "Practicing Clinicians", description: "Refresh your knowledge on specific imaging findings and protocols." }
];

const patientInfo = [
    { title: "Understand Procedures", description: "Learn about different imaging tests your doctor may have ordered." },
    { title: "Prepare for Scans", description: "Find out about common preparations for tests like MRIs and CT scans." },
    { title: "Ask General Questions", description: "Get simple, clear answers about medical imaging technology." }
];

const Welcome: React.FC<WelcomeProps> = ({ onPromptClick, mode }) => {
    
    const isProfessional = mode === 'professional';

    return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in-up p-4 sm:p-0">
            <div className="flex-shrink-0 h-16 w-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <BotIcon className="h-9 w-9 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {isProfessional ? "AI Radiology Assistant" : "Medical Imaging Assistant"}
            </h2>
            <p className="text-slate-500 mb-8 max-w-xl">
                {isProfessional 
                    ? "An AI-powered tool for medical professionals and students to explore radiology topics, differential diagnoses, and imaging techniques."
                    : "A tool to help you understand medical imaging procedures. This is for informational purposes only and is not a substitute for medical advice."
                }
            </p>

            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                {(isProfessional ? professionalUsers : patientInfo).map((item) => (
                    <div key={item.title} className="bg-white/80 p-4 rounded-lg border border-slate-200">
                        <h3 className="font-semibold text-slate-700">{item.title}</h3>
                        <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                ))}
            </div>

            <h3 className="text-lg font-semibold text-slate-700 mb-4">Or, try an example prompt:</h3>
            <div className="w-full max-w-2xl space-y-3">
                {(isProfessional ? professionalPrompts : patientPrompts).map((prompt, index) => (
                    <button
                        key={index}
                        onClick={() => onPromptClick(prompt)}
                        className="w-full text-left p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg transition-all duration-200 group"
                    >
                        <p className="font-semibold text-slate-700 group-hover:text-blue-600">{prompt}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Welcome;
