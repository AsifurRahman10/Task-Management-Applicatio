import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/Firebase.init";
import axios from "axios";

const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, useLoading] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  // google login
  const handleGoogleLogin = () => {
    useLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   email login
  const loginWithEmail = (email, password) => {
    useLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   register with email
  const emailRegistration = (email, password) => {
    useLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const updateProfileNamePhoto = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // signout
  const handleSignout = () => {
    signOut(auth);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
      } else {
        setUser(null);
      }

      useLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    handleGoogleLogin,
    loginWithEmail,
    emailRegistration,
    user,
    loading,
    updateProfileNamePhoto,
    setUser,
    handleSignout,
    emailValue,
    useLoading,
    setUserProfile,
    userProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
