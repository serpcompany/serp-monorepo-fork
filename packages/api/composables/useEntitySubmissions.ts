export const useEntitySubmissions = async (id = '') => {
  return useFetchWithCache(`/entity/submit?id=${id}`);
};
