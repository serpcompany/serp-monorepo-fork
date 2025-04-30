import type { ServiceProviders } from '@serp/types/types';

export const useServiceProviders = async (
  page = 1,
  limit = 50,
  categorySlug = '',
  topicSlug = ''
) => {
  return useFetchWithCache<ServiceProviders>(
    `/service-providers?page=${page}&limit=${limit}&categorySlug=${categorySlug}&topicSlug=${topicSlug}`
  );
};
