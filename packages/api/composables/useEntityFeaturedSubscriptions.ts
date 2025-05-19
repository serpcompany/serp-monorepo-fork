export const useEntityFeaturedSubscriptions = async (
  activeOnly = true,
  module = ''
) => {
  return useFetchWithCache(
    `/entity/featured-subscriptions?activeOnly=${activeOnly}&module=${module}`
  );
};
