import type { Comment } from '@serp/types/types';

export const useServiceProviderComments = async (id: number) => {
  return useFetchWithCache<{ comments: Comment[] }>(
    `/comments/${id}?module=service_provider`
  );
};
