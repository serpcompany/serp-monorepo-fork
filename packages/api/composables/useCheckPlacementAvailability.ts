export const useCheckPlacementAvailability = async (
  placement,
  id,
  categorySlug = ''
) => {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(
      `/entity/reserve-featured-spot?placement=${placement}&id=${id}`
    );
  }
  return useFetchWithCache(
    `/entity/reserve-featured-spot?placement=${placement}&id=${id}&categorySlug=${categorySlug}`
  );
};
