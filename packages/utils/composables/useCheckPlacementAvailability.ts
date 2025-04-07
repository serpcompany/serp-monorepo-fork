export const useCheckPlacementAvailability = async (
  placement,
  domain,
  categorySlug = ''
) => {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(
      `/company/reserve-featured-spot?placement=${placement}&domain=${domain}`
    );
  }
  return useFetchWithCache(
    `/company/reserve-featured-spot?placement=${placement}&domain=${domain}&categorySlug=${categorySlug}`
  );
};
