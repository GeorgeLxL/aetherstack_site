export type TeamMember = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  icon?: string;
  avatar_url?: string;
  created_at: string;
};

export type WorkItem = {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  image_url?: string;
  created_at: string;
};

export type ClientEvaluation = {
  id: string;
  client_name: string;
  company: string;
  rating: number;
  feedback: string;
  avatar_url?: string;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  created_at: string;
};
