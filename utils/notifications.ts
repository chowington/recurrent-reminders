import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { DateTime } from 'luxon';

export async function setUpNotifications() {
  // const notifications = await notifee.getTriggerNotifications();
  // console.log(notifications);
  // return;

  await notifee.cancelAllNotifications();

  const oldChannels = await notifee.getChannels();
  for (const channel of oldChannels) await notifee.deleteChannel(channel.id);

  const channelId = await notifee.createChannel({
    id: 'daily-reminder',
    name: 'Daily Reminder',
  });

  const now = DateTime.now();
  const triggerTimeToday = now.set({
    hour: 9,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const triggerTime =
    triggerTimeToday.diff(now).as('milliseconds') > 0
      ? triggerTimeToday
      : triggerTimeToday.plus({ days: 1 });

  const dailyTrigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTime.toMillis(),
    repeatFrequency: RepeatFrequency.DAILY,
  };

  await notifee.createTriggerNotification(
    {
      title: 'Be sure to check your reminders today!',
      body: 'Go forth and be awesome :)',
      android: {
        channelId: channelId,
      },
    },
    dailyTrigger
  );
}
