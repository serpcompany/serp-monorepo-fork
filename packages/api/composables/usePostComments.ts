import type { Comment } from '@serp/types/types';

export const usePostComments = async (id: number) => {
  return useFetchWithCache<Comment[]>(`/comments/${id}?module=post`);
};
