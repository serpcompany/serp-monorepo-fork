import type { Comment } from '@serp/types/types';

export const useServiceProviderUpvotesAndComments = async (id: number) => {
  return useFetchWithCache<{ comments: Comment[]; upvotes: string[] }>(
    `/comments/${id}?module=service-providers&includeUpvotes=true`
  );
};
