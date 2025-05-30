import type { Comment } from '@serp/types/types';

export const useMCPServerComments = async (id: number) => {
  return useFetchWithCache<{ comments: Comment[] }>(
    `/comments/${id}?module=mcp_server`
  );
};
