import React, { createContext, useState, useEffect } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { ReminderProps } from './Reminder';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { testReminders } from '../data/testReminders';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Failed to save data');
  }
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to retrieve data');
  }
};

export const RemindersContext = createContext({
  reminders: [],
  /* eslint-disable @typescript-eslint/no-unused-vars */
  addReminder: (props: Omit<ReminderProps, 'id'>) => {
    console.error('Context value not set');
  },
  deleteReminder: (id: string) => {
    console.error('Context value not set');
  },
  updateReminder: (
    id: string,
    newReminderProps: Partial<Omit<ReminderProps, 'id'>>
  ) => {
    console.error('Context value not set');
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
});

const RemindersProvider = ({ children }: { children: React.ReactNode }) => {
  const [reminders, setReminders] = useState<ReminderProps[]>([]);

  const storeRemindersAndSyncState = async (newReminders: ReminderProps[]) => {
    try {
      await storeData('reminders', newReminders);
      const storedReminders = await getData('reminders');
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setReminders(storedReminders);
    } catch (e) {
      console.error('Error: Could not sync reminders');
      console.error(e);
    }
  };

  const addReminder = (props: Omit<ReminderProps, 'id'>) => {
    const newReminder = {
      id: uuid.v4() as string,
      ...props,
    };
    storeRemindersAndSyncState(reminders.concat(newReminder));
  };

  const deleteReminder = (id: string) => {
    const newReminders = reminders.filter((reminder) => reminder.id !== id);
    storeRemindersAndSyncState(newReminders);
  };

  const updateReminder = (
    id: string,
    newReminderProps: Partial<Omit<ReminderProps, 'id'>>
  ) => {
    const [matchedReminders, otherReminders] = _.partition(
      reminders,
      (reminder) => reminder.id === id
    );
    const updatedReminder = { ...matchedReminders[0], ...newReminderProps };
    storeRemindersAndSyncState(otherReminders.concat(updatedReminder));
  };

  useEffect(() => {
    const getReminders = async () => {
      // await storeData('reminders', testReminders);
      // await storeData('reminders', []);
      const storedReminders = await getData('reminders');
      setReminders(storedReminders);
    };

    getReminders();
  }, []);

  return (
    <RemindersContext.Provider
      value={{
        reminders,
        addReminder,
        deleteReminder,
        updateReminder,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
};

export default RemindersProvider;
