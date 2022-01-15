import { ReminderProps } from '../components/Reminder';

export const testReminders: ReminderProps[] = [
  {
    id: '83ca3c76-8bd1-42ae-86e7-60a8149b6a0e',
    title: 'Do great work',
    interval: {
      days: 1,
    },
  },
  {
    id: '4fcbd93e-b9a5-438a-99fb-01b4e0f513cb',
    title: 'Exercise',
    interval: {
      days: 2,
    },
    lastCompletion: '2022-01-14',
  },
  {
    id: 'd9f9eb38-3374-482a-a3e7-72099377d8e8',
    title: 'Meditate',
    interval: {
      days: 2,
    },
    lastCompletion: '2021-12-20',
  },
  {
    id: '6c8d5173-76ad-44cb-b3c7-d854c05450c6',
    title: 'Read',
    interval: {
      days: 3,
    },
    lastCompletion: '2022-01-03',
  },
  {
    id: '87202216-c555-4d0e-80fb-0eb90256dfb5',
    title: 'Play guitar',
    interval: {
      days: 7,
    },
  },
  {
    id: 'bff17177-b5be-4ba0-803b-b16ad76999fa',
    title: 'Work on app',
    interval: {
      days: 2,
    },
    lastCompletion: '2022-01-15',
  },
  {
    id: '7150dae7-5dc8-4c2f-ad50-932fdeb569f5',
    title: 'Review budget',
    interval: {
      days: 28,
    },
    lastCompletion: '2022-01-01',
  },
  {
    id: '8a70b960-5b8f-4b67-9c23-7559884ef230',
    title: 'Cook a meal',
    interval: {
      days: 7,
    },
    lastCompletion: '2022-01-13',
  },
];
