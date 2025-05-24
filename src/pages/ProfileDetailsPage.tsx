import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MapComponent from '../components/map/MapComponent';
import ProfileDetails from '../components/profiles/ProfileDetails';
import ProfileDetailSidebar from '../components/profiles/ProfileDetailSidebar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useProfiles } from '../contexts/ProfileContext';
import { Profile } from '../types';

const ProfileDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProfileById, profiles, loading } = useProfiles();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [mapVisible, setMapVisible] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (id && profiles.length > 0) {
      const foundProfile = getProfileById(id);
      
      if (!foundProfile) {
        navigate('/profiles', { replace: true });
        return;
      }
      
      setProfile(foundProfile);
    }
  }, [id, profiles, getProfileById, navigate]);

  const handleShowOnMap = () => {
    setMapVisible(true);
    
    // On mobile, scroll to map section
    if (window.innerWidth < 768) {
      const mapSection = document.getElementById('profile-map-section');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ProfileDetailSidebar 
            profile={profile}
            onShowOnMap={handleShowOnMap}
          />
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileDetails profile={profile} />
          
          <div id="profile-map-section" className={mapVisible ? 'block' : 'hidden'}>
            <h2 className="text-xl font-semibold mb-3">Location</h2>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapComponent 
                profiles={[profile]}
                selectedProfile={profile}
                height="400px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;