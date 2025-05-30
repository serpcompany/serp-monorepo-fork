import type { Companies, Entities } from '@serp/types/types';

export const useCompanies = async (page = 1, limit = 50, categorySlug = '') => {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&categorySlug=${categorySlug}&module=company`
  );
  if (!data) {
    return data;
  }
  const { entities, ...rest } = data;
  return {
    ...rest,
    companies: entities
  } as Companies;
};
