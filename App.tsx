import { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Duration } from 'luxon';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DurationObject {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  weeks?: number;
  months?: number;
  years?: number;
}

interface Reminder {
  title: string;
  interval: DurationObject;
  lastCompletion?: Date;
}

const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const initialReminders: Reminder[] = [
  {
    title: 'Play guitar',
    interval: {weeks: 1},
  },
  {
    title: 'Read a book',
    interval: {days: 3},
  },
  {
    title: 'Exercise',
    interval: {days: 2},
  },
];

export default function App() {
  const [reminders, setReminders] = useState<Array<Reminder>>([]);

  useEffect(() => {
    const getReminders = async () => {
      // await storeData('reminders', initialReminders);
      const storedReminders = await getData('reminders');
      // console.log(storedReminders);
      setReminders(storedReminders);
    }

    getReminders();
  });

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
      <View style={{padding: 20}}>
        <FlatList
          data={reminders}
          renderItem={({item: reminder, index}) => (
            <View key={index}>
              <Text style={{color: 'white'}}>
                {reminder.title + ' -- interval: ' + Duration.fromObject(reminder.interval).as('days') + ' days'}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
