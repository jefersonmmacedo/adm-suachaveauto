import { initializeApp} from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/firestore';

let firebaseConfig = {
  apiKey: "AIzaSyCU_GSI78k95uUZsDLJ2QtxkiVZawUd0l0",
  authDomain: "suachave-4bcbe.firebaseapp.com",
  projectId: "suachave-4bcbe",
  storageBucket: "suachave-4bcbe.appspot.com",
  messagingSenderId: "786106222235",
  appId: "1:786106222235:web:bfb5b8f9bc2e86e1de283e",
  measurementId: "G-CTH8V58EJC"
  };
  
// Use this to initialize the firebase App
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);