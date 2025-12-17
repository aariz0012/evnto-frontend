import Cookies from 'js-cookie';
import api from '@/utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  FiCalendar, 
  FiPlus, 
  FiClock, 
  FiMapPin, 
  FiX,
  FiUser, 
  FiDollarSign, 
  FiUsers,
  FiSettings,
  FiCamera,
  FiImage,
  FiBell,
  FiHeart,
  FiSave,
  FiSun,
  FiMoon,
  FiLock,
  FiInfo
} from 'react-icons/fi';

// Dynamic imports for non-critical components
const VenueCardSkeleton = dynamic(() => import('../components/Skeletons/VenueCardSkeleton'));
const EventItemSkeleton = dynamic(() => import('../components/Skeletons/EventItemSkeleton'));

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Profile Modal Component
const ProfileModal = ({ isOpen, onClose, user, isEditing, onEditToggle, newEmail, setNewEmail,onEmailUpdate, formData, setFormData }) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState(null);
  const router = useRouter();
  const { updateUserProfile } = useAuth();
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    country: 'India',
    state: '',
    district: '',
    pincode: '',
    address: ''
  });

  // Email update state
  const [emailData, setEmailData] = useState({
    currentEmail: '',
    newEmail: '',
    confirmNewEmail: ''
  });
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // If it's a data URL (base64), return as is
    if (imagePath.startsWith('data:')) {
      return imagePath;
    }
    // Otherwise, construct full URL with API base URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    // Remove trailing slash from API URL if present
    const baseUrl = apiUrl.replace(/\/$/, '');
    // Ensure image path starts with /
    const imagePathFormatted = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${baseUrl}${imagePathFormatted}`;
  };

  // Update form data when user prop changes
  useEffect(() => {
    if (user && !isEditing) {
      // Only sync when not in edit mode to avoid overwriting user's edits
       const { email, ...userProfile } = user;
       setProfileData(prev => ({
        ...prev,
        ...userProfile,
        // Ensure we don't override with undefined values
        fullName: userProfile.fullName || '',
        phone: userProfile.phone || '',
        dateOfBirth: userProfile.dateOfBirth || '',
        gender: userProfile.gender || '',
        country: userProfile.country || 'India',
        state: userProfile.state || '',
        district: userProfile.district || '',
        pincode: userProfile.pincode || '',
        address: userProfile.address || ''
      }));

      setEmailData(prev => ({
        ...prev,
        currentEmail: email || ''
      }));

      // Update current profile image when user changes
      if (userProfile.profilePicture) {
        setCurrentProfileImage(getImageUrl(userProfile.profilePicture));
      } else {
        setCurrentProfileImage(null);
      }

      // Also sync formData when user changes (for view mode display)
      // Only update if not in edit mode to preserve user's current edits
      if (setFormData && !isEditing) {
        const newFormData = {
          fullName: userProfile.fullName || '',
          email: email || '',
          phone: userProfile.phone || '',
          dateOfBirth: userProfile.dateOfBirth || '',
          gender: userProfile.gender || '',
          country: userProfile.country || 'India',
          state: userProfile.state || '',
          district: userProfile.district || '',
          pincode: userProfile.pincode || '',
          address: userProfile.address || ''
        };
        
        // Always update formData when user changes and not in edit mode
        // This ensures view mode shows the latest data
        setFormData(newFormData);
      }
    }
  }, [user, setFormData, isEditing]);

   const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle change for formData (used in the form inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (setFormData) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission using formData
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only allow submission when in edit mode
    if (!isEditing) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields from formData
      if (formData) {
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
            formDataToSend.append(key, formData[key]);
          }
        });
      }

      // Append profile image if changed
      if (previewImage) {
        const response = await fetch(previewImage);
        const blob = await response.blob();
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        formDataToSend.append('profileImage', file);
      }

      const updatedUser = await updateProfile(formDataToSend);
      
      // Merge the API response with the current formData to ensure all fields are updated
      // The backend now saves all profile fields, but we merge to ensure consistency
      if (updatedUser) {
        // Prioritize formData values (what user just entered) - these are the current edits
        const newFormData = {
          // Use formData value first (user's current input), then fallback to API response
          fullName: formData.fullName || updatedUser.fullName || '',
          email: updatedUser.email || formData.email || '',
          address: formData.address || updatedUser.address || '',
          // Preserve the current formData values for fields the API doesn't update
          phone: formData.phone || updatedUser.phone || '',
          dateOfBirth: formData.dateOfBirth || updatedUser.dateOfBirth || '',
          gender: formData.gender || updatedUser.gender || '',
          country: formData.country || updatedUser.country || 'India',
          state: formData.state || updatedUser.state || '',
          district: formData.district || updatedUser.district || '',
          pincode: formData.pincode || updatedUser.pincode || ''
        };
        
        // Get the profile picture URL from API response or keep existing
        // The API might return profilePicture or profileImage field
        const profilePictureUrl = updatedUser.profilePicture || updatedUser.profileImage || user?.profilePicture;
        
        // Update current profile image immediately if we have a new URL
        if (profilePictureUrl) {
          setCurrentProfileImage(getImageUrl(profilePictureUrl));
        }
        
        // Update formData immediately with merged data
        setFormData(newFormData);
        
        // Create a merged user object for AuthContext that includes all fields
        const mergedUser = {
          ...updatedUser,
          // Ensure all fields from formData are included
          fullName: newFormData.fullName, // Use the formData value (user's input)
          phone: newFormData.phone,
          dateOfBirth: newFormData.dateOfBirth,
          gender: newFormData.gender,
          country: newFormData.country,
          state: newFormData.state,
          district: newFormData.district,
          pincode: newFormData.pincode,
          // Include updated profile picture if available
          profilePicture: profilePictureUrl || updatedUser.profilePicture || updatedUser.profileImage
        };
        
        // Update the user in the auth context with merged data
        updateUserProfile(mergedUser);
        
        // Handle profile picture preview
        // Clear previewImage after a short delay to allow the new image to load
        if (previewImage && profilePictureUrl) {
          // Clear preview after user object updates and new image is set
          setTimeout(() => {
            setPreviewImage(null);
          }, 500);
        }
      }
      
      toast.success('Profile updated successfully');
      
      // Use setTimeout to ensure state updates are applied before exiting edit mode
      setTimeout(() => {
        onEditToggle(false); // Exit edit mode
      }, 100);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // API call to update profile
  const updateProfile = async (formData) => {
    try {
      // Check both localStorage and Cookies for token
      const token = localStorage.getItem('token') || Cookies.get('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.put('/api/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      // API returns { success: true, data: user }
      const updatedUser = response.data.data || response.data;
      
      // Log for debugging
      console.log('Profile update response:', updatedUser);
      
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  // API call to update email
  const updateEmail = async (newEmail) => {
    try {
      // Check both localStorage and Cookies for token
      const token = localStorage.getItem('token') || Cookies.get('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.post('/api/users/change-email', 
        { email: newEmail },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Email update error:', error);
      throw error;
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all profile fields
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== null && profileData[key] !== undefined) {
          formDataToSend.append(key, profileData[key]);
        }
      });

      // Append profile image if changed
      if (previewImage) {
        const response = await fetch(previewImage);
        const blob = await response.blob();
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        formDataToSend.append('profileImage', file);
      }

      const updatedUser = await updateProfile(formDataToSend);
      
      // IMPORTANT: The backend API only updates fullName and address
      // So we need to preserve the profileData/formData values for other fields that were just edited
      if (updatedUser) {
        // Prioritize profileData/formData values (what user just entered)
        const newFormData = {
          // Use profileData/formData value first (user's current input)
          fullName: profileData.fullName || formData.fullName || updatedUser.fullName || '',
          email: updatedUser.email || formData.email || '',
          address: profileData.address || formData.address || updatedUser.address || '',
          // Preserve the current profileData/formData values for fields the API doesn't update
          phone: profileData.phone || formData.phone || updatedUser.phone || '',
          dateOfBirth: profileData.dateOfBirth || formData.dateOfBirth || updatedUser.dateOfBirth || '',
          gender: profileData.gender || formData.gender || updatedUser.gender || '',
          country: profileData.country || formData.country || updatedUser.country || 'India',
          state: profileData.state || formData.state || updatedUser.state || '',
          district: profileData.district || formData.district || updatedUser.district || '',
          pincode: profileData.pincode || formData.pincode || updatedUser.pincode || ''
        };
        
        // Get the profile picture URL from API response
        const profilePictureUrl = updatedUser.profilePicture || updatedUser.profileImage || user?.profilePicture;
        
        // Update formData immediately with merged data
        setFormData(newFormData);
        
        // Create a merged user object for AuthContext that includes all fields
        const mergedUser = {
          ...updatedUser,
          // Ensure all fields from formData are included
          fullName: newFormData.fullName, // Use the formData value (user's input)
          phone: newFormData.phone,
          dateOfBirth: newFormData.dateOfBirth,
          gender: newFormData.gender,
          country: newFormData.country,
          state: newFormData.state,
          district: newFormData.district,
          pincode: newFormData.pincode,
          // Include updated profile picture if available
          profilePicture: profilePictureUrl
        };
        
        // Update the user in the auth context with merged data
        updateUserProfile(mergedUser);
        
        // Handle profile picture preview
        // If we uploaded an image and API returned a new URL, we can clear previewImage
        // But keep it if API didn't return a URL yet (it will be used until user object updates)
        if (previewImage) {
          if (profilePictureUrl && profilePictureUrl !== user?.profilePicture) {
            // API returned new profile picture URL, we can clear preview after a short delay
            // to ensure the user object has updated
            setTimeout(() => {
              setPreviewImage(null);
            }, 500);
          }
          // If no URL from API yet, keep previewImage so the image still displays
        }
      }
      
      toast.success('Profile updated successfully');
      
      // Use setTimeout to ensure state updates are applied before exiting edit mode
      setTimeout(() => {
        onEditToggle(false); // Exit edit mode
      }, 100);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (emailData.newEmail !== emailData.confirmNewEmail) {
      toast.error('Email addresses do not match');
      return;
    }

    if (emailData.newEmail === emailData.currentEmail) {
      toast.error('New email must be different from current email');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateEmail(emailData.newEmail);
      
      toast.success('Verification email sent. Please check your inbox to confirm the email change.');
      setIsEditingEmail(false);
      setEmailData(prev => ({
        ...prev,
        newEmail: '',
        confirmNewEmail: ''
      }));
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error(error.response?.data?.message || 'Failed to update email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = (source) => {
    if (source === 'camera') {
      fileInputRef.current.setAttribute('capture', 'environment');
    } else {
      fileInputRef.current.removeAttribute('capture');
    }
    fileInputRef.current.click();
  };

  const fetchStateAndDistrict = async (pincode) => {
    if (!pincode || pincode.length !== 6) return;
    
    try {
      setIsPincodeLoading(true);
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice[0]) {
        const postOffice = data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          state: postOffice.State,
          district: postOffice.District
        }));
      } else {
        toast.error('Invalid pincode. Please enter a valid Indian pincode.');
      }
    } catch (error) {
      console.error('Error fetching pincode details:', error);
      toast.error('Failed to fetch pincode details. Please try again.');
    } finally {
      setIsPincodeLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif' }}
    >
      <div 
        className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        onClick={onClose}
      >
        {/* Background overlay - soft light background */}
        <div 
          className="fixed inset-0 bg-gray-50 dark:bg-gray-900 transition-opacity" 
          aria-hidden="true"
        ></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal content - single large soft-edged card */}
        <div 
          className="inline-block transform overflow-hidden rounded-3xl bg-white dark:bg-gray-800 text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle border border-gray-100 dark:border-gray-700"
          onClick={e => e.stopPropagation()}
          style={{ 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
          }}
        >
          <div className="px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
            <div className="w-full">
              {/* Header - Simple and centered */}
              <div className="flex justify-between items-center mb-8">
                <h3 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center flex-1" 
                  id="modal-title"
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Your Profile
                </h3>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none p-2 transition-colors ml-4"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

                <form onSubmit={isEditing ? handleSubmit : (e) => e.preventDefault()} className="mt-2">
                  {/* Profile Photo Section */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="h-32 w-32 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden mb-4 border-2 border-gray-200 dark:border-gray-600 shadow-md relative">
                      {(() => {
                        // Prioritize previewImage (user just selected), then currentProfileImage, then user.profilePicture
                        const imageToShow = previewImage || currentProfileImage || (user?.profilePicture ? getImageUrl(user.profilePicture) : null);
                        
                        if (imageToShow) {
                          return (
                            <img 
                              src={imageToShow} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                // If image fails to load, show placeholder
                                console.error('Failed to load profile image:', imageToShow);
                                e.target.style.display = 'none';
                              }}
                              key={imageToShow} // Force re-render when URL changes
                            />
                          );
                        } else {
                          return <FiUser className="h-16 w-16 text-gray-400" />;
                        }
                      })()}
                    </div>
                    {isEditing && (
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => triggerFileInput('gallery')}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white transition-colors"
                          style={{ backgroundColor: '#15803d', fontWeight: 500 }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#166534'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#15803d'}
                        >
                          <FiImage className="mr-2 h-4 w-4" />
                          Gallery
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerFileInput('camera')}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                          style={{ fontWeight: 500 }}
                        >
                          <FiCamera className="mr-2 h-4 w-4" />
                          Camera
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="col-span-2">
                      <div className="relative">
                        <label 
                          htmlFor="fullName" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2"
                            style={{
                              borderColor: '#d1d5db',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#111827',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#15803d';
                              e.target.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#d1d5db';
                              e.target.style.boxShadow = 'none';
                            }}
                            required
                          />
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {formData.fullName || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                      <div className="relative">
                        <label 
                          htmlFor="email" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          Email
                        </label>
                        {isEditingEmail ? (
                          <div className="flex gap-2">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              className="flex-1 block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2"
                              style={{
                                borderColor: '#d1d5db',
                                fontSize: '15px',
                                fontWeight: 500,
                                color: '#111827',
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                              }}
                              placeholder="Enter new email"
                              onFocus={(e) => {
                                e.target.style.borderColor = '#15803d';
                                e.target.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.1)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = '#d1d5db';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                            <button
                              type="button"
                              onClick={onEmailUpdate}
                              className="inline-flex items-center px-4 py-3.5 border border-transparent text-sm font-medium rounded-lg text-white transition-colors"
                              style={{ 
                                backgroundColor: '#15803d',
                                fontWeight: 500
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#166534'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = '#15803d'}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsEditingEmail(false);
                                setNewEmail(formData.email || '');
                              }}
                              className="inline-flex items-center px-4 py-3.5 border text-sm font-medium rounded-lg transition-colors"
                              style={{ 
                                borderColor: '#d1d5db',
                                color: '#374151',
                                backgroundColor: '#ffffff',
                                fontWeight: 500
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f9fafb';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#ffffff';
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <p 
                              className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50 flex-1"
                              style={{ 
                                fontSize: '15px',
                                fontWeight: 500,
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                              }}
                            >
                              {formData.email || 'Not provided'}
                            </p>
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => {
                                  setIsEditingEmail(true);
                                  setNewEmail(formData.email || '');
                                }}
                                className="ml-3 text-sm font-medium transition-colors"
                                style={{ 
                                  color: '#15803d',
                                  fontWeight: 500
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#166534'}
                                onMouseLeave={(e) => e.target.style.color = '#15803d'}
                              >
                                CHANGE
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="relative">
                        <label 
                          htmlFor="phone" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2"
                            style={{
                              borderColor: '#d1d5db',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#111827',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#15803d';
                              e.target.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#d1d5db';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {formData.phone || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <div className="relative">
                        <label 
                          htmlFor="gender" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          Gender
                        </label>
                        {isEditing ? (
                          <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2"
                            style={{
                              borderColor: '#d1d5db',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#111827',
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              backgroundColor: '#ffffff'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#15803d';
                              e.target.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#d1d5db';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <div className="relative">
                        <label 
                          htmlFor="dateOfBirth" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2"
                            style={{
                              borderColor: '#d1d5db',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#111827',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#15803d';
                              e.target.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#d1d5db';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {formData.dateOfBirth || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <div className="relative">
                        <label 
                          htmlFor="country" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          Country
                        </label>
                        {isEditing ? (
                          <select
                            name="country"
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2"
                            style={{
                              borderColor: '#d1d5db',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#111827',
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              backgroundColor: '#ffffff'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#15803d';
                              e.target.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#d1d5db';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            {/* Add more countries as needed */}
                          </select>
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {formData.country || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Pincode */}
                    <div>
                      <div className="relative">
                        <label 
                          htmlFor="pincode" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          Pincode
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <input
                              type="text"
                              name="pincode"
                              id="pincode"
                              value={formData.pincode}
                              onChange={(e) => {
                                handleChange(e);
                                if (e.target.value.length === 6) {
                                  fetchStateAndDistrict(e.target.value);
                                }
                              }}
                              maxLength="6"
                              className="block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2"
                              style={{
                                borderColor: '#d1d5db',
                                fontSize: '15px',
                                fontWeight: 500,
                                color: '#111827',
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                              }}
                              placeholder="Enter 6-digit pincode"
                              onFocus={(e) => {
                                e.target.style.borderColor = '#15803d';
                                e.target.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.1)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = '#d1d5db';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                            {isPincodeLoading && (
                              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {formData.pincode || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* State */}
                    <div>
                      <div className="relative">
                        <label 
                          htmlFor="state" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          State
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="state"
                            id="state"
                            value={formData.state}
                            readOnly
                            className="block w-full px-4 py-3.5 rounded-lg border transition-all"
                            style={{
                              borderColor: '#d1d5db',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#111827',
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              backgroundColor: '#f9fafb',
                              cursor: 'not-allowed'
                            }}
                          />
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {formData.state || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* District */}
                    <div>
                      <div className="relative">
                        <label 
                          htmlFor="district" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          District
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="district"
                            id="district"
                            value={formData.district}
                            readOnly
                            className="block w-full px-4 py-3.5 rounded-lg border transition-all"
                            style={{
                              borderColor: '#d1d5db',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#111827',
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              backgroundColor: '#f9fafb',
                              cursor: 'not-allowed'
                            }}
                          />
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            {formData.district || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="col-span-2">
                      <div className="relative">
                        <label 
                          htmlFor="address" 
                          className="block text-sm font-medium mb-2"
                          style={{ 
                            color: '#6b7280',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                        >
                          Full Address
                        </label>
                        {isEditing ? (
                          <textarea
                            name="address"
                            id="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2 resize-none"
                            style={{
                              borderColor: '#d1d5db',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#111827',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                            placeholder="Enter your full address"
                            onFocus={(e) => {
                              e.target.style.borderColor = '#15803d';
                              e.target.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#d1d5db';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        ) : (
                          <p 
                            className="px-4 py-3.5 text-gray-900 dark:text-white font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50 whitespace-pre-line"
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 500,
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              minHeight: '3.5rem'
                            }}
                          >
                            {formData.address || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex justify-end space-x-3">
                    {!isEditing ? (
                      <>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg border py-3 px-6 text-sm font-medium transition-colors focus:outline-none"
                          style={{
                            borderColor: '#d1d5db',
                            color: '#374151',
                            backgroundColor: '#ffffff',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#ffffff';
                          }}
                          onClick={onClose}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg border border-transparent py-3 px-6 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{
                            backgroundColor: '#15803d',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#166534';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#15803d';
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEditToggle(true);
                          }}
                        >
                          Edit Profile
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg border py-3 px-6 text-sm font-medium transition-colors focus:outline-none disabled:opacity-50"
                          style={{
                            borderColor: '#d1d5db',
                            color: '#374151',
                            backgroundColor: '#ffffff',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSubmitting) {
                              e.target.style.backgroundColor = '#f9fafb';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#ffffff';
                          }}
                          onClick={() => {
                            onEditToggle(false);
                            // Reset form to original user data
                            if (user) {
                              setFormData({
                                fullName: user.fullName || '',
                                email: user.email || '',
                                phone: user.phone || '',
                                dateOfBirth: user.dateOfBirth || '',
                                gender: user.gender || '',
                                country: user.country || 'India',
                                state: user.state || '',
                                district: user.district || '',
                                pincode: user.pincode || '',
                                address: user.address || ''
                              });
                            }
                          }}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-lg border border-transparent py-3 px-6 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                          style={{
                            backgroundColor: '#15803d',
                            fontWeight: 500,
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSubmitting) {
                              e.target.style.backgroundColor = '#166534';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#15803d';
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

// Change Password Modal Component
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token') || Cookies.get('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.put(
        '/api/users/change-password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Password changed successfully');
        // Reset form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        onClose();
      }
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to change password';
      toast.error(errorMessage);
      
      // Set specific error for current password if it's wrong
      if (error.response?.status === 401 || errorMessage.toLowerCase().includes('current password')) {
        setErrors(prev => ({
          ...prev,
          currentPassword: 'Current password is incorrect'
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif' }}
    >
      <div 
        className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        onClick={handleClose}
      >
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-50 dark:bg-gray-900 transition-opacity" 
          aria-hidden="true"
        ></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal content */}
        <div 
          className="inline-block transform overflow-hidden rounded-3xl bg-white dark:bg-gray-800 text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:align-middle border border-gray-100 dark:border-gray-700"
          onClick={e => e.stopPropagation()}
          style={{ 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
          }}
        >
          <div className="px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
            <div className="w-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h3 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center flex-1" 
                  id="modal-title"
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Change Password
                </h3>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none p-2 transition-colors ml-4"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-2">
                {/* Current Password */}
                <div className="mb-6">
                  <div className="relative">
                    <label 
                      htmlFor="currentPassword" 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: '#6b7280',
                        fontWeight: 500,
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#111827',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.currentPassword ? '#ef4444' : '#15803d';
                        e.target.style.boxShadow = errors.currentPassword 
                          ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                          : '0 0 0 3px rgba(21, 128, 61, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.currentPassword ? '#ef4444' : '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                      required
                    />
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* New Password */}
                <div className="mb-6">
                  <div className="relative">
                    <label 
                      htmlFor="newPassword" 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: '#6b7280',
                        fontWeight: 500,
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#111827',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.newPassword ? '#ef4444' : '#15803d';
                        e.target.style.boxShadow = errors.newPassword 
                          ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                          : '0 0 0 3px rgba(21, 128, 61, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.newPassword ? '#ef4444' : '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                      required
                    />
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {errors.newPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <div className="relative">
                    <label 
                      htmlFor="confirmPassword" 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: '#6b7280',
                        fontWeight: 500,
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#111827',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#15803d';
                        e.target.style.boxShadow = errors.confirmPassword 
                          ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                          : '0 0 0 3px rgba(21, 128, 61, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg border py-3 px-6 text-sm font-medium transition-colors focus:outline-none"
                    style={{
                      borderColor: '#d1d5db',
                      color: '#374151',
                      backgroundColor: '#ffffff',
                      fontWeight: 500,
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ffffff';
                    }}
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-lg border border-transparent py-3 px-6 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                    style={{
                      backgroundColor: '#15803d',
                      fontWeight: 500,
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.backgroundColor = '#166534';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#15803d';
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showSavedAnimation, setShowSavedAnimation] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const settingsDropdownRef = useRef(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    country: 'India',
    state: '',
    district: '',
    pincode: '',
    address: ''
  });

  // Initialize formData from user
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        country: user.country || 'India',
        state: user.state || '',
        district: user.district || '',
        pincode: user.pincode || '',
        address: user.address || ''
      });
      setNewEmail(user.email || '');
    }
  }, [user]);

      useEffect(() => {
     console.log('Dashboard mounted - Auth state:', {
       user,
       hasToken: !!Cookies.get('token'),
       isAuthenticated: !!user?.id,
       loading
     });
   }, [user, loading]);

   // Handle outside click to close settings dropdown
   useEffect(() => {
     const handleClickOutside = (event) => {
       if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
         setIsSettingsDropdownOpen(false);
       }
     };

     if (isSettingsDropdownOpen) {
       document.addEventListener('mousedown', handleClickOutside);
     }

     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
     };
   }, [isSettingsDropdownOpen]);

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: 'Luxury Banquet Hall',
      location: 'Downtown',
      price: '$2,000',
      rating: 4.8,
      image: '/images/banquet-hall.jpg'
    },
    {
      id: 2,
      title: 'Beachfront Venue',
      location: 'Coastal Area',
      price: '$3,500',
      rating: 4.9,
      image: '/images/beach-venue.jpg'
    }
  ]);

  const handleEmailUpdate = async () => {
  if (!newEmail || !newEmail.includes('@')) {
    toast.error('Please enter a valid email address');
    return;
  }

  try {
    const response = await api.put('/users/update-email', { email: newEmail });
    toast.success('Email updated successfully');
    // Update the form data with the new email
    setFormData2(prev => ({ ...prev, email: newEmail }));
    setIsEditingEmail(false);
  } catch (error) {
    console.error('Error updating email:', error);
    toast.error(error.response?.data?.message || 'Failed to update email');
  }
};

  const removeFromWishlist = async (id) => {
    setShowSavedAnimation(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    setShowSavedAnimation(false);
  };

  if (loading || !user) {
    return (
      <Layout title="Loading...">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <AnimatePresence>
        {showSavedAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Removed from wishlist!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user.fullName || 'User'}!
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Here's what's happening with your events and saved venues.
            </p>
          </div>
          <div className="mt-4 flex items-center md:mt-0 md:ml-4 space-x-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <div className="relative" ref={settingsDropdownRef}>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
              >
                <FiSettings className="-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                Settings
              </button>

              {/* Settings Dropdown */}
              {isSettingsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSettingsDropdownOpen(false);
                        router.push('/notifications');
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors"
                    >
                      <FiBell className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      Notifications
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSettingsDropdownOpen(false);
                        setIsChangePasswordModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors"
                    >
                      <FiLock className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      Change Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSettingsDropdownOpen(false);
                        router.push('/about');
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors"
                    >
                      <FiInfo className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      About
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => router.push('/events/new')}
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" />
              New Event
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wishlist and Upcoming Events */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wishlist Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Your Wishlist
                </h3>
              </div>
              <div className="p-6">
                {wishlistItems.length > 0 ? (
                  <div className="space-y-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                            <img
                              className="h-full w-full object-cover"
                              src={item.image}
                              alt={item.title}
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.location}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-yellow-400">★</span>
                              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                                {item.rating}
                              </span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <span className="sr-only">Remove</span>
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      No saved venues
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get started by adding venues to your wishlist.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => router.push('/venues')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <svg
                          className="-ml-1 mr-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Browse Venues
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Upcoming Events Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
              }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Upcoming Events
                </h3>
              </div>
              <div className="p-6">
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <CalendarIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {event.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {event.date} • {event.time}
                            </p>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                              {event.location}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      No upcoming events
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get started by creating a new event.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => router.push('/events/new')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        New Event
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quick Actions and Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
              }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Quick Actions
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileModalOpen(true);
                      setIsEditingProfile(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          View Profile
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Update your personal information
                        </p>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/bookings')}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <TicketIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          My Bookings
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          View and manage your bookings
                        </p>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/favorites')}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                        <HeartIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Favorites
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          View your saved venues
                        </p>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
              }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {[
                      {
                        id: 1,
                        type: 'event',
                        title: 'Team Meeting',
                        description: 'New event scheduled',
                        date: '1d ago',
                        icon: CalendarIcon,
                        iconColor: 'text-blue-500'
                      },
                      {
                        id: 2,
                        type: 'booking',
                        title: 'Luxury Banquet Hall',
                        description: 'Booking confirmed',
                        date: '2d ago',
                        icon: CheckCircleIcon,
                        iconColor: 'text-green-500'
                      },
                      {
                        id: 3,
                        type: 'payment',
                        title: 'Payment Received',
                        description: 'Your payment has been processed',
                        date: '3d ago',
                        icon: CurrencyDollarIcon,
                        iconColor: 'text-indigo-500'
                      }
                    ].map((activity, activityIdx) => (
                      <li key={activity.id} className="relative pb-8">
                        {activityIdx !== 2 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full ${activity.iconColor} bg-opacity-10 flex items-center justify-center`}
                            >
                              <activity.icon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {activity.title}
                                </span>{' '}
                                {activity.description}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                              <time dateTime={activity.date}>
                                {activity.date}
                              </time>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    View all activity
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
  isOpen={isProfileModalOpen}
  onClose={() => setIsProfileModalOpen(false)}
  user={user}
  isEditing={isEditingProfile}
  onEditToggle={setIsEditingProfile}
  // Add these new props
  isEditingEmail={isEditingEmail}
  setIsEditingEmail={setIsEditingEmail}
  newEmail={newEmail}
  setNewEmail={setNewEmail}
  onEmailUpdate={handleEmailUpdate}
  formData={formData}  // Add this to access formData in the modal
  setFormData={setFormData}  // Add this to update formData
 />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </Layout>
  );
}

// Icons (add these at the bottom of the file or import them from a separate file)
function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CurrencyDollarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function TicketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 5v2m0 4v2m0 4v2m0 4v2m-12-18h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
      />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}
