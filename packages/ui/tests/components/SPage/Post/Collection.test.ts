import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPagePostCollection from '../../../../components/SPage/Post/Collection.vue';
import ComponentRender from '../../../componentRender';
import '../../../mockUseUserSession';

mockNuxtImport('useHead', () => () => {});
mockNuxtImport('useSeoMeta', () => () => {});

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false
  }
};
let postsData_: unknown = {};
let categories_: unknown = [];

mockNuxtImport('useRuntimeConfig', () => () => config_);
mockNuxtImport('usePosts', () => async () => postsData_);
mockNuxtImport('usePostCategories', () => async () => categories_);

describe('SPagePostCollection Snapshot', () => {
  const defaultPostsData = {
    posts: [
      {
        id: 1,
        title: 'Post One',
        slug: 'post-one',
        keyword: 'One',
        categories: [{ id: 1, slug: 'tech', name: 'Tech' }]
      },
      {
        id: 2,
        title: 'Post Two',
        slug: 'post-two',
        keyword: 'Two',
        oneLiner: 'Test one-liner',
        excerpt: 'Test excerpt',
        categories: [{ id: 1, slug: 'tech', name: 'Tech' }]
      }
    ],
    pagination: {
      totalItems: 100
    }
  };
  const defaultCategories = [
    { id: 1, slug: 'tech', name: 'Tech' },
    { id: 2, slug: 'lifestyle', name: 'Lifestyle' }
  ];

  const scenarios: [
    string,
    { config: Record<string, unknown>; postsData: unknown; categories: unknown }
  ][] = [
    [
      'with posts and categories (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postsData: defaultPostsData,
        categories: defaultCategories
      }
    ],
    [
      'with no posts (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postsData: [],
        categories: defaultCategories
      }
    ],
    [
      'with no categories (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postsData: defaultPostsData,
        categories: []
      }
    ],
    [
      'with posts and categories (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postsData: defaultPostsData,
        categories: defaultCategories
      }
    ],
    [
      'with no posts (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postsData: [],
        categories: defaultCategories
      }
    ],
    [
      'with no categories (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postsData: defaultPostsData,
        categories: []
      }
    ]
  ];
  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { config, postsData, categories }) => {
      config_ = config;
      postsData_ = postsData;
      categories_ = categories;

      const html = await ComponentRender(
        `SPagePostCollection ${desc}`,
        {},
        SPagePostCollection
      );
      expect(html).toMatchSnapshot();
    }
  );
});
