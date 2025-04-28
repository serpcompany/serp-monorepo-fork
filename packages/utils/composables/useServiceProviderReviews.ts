import type { CompanyReviews } from '@serp/types/types';

export const useServiceProviderReviews = async (
  id: number,
  page = 1,
  limit = 25
) => {
  return useFetchWithCache<{ reviews: CompanyReviews }>(
    `/service-provider/reviews/${id}?page=${page}&limit=${limit}`
  );
};
