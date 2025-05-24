import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Profile, ProfileFormData, SearchFilters } from '../types';
import { mockProfiles } from '../data/mockProfiles';

interface ProfileContextType {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  addProfile: (profile: ProfileFormData) => Promise<Profile>;
  updateProfile: (id: string, profile: ProfileFormData) => Promise<Profile>;
  deleteProfile: (id: string) => Promise<void>;
  getProfileById: (id: string) => Profile | undefined;
  searchProfiles: (filters: SearchFilters) => Profile[];
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfiles = () => {
      try {
        // Simulate API fetch with a delay
        setTimeout(() => {
          setProfiles(mockProfiles);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load profiles. Please try again later.');
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const addProfile = async (profileData: ProfileFormData): Promise<Profile> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProfile: Profile = {
        id: uuidv4(),
        ...profileData,
        location: profileData.location || { latitude: 0, longitude: 0 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setProfiles(prev => [...prev, newProfile]);
      setLoading(false);
      return newProfile;
    } catch (err) {
      setError('Failed to add profile. Please try again.');
      setLoading(false);
      throw new Error('Failed to add profile');
    }
  };

  const updateProfile = async (id: string, profileData: ProfileFormData): Promise<Profile> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProfile: Profile = {
        id,
        ...profileData,
        location: profileData.location || { latitude: 0, longitude: 0 },
        createdAt: profiles.find(p => p.id === id)?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setProfiles(prev => prev.map(profile => profile.id === id ? updatedProfile : profile));
      setLoading(false);
      return updatedProfile;
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setLoading(false);
      throw new Error('Failed to update profile');
    }
  };

  const deleteProfile = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setProfiles(prev => prev.filter(profile => profile.id !== id));
      setLoading(false);
    } catch (err) {
      setError('Failed to delete profile. Please try again.');
      setLoading(false);
      throw new Error('Failed to delete profile');
    }
  };

  const getProfileById = (id: string): Profile | undefined => {
    return profiles.find(profile => profile.id === id);
  };

  const searchProfiles = (filters: SearchFilters): Profile[] => {
    const { query, sortBy, sortOrder } = filters;
    
    let filteredProfiles = [...profiles];
    
    // Apply search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.name.toLowerCase().includes(lowerQuery) || 
        profile.description.toLowerCase().includes(lowerQuery) || 
        profile.address.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply sorting
    filteredProfiles.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc' 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    
    return filteredProfiles;
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      loading,
      error,
      addProfile,
      updateProfile,
      deleteProfile,
      getProfileById,
      searchProfiles,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};