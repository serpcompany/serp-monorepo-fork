import type { Entity } from '@serp/types/types';

export const useEntity = async (slug: string, module = '') => {
  return useFetchWithCache<Entity>(`/entity/${slug}?module=${module}`);
};
