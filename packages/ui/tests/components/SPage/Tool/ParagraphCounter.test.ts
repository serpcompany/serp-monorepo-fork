import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPageToolParagraphCounter from '../../../../components/SPage/Tool/ParagraphCounter.vue';
import ComponentRender from '../../../componentRender';

mockNuxtImport('useSeoMeta', () => () => {});

describe('SPageToolParagraphCounter Snapshot', () => {
  it('renders the default snapshot correctly', async () => {
    const html = await ComponentRender(
      'SPageToolParagraphCounter',
      {},
      SPageToolParagraphCounter
    );
    expect(html).toMatchSnapshot();
  });
});
