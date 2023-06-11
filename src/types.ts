import { User, UserCredential } from "firebase/auth";

export interface SignupError {
  message: string;
}

export interface SignupData {
  email: string;
  password: string;
  displayName: string;
}

export interface SignupResult {
  user: User | UserCredential;
}

export interface FormData {
  email: string;
  password: string;
  name: string;
}
export interface LoginData {
  password: string;
  email: string;
}
