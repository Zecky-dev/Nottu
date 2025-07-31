import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from '@react-native-firebase/firestore';
import { mapAuthErrorToMessage } from '@utils';
import { generateUniqueMatchCode } from '@utils/generateMatchCode';
import { useLoading } from './LoadingContext';
import { showToast } from '@utils/toastConfig';
import { t } from 'i18next';
import { sendResetPasswordEmail } from '@api/auth';
import { User } from '@types';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  userInfo: User | null;
  fetchUserInfo: (uid?: string) => Promise<void>;
  updateUserInfo: (newData: Partial<User>, userId: string) => Promise<void>;
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
  resetPassword: (
    email: string,
    language: 'tr' | 'en',
  ) => Promise<{ success: boolean; message: string; email: string } | null>;
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
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { showLoading, hideLoading } = useLoading();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registerCompleted, setRegisterCompleted] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  // registerCompleted'ı AsyncStorage'dan yükle
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
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        await fetchUserInfo(firebaseUser.uid);
      } else {
        setUserInfo(null);
      }
    });
    return unsubscribe;
  }, [auth]);

  const fetchUserInfo = async (uidParam?: string) => {
    try {
      showLoading();
      const uid = uidParam || user?.uid;
      if (!uid) return;

      const usersRef = collection(db, 'Users');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data() as User;
        setUserInfo(data);
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      setUserInfo(null);
    } finally {
      hideLoading();
    }
  };

  const updateUserInfo = async (newData: Partial<User>, userId: string) => {
    try {
      showLoading();
      const userDocRef = doc(db, 'Users', userId);
      await setDoc(userDocRef, newData, { merge: true });
      await fetchUserInfo(userId);
    } catch (error) {
      console.error('updateUserInfo error:', error);
      throw error;
    } finally {
      hideLoading();
    }
  };

  const login = async (email: string, password: string) => {
    showLoading();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setRegisterCompleted(true);
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: t('text.fail'),
        text2: t(mapAuthErrorToMessage(err.code)),
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
        createdAt: serverTimestamp(),
        matchCode,
      });

      // Kaydolan kullanıcı bilgilerini de çek
      await fetchUserInfo(currentUser.uid);

      return currentUser;
    } catch (err: any) {
      setError(mapAuthErrorToMessage(err.code));
      return null;
    }
  };

  const logout = async () => {
    showLoading();
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      setUserInfo(null);
      setRegisterCompleted(false);
    } catch (err: any) {
      setError(mapAuthErrorToMessage(err.code));
    } finally {
      hideLoading();
    }
  };

  const resetPassword = async (
    email: string,
    language: 'tr' | 'en',
  ): Promise<{ success: boolean; message: string; email: string } | null> => {
    showLoading();
    setError(null);
    try {
      const res = await sendResetPasswordEmail(email, language);
      showToast({
        type: 'success',
        text1: t('text.success'),
        text2: t('firebase.auth.success.reset_password_sent'),
        visibilityTime: 2500,
      });
      return res;
    } catch (err: any) {
      showToast({
        type: 'danger',
        text1: t('text.fail'),
        text2: t('firebase.auth.errors.reset_password_failed'),
        visibilityTime: 2500,
      });
      return null;
    } finally {
      hideLoading();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        fetchUserInfo,
        loading,
        error,
        login,
        register,
        logout,
        registerCompleted,
        setRegisterCompleted,
        resetPassword,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
