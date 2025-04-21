/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars  */

import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import GlossaryPost from '../../../components/SinglePosts/GlossaryPost.vue';
import ComponentRender from '../../componentRender';
import '../../mockUseUserSession';

let runtimeConfig: Record<string, unknown> = { public: { useAuth: true } };
mockNuxtImport('useHead', () => () => {});

describe('SinglePostsGlossaryPost Snapshot', () => {
  const scenarios: [
    string,
    { config: Record<string, unknown>; props: { data: unknown } }
  ][] = [
    [
      'with full post and auth enabled',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        props: {
          data: {
            // Using keyword when available (takes precedence over title)
            keyword: 'Nuxt Testing',
            oneLiner: 'A quick guide on snapshot testing.',
            videoId: 'abc123',
            content: '<p>Content of the post</p>',
            // When relatedPosts exists and is empty, a related posts block is rendered.
            relatedPosts: [],
            slug: 'nuxt-testing',
            comments: [
              { author: 'John Doe', comment: 'Great post!', replies: [] }
            ],
            upvotes: ['test@test.com']
          }
        }
      }
    ],
    [
      'with full post and auth disabled',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        props: {
          data: {
            keyword: 'Nuxt Testing',
            oneLiner: 'A quick guide on snapshot testing.',
            videoId: 'abc123',
            content: '<p>Content of the post</p>',
            relatedPosts: [],
            slug: 'nuxt-testing',
            comments: [
              { author: 'John Doe', comment: 'Great post!', replies: [] }
            ],
            upvotes: []
          }
        }
      }
    ],
    [
      'without video and minimal fields',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        props: {
          data: {
            // Omitting keyword, so title will be used for the heading.
            title: 'No Video Post',
            content: '<p>Content without video</p>',
            slug: 'no-video-post',
            // Comments and relatedPosts are omitted or empty.
            comments: [],
            upvotes: []
          }
        }
      }
    ],
    [
      'with non-empty relatedPosts',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        props: {
          data: {
            title: 'Related Posts Present',
            oneLiner: 'Post with related posts',
            videoId: 'def456',
            content: '<p>Some content here</p>',
            // Providing non-empty relatedPosts should bypass the related posts block.
            relatedPosts: [{ id: 1, title: 'Related Post' }],
            slug: 'related-posts-post',
            comments: [],
            upvotes: ['test@test.com']
          }
        }
      }
    ]
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, { config, props }) => {
      runtimeConfig = config;
      mockNuxtImport('useRuntimeConfig', () => () => runtimeConfig);
      globalThis.usePostComments = async (id: number) => {
        return {
          comments: props.comments
            ? [
                {
                  id: 1,
                  content: 'Test comment',
                  replies: []
                }
              ]
            : []
        };
      };

      const html = await ComponentRender(
        `GlossaryPost ${desc}`,
        { props },
        GlossaryPost
      );
      expect(html).toMatchSnapshot();
    }
  );
});
