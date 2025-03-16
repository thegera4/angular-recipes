import { initializeApp } from 'firebase/app';
import {environment} from "../environments/environment.dev";

const app = initializeApp(environment.firebaseConfig);

export default app;
