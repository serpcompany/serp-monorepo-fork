import type { Reviews } from '@serp/types/types';

export const useServiceProviderReviews = async (
  id: number,
  page = 1,
  limit = 25
) => {
  return useFetchWithCache<{ reviews: Reviews }>(
    `/reviews/${id}?page=${page}&limit=${limit}&module=service_provider`
  );
};
