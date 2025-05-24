import { Profile } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const mockProfiles: Profile[] = [
  {
    id: uuidv4(),
    name: 'Sophia Johnson',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'UX designer passionate about creating intuitive digital experiences. 5+ years of experience in product design.',
    address: '101 Market St, San Francisco, CA',
    location: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    contact: {
      email: 'sophia.j@example.com',
      phone: '(555) 123-4567',
      website: 'sophiadesigns.com'
    },
    skills: ['UI/UX Design', 'Prototyping', 'User Research', 'Figma'],
    interests: ['Photography', 'Hiking', 'Typography'],
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2024, 2, 10).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Marcus Chen',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Full stack developer specializing in React and Node.js. Building scalable applications for startups and enterprises.',
    address: '350 5th Ave, New York, NY',
    location: {
      latitude: 40.7484,
      longitude: -73.9857
    },
    contact: {
      email: 'marcus.c@example.com',
      phone: '(555) 987-6543',
      website: 'marcuschen.dev'
    },
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    interests: ['Chess', 'Jazz', 'Cooking'],
    createdAt: new Date(2023, 2, 20).toISOString(),
    updatedAt: new Date(2024, 1, 5).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Amara Williams',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Data scientist with expertise in machine learning and predictive analytics. Helping businesses make data-driven decisions.',
    address: '233 S Wacker Dr, Chicago, IL',
    location: {
      latitude: 41.8789,
      longitude: -87.6359
    },
    contact: {
      email: 'amara.w@example.com',
      phone: '(555) 789-0123',
      website: 'amaraanalytics.io'
    },
    skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL'],
    interests: ['Running', 'Science Fiction', 'Piano'],
    createdAt: new Date(2023, 7, 12).toISOString(),
    updatedAt: new Date(2024, 0, 18).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Raj Patel',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Product manager focusing on fintech solutions. Expert in agile methodologies and product strategy.',
    address: '1100 Congress Ave, Austin, TX',
    location: {
      latitude: 30.2729,
      longitude: -97.7444
    },
    contact: {
      email: 'raj.p@example.com',
      phone: '(555) 456-7890',
      website: 'rajpatel.co'
    },
    skills: ['Product Strategy', 'Agile', 'Market Research', 'Wireframing'],
    interests: ['Travel', 'Cricket', 'Podcasts'],
    createdAt: new Date(2023, 4, 30).toISOString(),
    updatedAt: new Date(2023, 11, 15).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Emma Rodriguez',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Marketing specialist with a focus on digital campaigns and brand strategy. Creating engaging content that connects.',
    address: '1 Embarcadero Center, San Francisco, CA',
    location: {
      latitude: 37.7946,
      longitude: -122.3999
    },
    contact: {
      email: 'emma.r@example.com',
      phone: '(555) 234-5678',
      website: 'emmamarketing.com'
    },
    skills: ['Content Strategy', 'SEO', 'Social Media Marketing', 'Analytics'],
    interests: ['Yoga', 'Writing', 'Sustainable Fashion'],
    createdAt: new Date(2023, 6, 8).toISOString(),
    updatedAt: new Date(2024, 3, 2).toISOString()
  }
];