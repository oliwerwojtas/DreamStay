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
export interface FormDataCreate {
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  images: FileList;
  imgUrls: string[];
  user: string | undefined;
}
export interface FormDataCreate2 {
  id: string;
  data: {
    type: string;
    name: string;
    bedrooms: number;
    bathrooms: number;
    parking: boolean;
    furnished: boolean;
    address: string;
    description: string;
    offer: boolean;
    regularPrice: number;
    discountedPrice: number;
    images: FileList;
    imgUrls: string[];
    user: string | undefined;
    timestamp: any;
  };
}
