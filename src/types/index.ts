export interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  skills?: string[];
  interests?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData extends Omit<Profile, 'id' | 'location' | 'createdAt' | 'updatedAt'> {
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface SearchFilters {
  query: string;
  sortBy: 'name' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}