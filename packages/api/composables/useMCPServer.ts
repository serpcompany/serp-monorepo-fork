import type { MCPServer } from '@serp/types/types';

export const useMCPServer = async (slug: string) => {
  return useFetchWithCache<MCPServer>(`/entity/${slug}?module=mcp_server`);
};
