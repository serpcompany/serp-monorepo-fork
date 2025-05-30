import type { Comment } from '@serp/types/types';

export const useEntityComments = async (id: number, module = '') => {
  return useFetchWithCache<Comment[]>(`/comments/${id}?module=${module}`);
};
