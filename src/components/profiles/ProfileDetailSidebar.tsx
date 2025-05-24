import React from 'react';
import { MapPin, Mail, Phone, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Profile } from '../../types';

interface ProfileDetailSidebarProps {
  profile: Profile;
  onShowOnMap: () => void;
}

const ProfileDetailSidebar: React.FC<ProfileDetailSidebarProps> = ({ profile, onShowOnMap }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img 
          src={profile.photo} 
          alt={profile.name}
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
        
        <div className="flex items-start mb-4 text-gray-600">
          <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0 text-indigo-600" />
          <span>{profile.address}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          {profile.contact?.email && (
            <div className="flex items-center text-gray-600">
              <Mail size={16} className="mr-2 text-indigo-600" />
              <a 
                href={`mailto:${profile.contact.email}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {profile.contact.email}
              </a>
            </div>
          )}
          
          {profile.contact?.phone && (
            <div className="flex items-center text-gray-600">
              <Phone size={16} className="mr-2 text-indigo-600" />
              <a 
                href={`tel:${profile.contact.phone}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {profile.contact.phone}
              </a>
            </div>
          )}
          
          {profile.contact?.website && (
            <div className="flex items-center text-gray-600">
              <Globe size={16} className="mr-2 text-indigo-600" />
              <a 
                href={profile.contact.website.startsWith('http') ? profile.contact.website : `https://${profile.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition-colors"
              >
                {profile.contact.website}
              </a>
            </div>
          )}
        </div>
        
        <button
          onClick={onShowOnMap}
          className="btn btn-primary w-full mb-3"
        >
          <MapPin size={16} className="mr-1" />
          Show on Map
        </button>
        
        <Link to="/profiles" className="btn btn-ghost w-full flex justify-center">
          <ArrowLeft size={16} className="mr-1" />
          Back to Profiles
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetailSidebar;