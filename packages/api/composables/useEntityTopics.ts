import type { Topic } from '@serp/types/types';

export const useEntityTopics = async (module = '') => {
  return await useFetchWithCache<Topic[]>(`/topics?module=${module}`);
};
