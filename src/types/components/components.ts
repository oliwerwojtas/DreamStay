import { LatLngTuple } from "leaflet";
import { ChangeEvent, ReactNode } from "react";
import { MouseEvent } from "react";
export interface LazyImageProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}
export interface MapContainerWrapperProps {
  position: LatLngTuple;
  details: any;
}
export interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}
export interface PaginationProps {
  apartamentsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}
export interface PrivateRouteProps {
  children: ReactNode;
}
export interface FavoriteButtonProps {
  isFavorite: boolean;
  addToFavoritesHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}
export interface FavoritesModalProps {
  onClose: () => void;
}
export interface SearchBarProps {
  search: string;
  handleSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onSortOptionClick: (sortKey: string) => void;
  sortKey: string;
}
