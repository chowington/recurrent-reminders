import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReminderProps } from './Reminder';
import { testReminders } from '../data/TestReminders';
import ReminderComponent from './Reminder';
import { Text, FlatList, Pressable, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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

export default function RemindersScreen({navigation}) {
  const [reminders, setReminders] = useState<Array<ReminderProps>>([]);

  useEffect(() => {
    const getReminders = async () => {
      await storeData('reminders', testReminders);
      const storedReminders = await getData('reminders');
      // console.log(storedReminders);
      setReminders(storedReminders);
    }

    getReminders();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Pressable onPress={() => navigation.navigate('Add new reminder')} android_ripple={{color: 'black'}} style={{flex: 1, flexDirection: 'row', height: '20%', backgroundColor: 'lightblue', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 5}}>
        <FontAwesomeIcon icon={faPlus} style={{color: 'black', marginRight: 10}}/>
        <Text style={{color: 'black', fontSize: 16}}>Add new reminder</Text>
      </Pressable>
      <FlatList
        data={reminders}
        renderItem={({item: reminder}) => (
          <ReminderComponent {...reminder} key={reminder.id} />
        )}
        style={{height: '80%'}}
      />
    </View>
  )
}
