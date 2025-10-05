
import React from 'react';

interface DisclaimerProps {
  onAccept: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
  return (
    <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center animate-fade-in">
      <div className="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Important Disclaimer</h2>
      <p className="text-slate-600 mb-6">
        This AI Medical Assistant is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
      </p>
      <button
        onClick={onAccept}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        I Understand and Accept
      </button>
    </div>
  );
};

export default Disclaimer;