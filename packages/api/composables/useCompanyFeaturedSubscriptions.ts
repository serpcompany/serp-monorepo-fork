export const useCompanyFeaturedSubscriptions = async (activeOnly = true) => {
  return useFetchWithCache(
    `/entity/featured-subscriptions?activeOnly=${activeOnly}&module=company`
  );
};
