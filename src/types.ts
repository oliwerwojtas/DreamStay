import { ChangeEvent, ReactNode } from "react";
import { User, UserCredential } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { MouseEvent } from "react";
import { LatLngTuple } from "leaflet";
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
  password?: string;
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

export interface AuthStatus {
  loggedIn: boolean;
  googleLoggedIn: boolean;
  githubLoggedIn: boolean;
  checkingStatus: boolean;
  initialStatusChecked: boolean;
}

export interface ErrorType {
  message: string;
}
export interface PaginationProps {
  apartamentsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}
export interface PrivateRouteProps {
  children: ReactNode;
}
export interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}
export interface FavoriteButtonProps {
  isFavorite: boolean;
  addToFavoritesHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}
export interface LazyImageProps {
  imageUrl: string;

  height: string;
}
export interface MapContainerWrapperProps {
  position: LatLngTuple;
  details: any;
}
export interface SearchBarProps {
  search: string;
  handleSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onSortOptionClick: (sortKey: string) => void;
  sortKey: string;
}

export interface AuthState {
  loggedIn: boolean;
  googleLoggedIn: boolean;
  githubLoggedIn: boolean;
  checkingStatus: boolean;
}

export interface FavoritesState {
  favoritesItems: string[];
}
export interface RootState {
  auth: AuthState;
  favorites: FavoritesState;
}
