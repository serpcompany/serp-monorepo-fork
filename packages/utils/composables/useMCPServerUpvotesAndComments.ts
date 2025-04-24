import type { Comment } from '@serp/types/types';

export const useMCPServerUpvotesAndComments = async (id: number) => {
  return useFetchWithCache<{ comments: Comment[]; upvotes: string[] }>(
    `/comments/${id}?module=mcp-servers&includeUpvotes=true`
  );
};
