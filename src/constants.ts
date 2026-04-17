import { Advocate, LegalAidService, ForumPost } from './types';

export const MOCK_ADVOCATES: Advocate[] = [
  {
    id: '1',
    name: 'Adv. Ramesh Kumar',
    specialty: ['Criminal Law', 'Family Law'],
    experienceYears: 15,
    location: 'Delhi High Court, New Delhi',
    contact: '+91-9876543210',
    rating: 4.8,
    languages: ['Hindi', 'English'],
  },
  {
    id: '2',
    name: 'Adv. Priya Sharma',
    specialty: ['Corporate Law', 'Property Disputes'],
    experienceYears: 8,
    location: 'Bombay High Court, Mumbai',
    contact: '+91-9876543211',
    rating: 4.6,
    languages: ['Marathi', 'Hindi', 'English'],
  },
  {
    id: '3',
    name: 'Adv. Vikram Singh',
    specialty: ['Civil Litigation', 'Consumer Protection'],
    experienceYears: 12,
    location: 'District Court, Bangalore',
    contact: '+91-9876543212',
    rating: 4.9,
    languages: ['Kannada', 'English'],
  },
  {
    id: '4',
    name: 'Adv. Anjali Desai',
    specialty: ['Women Rights', 'Divorce', 'Domestic Violence'],
    experienceYears: 10,
    location: 'Family Court, Ahmedabad',
    contact: '+91-9876543213',
    rating: 4.7,
    languages: ['Gujarati', 'Hindi', 'English'],
  },
];

export const MOCK_LEGAL_AID: LegalAidService[] = [
  {
    id: '1',
    name: 'National Legal Services Authority (NALSA)',
    description: 'Provides free legal services to eligible candidates and organizes Lok Adalats for amicable settlement of disputes.',
    location: 'New Delhi (Nationwide)',
    contact: '15100',
    website: 'nalsa.gov.in',
  },
  {
    id: '2',
    name: 'Human Rights Law Network (HRLN)',
    description: 'A collective of lawyers and social activists dedicated to the use of the legal system to advance human rights.',
    location: 'Multiple Cities',
    contact: 'contact@hrln.org',
    website: 'hrln.org',
  },
  {
    id: '3',
    name: 'Majlis Legal Centre',
    description: 'Provides legal rights advocacy and representation for women facing domestic violence and sexual abuse.',
    location: 'Mumbai, Maharashtra',
    contact: '+91-22-26661252',
    website: 'majlislaw.com',
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    author: 'Anonymous Citizen',
    title: 'Process for filing an FIR for cyber financial fraud?',
    content: 'I recently lost money due to a UPI scam. What is the exact process to file an FIR? Can I do it online?',
    date: '2026-04-10',
    replies: 3,
    category: 'Question'
  },
  {
    id: '2',
    author: 'Rahul M.',
    title: 'My experience with Family Court mediation',
    content: 'Wanted to share how the court-mandated mediation helped resolve our property dispute without a lengthy trial. Highly recommend trying to settle amicably first.',
    date: '2026-04-12',
    replies: 5,
    category: 'Experience'
  },
  {
    id: '3',
    author: 'Kavita',
    title: 'Employer refusing to pay full and final settlement',
    content: 'I resigned 3 months ago but my previous employer is withholding my settlement amount. What legal recourse do I have under Indian labor laws?',
    date: '2026-04-15',
    replies: 1,
    category: 'Advice'
  }
];
