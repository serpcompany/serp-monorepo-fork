import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPageCompanySingle from '../../../../components/SPage/Company/Single.vue';
import ComponentRender from '../../../componentRender';
import '../../../mockUseUserSession';

// Extend globalThis to include useCompany and other custom properties
declare global {
  interface GlobalThis {
    useCompany: () => Promise<Record<string, unknown>>;
    useCompanyUpvotesAndComments: () => Promise<{
      upvotes: string[];
      comments: unknown[];
    }>;
    useCompanyReviews: () => Promise<{
      reviews: { id: number; rating: number; title: string; content: string }[];
      userReview: null;
    }>;
  }
}

mockNuxtImport('useSeoMeta', () => () => {});

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false
  }
};

describe('SPageCompanySingle Snapshot', () => {
  const scenarios: [
    string,
    {
      config: Record<string, unknown>;
      companyData: Record<string, unknown>;
      upvotesAndComments: { upvotes: string[]; comments: unknown[] };
    }
  ][] = [
    [
      'complete company data (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        companyData: {
          id: 1,
          name: 'Test Company',
          oneLiner: 'We test companies',
          logo: '/logo.png',
          serplyLink: 'https://serply.com',
          excerpt: 'Company overview excerpt',
          content: '<p>Company article content</p>',
          features: [{ item: 'Feature A', description: 'Description A' }],
          faqs: [
            { question: 'What is this?', answer: 'This is a test company.' }
          ],
          alternatives: ['Alternative 1', 'Alternative 2'],
          screenshots: ['/screenshot1.png'],
          categories: [{ id: 10, slug: 'cat-1', name: 'Category 1' }]
        },
        upvotesAndComments: {
          upvotes: ['user@example.com'],
          comments: [{ id: 100, content: 'Great company!', replies: [] }]
        }
      }
    ],
    [
      'minimal company data (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        companyData: {
          id: 2,
          name: 'Minimal Company',
          oneLiner: 'Minimal details',
          logo: '/minimal-logo.png',
          serplyLink: 'https://serply.com',
          excerpt: '',
          content: '',
          features: null,
          faqs: null,
          alternatives: null,
          screenshots: null,
          categories: null
        },
        upvotesAndComments: {
          upvotes: [],
          comments: []
        }
      }
    ],
    [
      'complete company data (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        companyData: {
          id: 1,
          name: 'Test Company',
          oneLiner: 'We test companies',
          logo: '/logo.png',
          serplyLink: 'https://serply.com',
          excerpt: 'Company overview excerpt',
          content: '<p>Company article content</p>',
          features: [{ item: 'Feature A', description: 'Description A' }],
          faqs: [
            { question: 'What is this?', answer: 'This is a test company.' }
          ],
          alternatives: ['Alternative 1', 'Alternative 2'],
          screenshots: ['/screenshot1.png'],
          categories: [{ id: 10, slug: 'cat-1', name: 'Category 1' }]
        },
        upvotesAndComments: {
          upvotes: ['user@example.com'],
          comments: [{ id: 100, content: 'Great company!', replies: [] }]
        }
      }
    ],
    [
      'minimal company data (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        companyData: {
          id: 2,
          name: 'Minimal Company',
          oneLiner: 'Minimal details',
          logo: '/minimal-logo.png',
          serplyLink: 'https://serply.com',
          excerpt: '',
          content: '',
          features: null,
          faqs: null,
          alternatives: null,
          screenshots: null,
          categories: null
        },
        upvotesAndComments: {
          upvotes: [],
          comments: []
        }
      }
    ]
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { config, companyData, upvotesAndComments }) => {
      config_ = config;
      mockNuxtImport('useRuntimeConfig', () => () => config_);
      globalThis.useCompany = () => Promise.resolve(companyData);
      globalThis.useCompanyUpvotesAndComments = () =>
        Promise.resolve(upvotesAndComments);

      // Add mock for useCompanyReviews
      globalThis.useCompanyReviews = () =>
        Promise.resolve({
          reviews: [
            { id: 1, rating: 4, title: 'Good service', content: 'I liked it' },
            {
              id: 2,
              rating: 5,
              title: 'Excellent',
              content: 'The best service'
            }
          ],
          userReview: null
        });

      const html = await ComponentRender(
        `SPageCompanySingle ${desc}`,
        {},
        SPageCompanySingle
      );
      expect(html).toMatchSnapshot();
    }
  );
});
