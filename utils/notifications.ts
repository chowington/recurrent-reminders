import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export async function setUpNotifications() {
  await notifee.cancelAllNotifications();

  const oldChannels = await notifee.getChannels();
  for (const channel of oldChannels) await notifee.deleteChannel(channel.id);

  const channelId = await notifee.createChannel({
    id: 'daily-reminder',
    name: 'Daily Reminder',
  });

  const now = new Date(Date.now());
  const triggerTimeToday = new Date(now.setHours(9, 0, 0, 0));
  const triggerTime =
    triggerTimeToday > now
      ? triggerTimeToday.getTime()
      : triggerTimeToday.setDate(now.getDate() + 1);

  const dailyTrigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTime,
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
