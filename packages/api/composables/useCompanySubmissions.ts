export const useCompanySubmissions = async (id = '') => {
  return useFetchWithCache(`/entity/submit?id=${id}&module=company`);
};
