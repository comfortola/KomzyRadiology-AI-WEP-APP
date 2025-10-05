export type Message = {
  role: 'user' | 'model';
  content: string;
};

export type ModelType = 'gemini' | 'mistral';

export type Mode = 'patient' | 'professional';
