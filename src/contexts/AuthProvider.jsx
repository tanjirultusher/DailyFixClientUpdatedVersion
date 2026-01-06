import React, { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { userService } from '../services/userService';
import toast from 'react-hot-toast';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Create user with email and password
  const createUser = async (email, password, additionalData = {}) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase profile
      if (additionalData.name) {
        await updateProfile(result.user, {
          displayName: additionalData.name,
          photoURL: additionalData.image || null
        });
      }

      // Create user profile in database
      const profileData = {
        uid: result.user.uid,
        email: result.user.email,
        name: additionalData.name || result.user.displayName || '',
        image: additionalData.image || result.user.photoURL || '',
        role: additionalData.role || 'user',
        createdAt: new Date().toISOString(),
        isActive: true
      };

      await userService.createUserProfile(profileData);
      setUserProfile(profileData);
      
      toast.success('Account created successfully!');
      return result;
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if user profile exists, create if not
      try {
        const profile = await userService.getUserProfile(result.user.uid);
        setUserProfile(profile);
      } catch (error) {
        // Create profile if doesn't exist
        const profileData = {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || '',
          image: result.user.photoURL || '',
          role: 'user',
          createdAt: new Date().toISOString(),
          isActive: true
        };
        
        await userService.createUserProfile(profileData);
        setUserProfile(profileData);
      }
      
      toast.success('Signed in successfully!');
      return result;
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signInUser = async (email, password) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Fetch user profile
      const profile = await userService.getUserProfile(result.user.uid);
      setUserProfile(profile);
      
      toast.success('Signed in successfully!');
      return result;
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out user
  const signOutUser = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUserProfile(null);
      toast.success('Signed out successfully!');
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // Update Firebase profile if name or image changed
      if (updates.name || updates.image) {
        await updateProfile(user, {
          displayName: updates.name || user.displayName,
          photoURL: updates.image || user.photoURL
        });
      }

      // Update database profile
      const updatedProfile = await userService.updateUserProfile(user.uid, updates);
      setUserProfile(updatedProfile);
      
      toast.success('Profile updated successfully!');
      return updatedProfile;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return userProfile?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(userProfile?.role);
  };

  // Check if user is admin
  const isAdmin = () => {
    return userProfile?.role === 'admin';
  };

  // Check if user is provider
  const isProvider = () => {
    return userProfile?.role === 'provider';
  };

  // Check if user is regular user
  const isUser = () => {
    return userProfile?.role === 'user';
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);
        
        if (currentUser) {
          // Fetch user profile from database
          try {
            const profile = await userService.getUserProfile(currentUser.uid);
            setUserProfile(profile);
          } catch (error) {
            console.error('Error fetching user profile:', error);
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setAuthError(error.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    userProfile,
    loading,
    authError,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    updateUserProfile,
    hasRole,
    hasAnyRole,
    isAdmin,
    isProvider,
    isUser,
    setAuthError
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;