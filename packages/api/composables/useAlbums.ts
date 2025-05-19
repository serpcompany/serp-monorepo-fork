import type { ReleaseGroup } from '@serp/types/types';

export const useAlbums = async (page = 1, limit = 50) => {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&module=music_album`
  );
  const { entities, ...rest } = data;
  return {
    ...rest,
    albums: entities as ReleaseGroup[]
  };
};
