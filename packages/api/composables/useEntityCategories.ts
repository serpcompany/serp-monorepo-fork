import type { Category } from '@serp/types/types';

export const useEntityCategories = async (module = '') => {
  return await useFetchWithCache<Category[]>(`/categories?module=${module}`);
};
