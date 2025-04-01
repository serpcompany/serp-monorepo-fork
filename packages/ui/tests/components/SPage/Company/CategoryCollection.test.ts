import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import CategoryCollection from '../../../../components/SPage/Company/CategoryCollection.vue';
import ComponentRender from '../../../componentRender';
import '../../../mockUseUserSession';

mockNuxtImport('useSeoMeta', () => () => {});

describe('SPageCompanyCategoryCollection Snapshot', () => {
  const scenarios: [
    string,
    { companiesData: unknown; categoriesData: unknown }
  ][] = [
    [
      'with complete data',
      {
        companiesData: {
          categoryName: 'Tech',
          companies: [
            { slug: 'company-one', name: 'Company One' },
            { slug: 'company-two', name: 'Company Two' }
          ],
          pagination: { totalItems: 100 },
          categoryArticle: {
            title: 'Industry Insights',
            content: 'Article content'
          }
        },
        categoriesData: [{ id: 1, slug: 'cat-tech', name: 'Tech' }]
      }
    ],
    [
      'without category article',
      {
        companiesData: {
          categoryName: 'Tech',
          companies: [
            { slug: 'company-one', name: 'Company One' },
            { slug: 'company-two', name: 'Company Two' }
          ],
          pagination: { totalItems: 100 },
          categoryArticle: null
        },
        categoriesData: [{ id: 1, slug: 'cat-tech', name: 'Tech' }]
      }
    ],
    [
      'with empty companies',
      {
        companiesData: {
          categoryName: 'Tech',
          companies: [],
          pagination: { totalItems: 0 },
          categoryArticle: null
        },
        categoriesData: [{ id: 1, slug: 'cat-tech', name: 'Tech' }]
      }
    ],
    [
      'with no categories',
      {
        companiesData: {
          categoryName: 'Tech',
          companies: [
            { slug: 'company-one', name: 'Company One' },
            { slug: 'company-two', name: 'Company Two' }
          ],
          pagination: { totalItems: 100 },
          categoryArticle: {
            title: 'Industry Insights',
            content: 'Article content'
          }
        },
        categoriesData: []
      }
    ]
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { companiesData, categoriesData }) => {
      globalThis.useCompanies = () => Promise.resolve(companiesData);
      globalThis.useCompanyCategories = () => Promise.resolve(categoriesData);

      const html = await ComponentRender(
        `SPageCompanyCategoryCollection ${desc}`,
        {},
        CategoryCollection
      );
      expect(html).toMatchSnapshot();
    }
  );
});
