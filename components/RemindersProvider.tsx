import React, { createContext, useState, useEffect } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { ReminderProps } from './Reminder';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { testReminders } from '../data/testReminders';

// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// I'm getting some data weirdness. Previous updates are getting lost/reverted
// by new updates. Need to check store logic.

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
  addReminder: (props: Omit<ReminderProps, 'id'>) => {},
  deleteReminder: (id: string) => {},
  updateReminder: (
    id: string,
    newReminderProps: Partial<Omit<ReminderProps, 'id'>>
  ) => {},
});

const RemindersProvider = ({ children }) => {
  const [reminders, setReminders] = useState<ReminderProps[]>([]);

  const storeRemindersAndSyncState = async (newReminders: ReminderProps[]) => {
    try {
      await storeData('reminders', newReminders);
      const storedReminders = await getData('reminders');
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
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
