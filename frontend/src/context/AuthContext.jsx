import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
  } from "firebase/auth";
  
  import { createContext, useContext, useEffect, useState } from "react";
  import { auth } from "../firebase/firebase.config";
  
  const AuthContext = createContext();
  
  export const useAuth = () => useContext(AuthContext);
  
  const googleProvider = new GoogleAuthProvider();
  
  export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Register a user
    const registerUser = async (email, password) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    };
  
    // Login user
    const loginUser = async (email, password) => {
      return await signInWithEmailAndPassword(auth, email, password);
    };
  
    // Sign in with Google
    const signInWithGoogle = async () => {
      return await signInWithPopup(auth, googleProvider);
    };
  
    // Logout user
    const logout = () => {
      localStorage.removeItem("token");
      return signOut(auth);
    };
  
    // Manage auth state
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
  
        // Optional: Save user info if needed
        if (user) {
          const { email, displayName, photoURL } = user;
          const userData = {
            email,
            username: displayName,
            photo: photoURL
          };
          // You could store this in localStorage, Redux, etc.
          // localStorage.setItem('user', JSON.stringify(userData));
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const value = {
      currentUser,
      loading,
      registerUser,
      loginUser,
      signInWithGoogle,
      logout
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };
  