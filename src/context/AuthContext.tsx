import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from '@react-native-firebase/firestore';

import { mapAuthErrorToMessage } from '@utils';
import { generateUniqueMatchCode } from '@utils/generateMatchCode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoading } from './LoadingContext';
import { showToast } from '@utils/toastConfig';
import { t } from 'i18next';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  error: string | null;
  registerCompleted: boolean;
  setRegisterCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    nameSurname: string,
  ) => Promise<FirebaseAuthTypes.User | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const { showLoading, hideLoading } = useLoading();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registerCompleted, setRegisterCompleted] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const loadRegisterCompleted = async () => {
      try {
        const value = await AsyncStorage.getItem('register_completed');
        setRegisterCompleted(value === 'true');
      } catch (error) {
        console.log('LOAD_REGISTER_COMPLETED_ERROR', error);
      }
    };
    loadRegisterCompleted();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      'register_completed',
      registerCompleted.toString(),
    ).catch(error => {
      console.log('SAVE_REGISTER_COMPLETED_ERROR', error);
    });
  }, [registerCompleted]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const login = async (email: string, password: string) => {
    showLoading();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setRegisterCompleted(true);
    } catch (err: any) {
      console.log(err.code);
      showToast({
        type: 'error',
        text1: t('text.fail'),
        text2: t(mapAuthErrorToMessage(err.code || '')),
        visibilityTime: 1500,
      });
    } finally {
      hideLoading();
    }
  };

  const register = async (
    email: string,
    password: string,
    nameSurname: string,
  ) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const currentUser = userCredential.user;
      let matchCode = '';
      try {
        matchCode = await generateUniqueMatchCode();
      } catch (error: any) {
        console.log('Match code generate error', error);
      }

      await updateProfile(currentUser, {
        displayName: nameSurname,
      });

      await currentUser.reload();

      await setDoc(doc(db, 'Users', currentUser.uid), {
        uid: currentUser.uid,
        email,
        nameSurname,
        createdAt: serverTimestamp,
        matchCode,
      });
      return currentUser;
    } catch (err: any) {
      setError(mapAuthErrorToMessage(err.code || ''));
      return null;
    }
  };

  const logout = async () => {
    showLoading();
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      setRegisterCompleted(false);
    } catch (err: any) {
      setError(mapAuthErrorToMessage(err.code || ''));
    } finally {
      hideLoading();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        registerCompleted,
        setRegisterCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
