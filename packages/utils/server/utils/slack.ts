import { WebClient } from '@slack/web-api';

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannel_ = process.env.SLACK_CHANNEL_ID;
const slack = new WebClient(slackToken);

export async function sendSlackNotification(
  message,
  slackChannel = slackChannel_
) {
  try {
    if (process.env.NODE_ENV === 'production') {
      await slack.chat.postMessage({
        channel: slackChannel,
        text: message
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('Slack notification sent', { message, slackChannel });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to send Slack notification', {
      error: error.message
    });
  }
}
