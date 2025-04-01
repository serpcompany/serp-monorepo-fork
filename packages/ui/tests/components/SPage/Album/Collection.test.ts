import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import SPageAlbumCollection from '../../../../components/SPage/Album/Collection.vue';
import ComponentRender from '../../../componentRender';

let fetchData_: unknown = {
  albums: [],
  pagination: { totalItems: 0 }
};

describe('SPageAlbumCollection Snapshot', () => {
  it.each([
    [
      'default scenario with albums',
      {
        fetchData: {
          albums: [
            { id: 1, title: 'Album 1' },
            { id: 2, title: 'Album 2' }
          ],
          pagination: { totalItems: 2 }
        }
      }
    ],
    [
      'empty albums',
      {
        fetchData: {
          albums: [],
          pagination: { totalItems: 0 }
        }
      }
    ],
    [
      'custom query parameters',
      {
        fetchData: {
          albums: [{ id: 3, title: 'Album 3' }],
          pagination: { totalItems: 1 }
        },
        routeQuery: { page: '2', limit: '25' }
      }
    ]
  ])(
    'renders %s correctly',
    async (
      desc: string,
      options: { fetchData: unknown; routeQuery?: Record<string, string> }
    ) => {
      // Capture the fetchData value in a local variable for closure safety.
      fetchData_ = options.fetchData;

      // Mock the useFetch call with the captured data.
      mockNuxtImport('useFetch', () => () => ({
        data: ref(fetchData_)
      }));
      // Provide a custom route query if needed; otherwise use a default.
      //   mockNuxtImport('useRoute', () => () =>
      //     options.routeQuery ? { query: options.routeQuery } : { query: {} }
      //   )

      const html = await ComponentRender(
        `SPageAlbumCollection - ${desc}`,
        {},
        SPageAlbumCollection
      );
      expect(html).toMatchSnapshot();
    }
  );
});
