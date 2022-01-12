import React, { createContext, useState, useEffect } from 'react';
import { ReminderProps } from './Reminder';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log('Failed to save data');
  }
}

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Failed to retrieve data');
  }
}

export const RemindersContext = createContext({
  reminders: [],
  addReminder: (props: Omit<ReminderProps, 'id'>) => {},
});

const RemindersProvider = ({ children }) => {
  const [reminders, setReminders] = useState<ReminderProps[]>([]);
  const addReminder = (props: Omit<ReminderProps, 'id'>) => {
    const newReminder = {
      id: uuid.v4() as string,
      ...props,
    };
    const newReminders = reminders.concat([newReminder]);
    storeData('reminders', newReminders)
      .then(() => getData('reminders')
        .then((value) => setReminders(value)))
      .catch(() => console.error('Error: Could not add new reminder'));
  }

  useEffect(() => {
    const getReminders = async () => {
      // await storeData('reminders', testReminders);
      // await storeData('reminders', []);
      const storedReminders = await getData('reminders');
      // console.log(storedReminders);
      setReminders(storedReminders);
    }

    getReminders();
  }, []);

  return (
    <RemindersContext.Provider
      value={{
        reminders,
        addReminder,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
};

export default RemindersProvider;
