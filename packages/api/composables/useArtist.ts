import type { Artist } from '@serp/types/types';

export const useArtist = async (slug: string) => {
  return await useFetchWithCache<Artist>(
    `/entity/${slug}?module=music_artists`
  );
};
