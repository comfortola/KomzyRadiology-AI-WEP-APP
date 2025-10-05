
import React from 'react';

const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14.25 6.088a3 3 0 00-4.5 0l-4.22 6.03a3 3 0 00.174 4.053l5.06 4.218a3 3 0 004.054-.174l6.03-4.22a3 3 0 00-4.054-4.228l-2.54 1.788a.75.75 0 01-1.06-1.06l1.788-2.54a3 3 0 00-4.228-4.054z" />
    <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 22.5c5.247 0 9.5-4.253 9.5-9.5S17.247 3.5 12 3.5 2.5 7.753 2.5 13 6.753 22.5 12 22.5z" />
  </svg>
);

export default BotIcon;
