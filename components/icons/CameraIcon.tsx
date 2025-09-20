
import React from 'react';

const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55a1 1 0 01.55.89V16a1 1 0 01-.55.89L15 19l-4-2.22m-2.22-4.44L4 10m11 0a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default CameraIcon;
