import { ReminderProps } from '../components/Reminder';
import { DateTime } from 'luxon';

const daysAgo = (days: number) =>
  DateTime.now().startOf('day').minus({ days: days }).toISODate();

export const makeTestReminders = (): ReminderProps[] => [
  {
    id: '83ca3c76-8bd1-42ae-86e7-60a8149b6a0e',
    title: 'Do great work',
    startDate: daysAgo(30),
    interval: {
      days: 1,
    },
    lastCompletion: daysAgo(11),
  },
  {
    id: '4fcbd93e-b9a5-438a-99fb-01b4e0f513cb',
    title: 'Exercise',
    startDate: daysAgo(30),
    interval: {
      days: 2,
    },
    lastCompletion: daysAgo(5),
  },
  {
    id: 'd9f9eb38-3374-482a-a3e7-72099377d8e8',
    title: 'Meditate',
    interval: {
      days: 2,
    },
    startDate: daysAgo(12),
    lastCompletion: daysAgo(1),
  },
  {
    id: '6c8d5173-76ad-44cb-b3c7-d854c05450c6',
    title: 'Read',
    interval: {
      days: 3,
    },
    startDate: daysAgo(56),
    lastCompletion: daysAgo(8),
  },
  {
    id: '87202216-c555-4d0e-80fb-0eb90256dfb5',
    title: 'Play guitar',
    startDate: daysAgo(0),
    interval: {
      days: 7,
    },
  },
  {
    id: 'bff17177-b5be-4ba0-803b-b16ad76999fa',
    title: 'Work on app',
    startDate: daysAgo(8),
    interval: {
      days: 2,
    },
    lastCompletion: daysAgo(0),
  },
  {
    id: '7150dae7-5dc8-4c2f-ad50-932fdeb569f5',
    title: 'Review budget',
    interval: {
      days: 28,
    },
    startDate: daysAgo(60),
    lastCompletion: daysAgo(3),
  },
  {
    id: '8a70b960-5b8f-4b67-9c23-7559884ef230',
    title: 'Cook a meal',
    interval: {
      days: 7,
    },
    startDate: daysAgo(22),
    lastCompletion: daysAgo(2),
  },
];
