import type { MCPServers } from '@serp/types/types';

export const useMCPServers = async (
  page = 1,
  limit = 50,
  tag = '',
  topic = '',
  owner = '',
  categorySlug = ''
) => {
  return useFetchWithCache<MCPServers>(
    `/mcp/servers?page=${page}&limit=${limit}&tag=${tag}&topic=${topic}&owner=${owner}&categorySlug=${categorySlug}`
  );
};
