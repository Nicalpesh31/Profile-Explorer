import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Info, Edit, Trash2 } from 'lucide-react';
import { Profile } from '../../types';

interface ProfileCardProps {
  profile: Profile;
  onSummaryClick: (profile: Profile) => void;
  showAdminControls?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onSummaryClick,
  showAdminControls = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="card group hover:translate-y-[-2px] transition-all">
      <div className="h-48 overflow-hidden">
        <img
          src={profile.photo}
          alt={`${profile.name} profile`}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          
          {showAdminControls && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit && onEdit(profile.id)}
                className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                aria-label="Edit profile"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete && onDelete(profile.id)}
                className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                aria-label="Delete profile"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 line-clamp-2 text-sm">
          {profile.description}
        </p>
        
        <div className="flex items-start text-sm text-gray-500">
          <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{profile.address}</span>
        </div>
        
        <div className="flex justify-between pt-2">
          <button
            className="btn btn-ghost text-sm flex items-center"
            onClick={() => onSummaryClick(profile)}
            aria-label="Show on map"
          >
            <MapPin size={16} className="mr-1" /> 
            Show on Map
          </button>
          
          <Link
            to={`/profiles/${profile.id}`}
            className="btn btn-ghost text-sm flex items-center text-indigo-600 hover:text-indigo-800"
            aria-label="View details"
          >
            <Info size={16} className="mr-1" />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;