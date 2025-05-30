import type { Category } from '@serp/types/types';

export const useCompanyCategories = async () => {
  return await useFetchWithCache<Category[]>(`/categories?module=company`);
};
