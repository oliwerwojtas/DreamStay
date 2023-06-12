import { User } from "firebase/auth";
import { ReactNode } from "react";
export interface AuthState {
  user: User | null;
  //   authIsReady: boolean;
}

export interface AuthAction {
  type: string;
  payload: User | null;
}

export interface AuthContextProps extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}
export interface AuthContextProviderProps {
  children: ReactNode;
}
