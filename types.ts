
export interface Shot {
  shotNumber: number;
  description: string;
  cameraAngle: string;
  lighting: string;
  mood: string;
}

export interface Storyboard extends Shot {
  imageUrl: string;
  soundSuggestion: string;
}
