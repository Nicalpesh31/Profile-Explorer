import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Settings } from 'lucide-react';
import ProfileList from '../components/profiles/ProfileList';
import SearchBar from '../components/ui/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useProfiles } from '../contexts/ProfileContext';
import { Profile, SearchFilters } from '../types';

const AdminDashboard: React.FC = () => {
  const { profiles, loading, error, deleteProfile, searchProfiles } = useProfiles();
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });
  
  const navigate = useNavigate();

  // Memoize the search handler
  const handleSearch = useCallback((filters: SearchFilters) => {
    setSearchFilters(filters);
    setFilteredProfiles(searchProfiles(filters));
  }, [searchProfiles]);

  const handleEdit = (id: string) => {
    navigate(`/admin/profile/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await deleteProfile(id);
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
            <Settings size={24} className="mr-2 text-indigo-600" /> 
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage profiles and their information.
          </p>
        </div>
        
        <Link
          to="/admin/profile/new"
          className="btn btn-primary mt-4 sm:mt-0 flex items-center justify-center"
        >
          <Plus size={18} className="mr-1" />
          Add New Profile
        </Link>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h2 className="font-semibold text-gray-700 mb-2">
          Managing {filteredProfiles.length} {filteredProfiles.length === 1 ? 'Profile' : 'Profiles'}
        </h2>
      </div>
      
      <ProfileList
        profiles={filteredProfiles}
        onSummaryClick={(profile) => navigate(`/profiles/${profile.id}`)}
        showAdminControls={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;