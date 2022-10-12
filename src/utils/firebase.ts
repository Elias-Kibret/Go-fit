import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutUser,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { setExercises } from 'store/exercisesSlice';
import { Exercise } from './type';

import store from '../store';
import { clearUser, setAuthError, setUser } from '../store/userSlice';

type User = {
  email: string;
  password: string;
};

type NewUser = User & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  displayName: string;
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      if (!result) return;
      const plainUserEntries = Object.entries(result.user).filter(([, value]) => typeof value !== 'object');
      const plainUser = Object.fromEntries(plainUserEntries);

      localStorage.setItem('token', await result.user.getIdToken());
      localStorage.setItem('user', JSON.stringify(plainUser));

      store.dispatch(setUser(result.user));
    })
    .catch((error) => {
      console.log(error);
    });
};
const dispatchError = (err: any) => {
  return store.dispatch(setAuthError(err));
};

const updateUser = async (user: FirebaseUser) => {
  if (user) {
    const docRef = doc(db, 'users', user.email as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return store.dispatch(setUser(user));
    }
  }

  dispatchError('User data not found!');
};

const signUp = async ({ firstName, lastName, email, password, isAdmin = false, displayName = 'sisay' }: NewUser) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser as any, { displayName: displayName }).catch((err) => console.log(err));
    await setDoc(doc(db, 'users', email), {
      firstName,
      lastName,
      email,
      isAdmin,
    });
  } catch ({ message }) {
    dispatchError(message);
  }
};

const signIn = async ({ email, password }: User) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch ({ message }) {
    dispatchError(message);
  }
};

const signOut = async () => {
  try {
    await signOutUser(auth);
    localStorage.removeItem('token');
    store.dispatch(clearUser());
  } catch ({ message }) {
    dispatchError(message);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await updateUser(user);
    store.dispatch(setUser(user));
  }
});

export const exerciseStore = () => {
  const fetch = () => {
    return getDocs(collection(db, 'exercises')).then(({ docs }) => {
      const exercises = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log({ docs, exercises });
      return store.dispatch(setExercises(exercises));
    });
  };
  const createOrUpdate = ({ id = '', ...exercise }: Exercise) => {
    console.log({ exercise }, 'createOrUpdate.fired');
    if (!id?.length) {
      return addDoc(collection(db, 'exercises'), exercise).then(() => fetch());
    }
    const exerciseDoc = doc(db, 'exercises', id);
    updateDoc(exerciseDoc, exercise).then(() => fetch());
  };

  const remove = ({ id = '' }: Exercise) => {
    deleteDoc(doc(db, 'exercises', `/${id}`)).then(() => {
      fetch();
    });
  };

  return { fetch, createOrUpdate, remove };
};

export { db, auth, signUp, signIn, signOut };
