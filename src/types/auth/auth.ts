export interface SignupData {
  email: string;
  password: string;
  displayName: string;
}
export interface LoginData {
  password: string;
  email: string;
}
export interface AuthStatus {
  loggedIn: boolean;
  googleLoggedIn: boolean;
  githubLoggedIn: boolean;
  emailLoggedIn: boolean;
  checkingStatus: boolean;
  initialStatusChecked: boolean;
}
export interface AuthState {
  loggedIn: boolean;
  googleLoggedIn: boolean;
  githubLoggedIn: boolean;
  emailLoggedIn: boolean;
  checkingStatus: boolean;
}
export interface RootState {
  auth: AuthState;
  favorites: FavoritesState;
}
export interface FavoritesState {
  favoritesItems: string[];
}
