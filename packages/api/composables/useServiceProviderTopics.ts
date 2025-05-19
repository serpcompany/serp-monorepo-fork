import type { Topic } from '@serp/types/types';

export const useServiceProviderTopics = async () => {
  return await useFetchWithCache<Topic[]>(`/topics&module=service_provider`);
};
