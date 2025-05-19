import type { Company, ServiceProvider } from '@serp/types/types';

export const useCompany = async (slug: string) => {
  return useFetchWithCache<Company | ServiceProvider>(
    `/entity/${slug}?module=company,service_provider`
  );
};
