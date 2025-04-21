/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars  */

import { describe, expect, it } from 'vitest';
import MoviePostLinkHub from '../../components/MoviePostLinkHub.vue';
import ComponentRender from '../componentRender';

describe('MoviePostLinkHub Snapshot', () => {
  const scenarios: [
    string,
    { posts: Array<{ slug: string; keyword: string; featuredImage: string }> }
  ][] = [
    [
      'with posts',
      {
        posts: [
          {
            slug: 'movie-1',
            keyword: 'Movie One',
            featuredImage: 'https://example.com/movie1.jpg'
          },
          {
            slug: 'movie-2',
            keyword: 'Movie Two',
            featuredImage: 'https://example.com/movie2.jpg'
          }
        ]
      }
    ],
    ['with no posts', { posts: [] }]
  ];

  it.each(scenarios)('renders %s correctly', async (desc, { posts }) => {
    (globalThis as unknown).usePosts = async (...args: unknown) => ({ posts });

    const html = await ComponentRender(
      `MoviePostLinkHub ${desc}`,
      {},
      MoviePostLinkHub
    );
    expect(html).toMatchSnapshot();
  });
});
