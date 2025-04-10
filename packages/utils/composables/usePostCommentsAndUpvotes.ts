import type { Comment } from '@serp/types/types';

export const usePostUpvotesAndComments = async (id: number) => {
  return useFetchWithCache<{ comments: Comment[]; upvotes: string[] }>(
    `/comments/${id}?module=posts&includeUpvotes=true`
  );
};
