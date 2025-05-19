import type { ReleaseGroup } from '@serp/types/types';

export const useAlbum = async (slug: string) => {
  return await useFetchWithCache<ReleaseGroup>(
    `/entity/${slug}&module=music_album`
  );
};
