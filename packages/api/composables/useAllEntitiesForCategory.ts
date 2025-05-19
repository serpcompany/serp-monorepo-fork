export const useAllEntitiesForCategory = async (categorySlug = '') => {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(`/entities/all-for-category`);
  }
  return useFetchWithCache(
    `/entities/all-for-category?categorySlug=${categorySlug}`
  );
};
