import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/map/MapComponent';
import ProfileList from '../components/profiles/ProfileList';
import SearchBar from '../components/ui/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useProfiles } from '../contexts/ProfileContext';
import { Profile, SearchFilters } from '../types';
import { Users } from 'lucide-react';

const ProfilesPage: React.FC = () => {
  const { profiles, loading, error, searchProfiles } = useProfiles();
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (profiles.length > 0) {
      const results = searchProfiles(searchFilters);
      setFilteredProfiles(results);
      
      // Reset selected profile if it's no longer in the filtered results
      if (selectedProfile && !results.find(p => p.id === selectedProfile.id)) {
        setSelectedProfile(null);
      }
    }
  }, [profiles, searchFilters, searchProfiles, selectedProfile]);

  const handleSummaryClick = (profile: Profile) => {
    setSelectedProfile(profile);
    
    // On mobile, scroll to the map section
    if (window.innerWidth < 768) {
      const mapSection = document.getElementById('map-section');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/profiles/${id}`);
  };

  if (loading && profiles.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
          <Users size={24} className="mr-2 text-indigo-600" /> 
          Profile Explorer
        </h1>
        <p className="text-gray-600">
          Explore profiles and their locations on the map.
        </p>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h2 className="font-semibold text-gray-700 mb-2">
              {filteredProfiles.length} {filteredProfiles.length === 1 ? 'Profile' : 'Profiles'} Found
            </h2>
          </div>
          
          <ProfileList 
            profiles={filteredProfiles}
            onSummaryClick={handleSummaryClick}
          />
        </div>
        
        <div id="map-section" className="lg:sticky lg:top-24">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h2 className="font-semibold text-gray-700">
              {selectedProfile ? `Viewing: ${selectedProfile.name}` : 'Select a profile to view on map'}
            </h2>
          </div>
          
          <div className="h-[500px]">
            <MapComponent 
              profiles={filteredProfiles}
              selectedProfile={selectedProfile}
              onSelectProfile={handleProfileSelect}
              height="500px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;