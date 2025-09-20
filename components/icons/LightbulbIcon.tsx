
import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l.707.707M19 19l-1.414-1.414M12 21v-1m-6.364-1.636l.707-.707M6 6l-1.414-1.414" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6a6 6 0 016 6c0 1.983-.935 3.75-2.345 4.811A5.022 5.022 0 0112 21a5.022 5.022 0 01-3.655-1.189A6.002 6.002 0 016 12a6 6 0 016-6z" />
  </svg>
);

export default LightbulbIcon;
