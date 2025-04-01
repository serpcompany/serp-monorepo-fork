import { describe, expect, it } from 'vitest';
import MusicRecording from '../../../components/Schemas/MusicRecording.vue';
import ComponentRender from '../../componentRender';

(globalThis as unknown).useSchemaOrg = () => ({
  // no-op for schema injection during tests
});

describe('SchemasMusicRecording Snapshot', () => {
  it.each([
    [
      'with minimal required props',
      {
        props: {
          name: 'Song A',
          byArtist: 'Artist A'
        }
      }
    ],
    [
      'with full props',
      {
        props: {
          name: 'Song B',
          byArtist: 'Artist B',
          duration: 'PT3M45S',
          inAlbum: 'Album B',
          isrcCode: 'US-S1Z-99-12345',
          about: 'A hit song',
          copyrightYear: 2020,
          countryOfOrigin: 'USA',
          genre: 'Pop',
          keywords: 'pop, hit, summer',
          publisher: 'Music Corp',
          video: 'https://example.com/video.mp4',
          identifier: 'song-b',
          sameAs: [
            'https://example.com/song-b',
            'https://music.example.com/song-b'
          ]
        }
      }
    ]
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `MusicRecording ${desc}`,
        options,
        MusicRecording
      );
      expect(html).toMatchSnapshot();
    }
  );
});
