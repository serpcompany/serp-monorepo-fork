import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Single from '../../../../components/SPage/Album/Single.vue';
import ComponentRender from '../../../componentRender';

let useAuth_: boolean = true;
const scenarios: [
  string,
  { album: Record<string, unknown>; upvotes: string[]; useAuth: boolean }
][] = [
  [
    'with auth enabled and full album data',
    {
      album: {
        name: 'Test Album',
        slug: 'test-album',
        overview: 'This is a test album overview.',
        recordings: [
          { slug: 'song-one', name: 'Song One', position: 1, has_lyrics: true },
          { slug: 'song-two', name: 'Song Two', position: 2, has_lyrics: false }
        ],
        coverArt: { '500': '/test-cover.jpg' },
        date: '2020-01-01',
        genres: ['Rock', 'Pop'],
        tags: ['Indie', 'Live'],
        id: 'album123',
        seoTitle: 'Test Album SEO Title',
        seoDescription: 'Test Album SEO Description'
      },
      upvotes: ['user@example.com'],
      useAuth: true
    }
  ],
  [
    'with auth disabled and minimal album data',
    {
      album: {
        name: 'Minimal Album',
        slug: 'minimal-album',
        overview: 'Minimal album overview.',
        recordings: [],
        coverArt: {},
        date: null,
        genres: [],
        tags: [],
        id: 'album456',
        seoTitle: '',
        seoDescription: ''
      },
      upvotes: [],
      useAuth: false
    }
  ],
  [
    'with auth enabled and no recordings',
    {
      album: {
        name: 'No Songs Album',
        slug: 'no-songs-album',
        overview: 'Overview of album with no songs.',
        recordings: [],
        coverArt: { '500': '/no-songs-cover.jpg' },
        date: '2021-06-15',
        genres: ['Jazz'],
        tags: ['Smooth'],
        id: 'album789',
        seoTitle: 'No Songs SEO',
        seoDescription: 'No Songs Description'
      },
      upvotes: ['anotheruser@example.com'],
      useAuth: true
    }
  ]
];

describe('SPageAlbumSingle Snapshot', () => {
  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { album, upvotes, useAuth }) => {
      globalThis.useAlbum = () => Promise.resolve(album);
      globalThis.useFetchWithCache = () => Promise.resolve({ upvotes });
      useAuth_ = useAuth;
      mockNuxtImport('useRuntimeConfig', () => () => ({
        app: { baseURL: '/' },
        public: { useAuth_ }
      }));
      mockNuxtImport('useSeoMeta', () => () => {});

      const html = await ComponentRender(
        `SPageAlbumSingle ${desc}`,
        {},
        Single
      );
      expect(html).toMatchSnapshot();
    }
  );
});
