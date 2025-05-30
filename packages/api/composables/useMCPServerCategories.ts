import type { Category } from '@serp/types/types';

export const useMCPServerCategories = async () => {
  return await useFetchWithCache<Category[]>(`/categories?module=mcp_server`);
};
