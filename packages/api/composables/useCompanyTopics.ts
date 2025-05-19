import type { Topic } from '@serp/types/types';

export const useCompanyTopics = async () => {
  return await useFetchWithCache<Topic[]>(`/topics?module=company`);
};
