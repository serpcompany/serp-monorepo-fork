import type { Post } from '@serp/types/types';

export const usePost = async (slug: string, module = '') => {
  return useFetchWithCache<Post>(
    `/entity/${encodeURIComponent(slug)}?module=post&filters=module:${module}`
  );
};
