import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from '@react-native-firebase/firestore';

const generateMatchCode = (length = 6): string => {
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return code;
};

const isMatchCodeUnique = async (code: string): Promise<boolean> => {
  const db = getFirestore();
  const usersRef = collection(db, 'Users');
  const q = query(usersRef, where('matchCode', '==', code));
  const snapshot = await getDocs(q);
  return snapshot.empty;
};

export const generateUniqueMatchCode = async (): Promise<string> => {
  let code = '';
  let isUnique = false;
  while (!isUnique) {
    code = generateMatchCode();
    isUnique = await isMatchCodeUnique(code);
  }
  return code;
};
