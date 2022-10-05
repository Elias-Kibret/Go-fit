import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
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
import { Exercise } from '@utils/type';
import { setExercises } from 'store/exercisesSlice';

import store from '../store';
import { clearUser, setAuthError, setUser } from '../store/userSlice';

type User = {
  email: string;
  password: string;
};

type NewUser = User & {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
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

const dispatchError = (err: any) => {
  return store.dispatch(setAuthError(err));
};

const updateUser = async (user: FirebaseUser) => {
  if (user) {
    const docRef = doc(db, 'users', user.email as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userDoc = docSnap.data();
      return store.dispatch(setUser({ ...userDoc, isAuthenticated: true }));
    }
  }

  dispatchError('User data not found!');
};

const signUp = async ({ firstName, lastName, email, password, isAdmin = false }: NewUser) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
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
  } catch ({ message }) {
    dispatchError(message);
  }
};

onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
  if (user) {
    await updateUser(user);
  } else {
    store.dispatch(clearUser());
  }
});

export const exerciseStore = () => {
  const fetch = () => {
    return getDocs(collection(db, 'exercises')).then(({ docs }) => {
      const exercises = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log({ docs, exercises });
      return store.dispatch(setExercises(exercises));
      // return exercises.docs as any as Exercise[];
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
      // const payload = store.getState().exercises.filter((ex) => ex.id !== exercise.id);
      // store.dispatch(setExercises(payload));
      fetch();
    });
  };

  return { fetch, createOrUpdate, remove };
};

export { db, auth, signUp, signIn, signOut };
