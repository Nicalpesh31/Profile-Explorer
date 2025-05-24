import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import { Profile, ProfileFormData } from '../../types';

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading: boolean;
}

const initialState: ProfileFormData = {
  name: '',
  photo: '',
  description: '',
  address: '',
  location: {
    latitude: 0,
    longitude: 0,
  },
  contact: {
    email: '',
    phone: '',
    website: '',
  },
  skills: [],
  interests: [],
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSubmit,
  onDelete,
  isLoading,
}) => {
  const [formData, setFormData] = useState<ProfileFormData>(initialState);
  const [skillsInput, setSkillsInput] = useState('');
  const [interestsInput, setInterestsInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const isEditMode = !!profile;

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        photo: profile.photo,
        description: profile.description,
        address: profile.address,
        location: profile.location,
        contact: profile.contact || {},
        skills: profile.skills || [],
        interests: profile.interests || [],
      });
      
      setSkillsInput(profile.skills ? profile.skills.join(', ') : '');
      setInterestsInput(profile.interests ? profile.interests.join(', ') : '');
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value,
        },
      }));
    } else if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      const numValue = parseFloat(value);
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: isNaN(numValue) ? 0 : numValue,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsInput(e.target.value);
    
    // Split by commas and trim
    const skillsArray = e.target.value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '');
      
    setFormData(prev => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestsInput(e.target.value);
    
    // Split by commas and trim
    const interestsArray = e.target.value
      .split(',')
      .map(interest => interest.trim())
      .filter(interest => interest !== '');
      
    setFormData(prev => ({
      ...prev,
      interests: interestsArray,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.photo.trim()) {
      newErrors.photo = 'Photo URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.photo)) {
      newErrors.photo = 'Please enter a valid URL starting with http:// or https://';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (formData.contact?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) {
      newErrors['contact.email'] = 'Please enter a valid email address';
    }
    
    if (!formData.location?.latitude && formData.location?.latitude !== 0) {
      newErrors['location.latitude'] = 'Latitude is required';
    }
    
    if (!formData.location?.longitude && formData.location?.longitude !== 0) {
      newErrors['location.longitude'] = 'Longitude is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    try {
      await onSubmit(formData);
      navigate('/admin');
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  const handleDelete = async () => {
    if (onDelete && confirm('Are you sure you want to delete this profile?')) {
      try {
        await onDelete();
        navigate('/admin');
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {isEditMode ? 'Edit Profile' : 'Create New Profile'}
        </h2>
        
        <div className="flex space-x-3">
          <Link
            to="/admin"
            className="btn btn-ghost"
          >
            <ArrowLeft size={18} className="mr-1" /> Cancel
          </Link>
          
          {isEditMode && onDelete && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <Trash2 size={18} className="mr-1" /> Delete
            </button>
          )}
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            <Save size={18} className="mr-1" /> {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input ${errors.name ? 'border-red-500' : ''}`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="photo" className="block font-medium text-gray-700 mb-1">
              Photo URL *
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`input ${errors.photo ? 'border-red-500' : ''}`}
              required
            />
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
            
            {formData.photo && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img 
                  src={formData.photo}
                  alt="Profile preview"
                  className="w-20 h-20 object-cover rounded-full border border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/150?text=Invalid+Image';
                  }}
                />
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`input ${errors.description ? 'border-red-500' : ''}`}
              required
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="address" className="block font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`input ${errors.address ? 'border-red-500' : ''}`}
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block font-medium text-gray-700 mb-1">
                Latitude *
              </label>
              <input
                type="number"
                id="latitude"
                name="location.latitude"
                value={formData.location?.latitude || 0}
                onChange={handleChange}
                step="any"
                className={`input ${errors['location.latitude'] ? 'border-red-500' : ''}`}
                required
              />
              {errors['location.latitude'] && <p className="text-red-500 text-sm mt-1">{errors['location.latitude']}</p>}
            </div>
            <div>
              <label htmlFor="longitude" className="block font-medium text-gray-700 mb-1">
                Longitude *
              </label>
              <input
                type="number"
                id="longitude"
                name="location.longitude"
                value={formData.location?.longitude || 0}
                onChange={handleChange}
                step="any"
                className={`input ${errors['location.longitude'] ? 'border-red-500' : ''}`}
                required
              />
              {errors['location.longitude'] && <p className="text-red-500 text-sm mt-1">{errors['location.longitude']}</p>}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="contact.email"
              value={formData.contact?.email || ''}
              onChange={handleChange}
              className={`input ${errors['contact.email'] ? 'border-red-500' : ''}`}
            />
            {errors['contact.email'] && <p className="text-red-500 text-sm mt-1">{errors['contact.email']}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="contact.phone"
              value={formData.contact?.phone || ''}
              onChange={handleChange}
              className="input"
            />
          </div>
          
          <div>
            <label htmlFor="website" className="block font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="contact.website"
              value={formData.contact?.website || ''}
              onChange={handleChange}
              className="input"
              placeholder="example.com"
            />
          </div>
          
          <div>
            <label htmlFor="skills" className="block font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={skillsInput}
              onChange={handleSkillsChange}
              className="input"
              placeholder="React, JavaScript, UI Design"
            />
            
            {formData.skills && formData.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="badge bg-indigo-100 text-indigo-800">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="interests" className="block font-medium text-gray-700 mb-1">
              Interests (comma separated)
            </label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={interestsInput}
              onChange={handleInterestsChange}
              className="input"
              placeholder="Photography, Travel, Reading"
            />
            
            {formData.interests && formData.interests.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.interests.map((interest, index) => (
                  <span key={index} className="badge bg-teal-100 text-teal-800">
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;