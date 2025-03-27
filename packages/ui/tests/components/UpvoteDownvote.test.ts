import { describe, expect, it } from 'vitest';
import UpvoteDownvote from '../../components/UpvoteDownvote.vue';
import ComponentRender from '../componentRender';

describe('UpvoteDownvote', () => {
    it('renders correctly', async () => {
        const html = await ComponentRender('UpvoteDownvote', {}, UpvoteDownvote)
        expect(html).toMatchSnapshot()
    })
})