import React from 'react';
import ProfileCard from './ProfileCard';
import { Profile } from '../../types';

interface ProfileListProps {
  profiles: Profile[];
  onSummaryClick: (profile: Profile) => void;
  showAdminControls?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  onSummaryClick,
  showAdminControls = false,
  onEdit,
  onDelete,
}) => {
  if (profiles.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No profiles found. Try adjusting your search criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onSummaryClick={onSummaryClick}
          showAdminControls={showAdminControls}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProfileList;