import type { Pagination } from './Pagination';

export type Review = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  rating: number;
  content: string;
  dateOfExperience: string;
  user: {
    id: number;
    name: string;
    image?: string;
  };
};

export type Reviews = {
  reviews: Review[];
  pagination: Pagination;
};
