import { describe, expect, it } from 'vitest';
import CommentWrapper from '../../components/CommentWrapper.vue';
import ComponentRender from '../componentRender';
import '../mockUseUserSession';

describe('CommentWrapper Snapshot', () => {
  const baseProps = {
    module: 'test-module',
    id: 1,
    currentIndex: 0,
    initialMessageLimit: '10',
    maxLineLimit: '40',
    maxShowingDepth: '5',
    maxCommentLength: '1000',
    depthLength: 0,
    commentBackgroundColor: 'white',
    commentTextColor: '#1d2129',
    userNameColor: 'rgb(6, 177, 183)',
    wrapperSize: '1024',
    parentIds: [],
    parentIndices: [],
    comment: {
      id: 101,
      image: 'https://example.com/avatar.jpg',
      name: 'Test User',
      content: 'This is a test comment.\nIt has two lines.',
      timestamp: '123456789',
      createdAt: '123456789',
      updatedAt: '123456789',
      replies: [],
      replyCount: 0,
      email: 'test@example.com',
      lineCount: 2
    }
  };
  it.each([
    ['default comment', { props: baseProps }],
    [
      'updated comment (with Updated badge)',
      {
        props: {
          ...baseProps,
          comment: {
            ...baseProps.comment,
            // Set updatedAt 1 minute later than createdAt to simulate an update
            updatedAt: (Number(baseProps.comment.createdAt) + 60000).toString()
          }
        }
      }
    ],
    [
      'comment with replies',
      {
        props: {
          ...baseProps,
          comment: {
            ...baseProps.comment,
            replies: [
              {
                id: 201,
                image: 'https://example.com/reply-avatar.jpg',
                name: 'Reply User',
                content: 'This is a reply.',
                timestamp: '123456789',
                createdAt: '123456789',
                updatedAt: '123456789',
                replies: [],
                replyCount: 0,
                email: 'reply@example.com',
                lineCount: 1
              }
            ],
            replyCount: 1
          }
        }
      }
    ],
    [
      'comment with nested replies',
      {
        props: {
          ...baseProps,
          comment: {
            ...baseProps.comment,
            replies: [
              {
                id: 202,
                image: 'https://example.com/reply-avatar.jpg',
                name: 'Reply User',
                content: 'This is a reply.',
                timestamp: '123456789',
                createdAt: '123456789',
                updatedAt: '123456789',
                replies: [
                  {
                    id: 203,
                    image: 'https://example.com/reply-avatar.jpg',
                    name: 'Reply User',
                    content: 'This is a reply.',
                    timestamp: '123456789',
                    createdAt: '123456789',
                    updatedAt: '123456789',
                    replies: [],
                    replyCount: 0,
                    email: 'reply@example.com',
                    lineCount: 1
                  },
                  {
                    id: 204,
                    image: 'https://example.com/reply-avatar.jpg',
                    name: 'Reply User',
                    content: 'This is a reply.',
                    timestamp: '123456789',
                    createdAt: '123456789',
                    updatedAt: '123456789',
                    replies: [],
                    replyCount: 0,
                    email: 'reply@example.com',
                    lineCount: 1
                  }
                ],
                replyCount: 2,
                email: 'reply@example.com',
                lineCount: 1
              }
            ],
            replyCount: 1
          }
        }
      }
    ]
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `CommentWrapper ${desc}`,
        options,
        CommentWrapper
      );
      expect(html).toMatchSnapshot();
    }
  );
});
