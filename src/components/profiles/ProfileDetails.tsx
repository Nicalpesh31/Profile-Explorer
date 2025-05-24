import React from 'react';
import { MapPin, Mail, Phone, Globe, Calendar, Tag } from 'lucide-react';
import { Profile } from '../../types';

interface ProfileDetailsProps {
  profile: Profile;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-64 overflow-hidden relative">
        <img 
          src={profile.photo} 
          alt={`${profile.name} profile`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{profile.address}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">About</h2>
          <p className="text-gray-700">{profile.description}</p>
        </div>
        
        {(profile.contact?.email || profile.contact?.phone || profile.contact?.website) && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Contact Information</h2>
            <div className="space-y-2">
              {profile.contact?.email && (
                <div className="flex items-center text-gray-700">
                  <Mail size={18} className="mr-2 text-indigo-500" />
                  <a href={`mailto:${profile.contact.email}`} className="hover:text-indigo-600">
                    {profile.contact.email}
                  </a>
                </div>
              )}
              
              {profile.contact?.phone && (
                <div className="flex items-center text-gray-700">
                  <Phone size={18} className="mr-2 text-indigo-500" />
                  <a href={`tel:${profile.contact.phone}`} className="hover:text-indigo-600">
                    {profile.contact.phone}
                  </a>
                </div>
              )}
              
              {profile.contact?.website && (
                <div className="flex items-center text-gray-700">
                  <Globe size={18} className="mr-2 text-indigo-500" />
                  <a 
                    href={profile.contact.website.startsWith('http') ? profile.contact.website : `https://${profile.contact.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600"
                  >
                    {profile.contact.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
        
        {profile.skills && profile.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span key={index} className="badge bg-indigo-100 text-indigo-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {profile.interests && profile.interests.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span key={index} className="badge bg-teal-100 text-teal-800">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Added: {formatDate(profile.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Updated: {formatDate(profile.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;