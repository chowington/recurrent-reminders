import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Duration } from 'luxon';

interface Reminder {
  title: string;
  interval: Duration;
  lastCompletion?: Date;
}

export default function App() {
  const [reminders, setReminders] = useState<Array<Reminder>>([
    {
      title: 'Play guitar',
      interval: Duration.fromObject({weeks: 1}),
    },
    {
      title: 'Read a book',
      interval: Duration.fromObject({days: 3}),
    },
    {
      title: 'Exercise',
      interval: Duration.fromObject({days: 2}),
    },
  ]);

  return (
    <View style={{marginTop: 30, padding: 20}}>
      <FlatList
        data={reminders}
        renderItem={({item: reminder, index}) => (
          <View key={index}>
            <Text>
              {reminder.title + ' interval: ' + reminder.interval.as('days') + ' days'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
