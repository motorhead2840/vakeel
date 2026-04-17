export type Advocate = {
  id: string;
  name: string;
  specialty: string[];
  experienceYears: number;
  location: string;
  contact: string;
  rating: number;
  languages: string[];
};

export type LegalAidService = {
  id: string;
  name: string;
  description: string;
  location: string;
  contact: string;
  website?: string;
};

export type ForumPost = {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  replies: number;
  category: "Advice" | "Experience" | "Question";
};
