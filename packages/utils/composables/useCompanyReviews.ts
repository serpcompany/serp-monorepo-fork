import type { CompanyReviews } from '@serp/types/types';

export const useCompanyReviews = async (id: number, page = 1, limit = 25) => {
  return useFetchWithCache<{ reviews: CompanyReviews }>(
    `/company/reviews/${id}?page=${page}&limit=${limit}`
  );
};
