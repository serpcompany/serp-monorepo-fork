import type { ServiceProvider } from '@serp/types/types';

export const useServiceProvider = async (slug: string) => {
  return useFetchWithCache<ServiceProvider>(
    `/entity/${slug}&module=service_provider`
  );
};
