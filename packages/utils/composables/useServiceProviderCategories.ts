import type { Category } from '@serp/types/types';

export const useServiceProviderCategories = async () => {
  return await useFetchWithCache<Category[]>(`/service-provider-categories`);
};
