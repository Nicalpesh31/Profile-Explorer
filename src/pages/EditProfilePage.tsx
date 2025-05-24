import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileForm from '../components/admin/ProfileForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useProfiles } from '../contexts/ProfileContext';
import { ProfileFormData } from '../types';
import { UserPlus, UserCog } from 'lucide-react';

const EditProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProfileById, addProfile, updateProfile, deleteProfile, loading } = useProfiles();
  const navigate = useNavigate();
  
  const isEditMode = id !== 'new';
  const profile = isEditMode ? getProfileById(id!) : undefined;

  // If in edit mode but profile not found, redirect to admin
  React.useEffect(() => {
    if (isEditMode && !profile && !loading) {
      navigate('/admin', { replace: true });
    }
  }, [isEditMode, profile, loading, navigate]);

  const handleSubmit = async (data: ProfileFormData) => {
    try {
      if (isEditMode && profile) {
        await updateProfile(profile.id, data);
      } else {
        await addProfile(data);
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDelete = async () => {
    if (isEditMode && profile) {
      try {
        await deleteProfile(profile.id);
        navigate('/admin');
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
          {isEditMode ? (
            <>
              <UserCog size={24} className="mr-2 text-indigo-600" />
              Edit Profile
            </>
          ) : (
            <>
              <UserPlus size={24} className="mr-2 text-indigo-600" />
              Add New Profile
            </>
          )}
        </h1>
        <p className="text-gray-600">
          {isEditMode 
            ? 'Update profile information and location.'
            : 'Create a new profile with location information.'}
        </p>
      </div>
      
      <ProfileForm
        profile={profile}
        onSubmit={handleSubmit}
        onDelete={isEditMode ? handleDelete : undefined}
        isLoading={loading}
      />
    </div>
  );
};

export default EditProfilePage;