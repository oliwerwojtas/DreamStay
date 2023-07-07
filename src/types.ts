import { User, UserCredential } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
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
export interface FormDataCreate {
  id: string;
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  regularPrice: number;
  images: File[];
  imgUrls: string[];
  userRef: string | undefined;
  smoke: boolean;
  breakfast: boolean;
  meters: number;
}
export interface FormDataCreate2 {
  id: string;
  data: {
    breakfast: boolean;
    smoke: boolean;
    meters: number;
    type: string;
    name: string;
    bedrooms: number;
    bathrooms: number;
    parking: boolean;
    furnished: boolean;
    address: string;
    description: string;
    regularPrice: number;
    images: FileList;
    imgUrls: string[];
    userRef: string | undefined;
    timestamp: Timestamp;
  };
}
