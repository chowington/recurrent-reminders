import ReminderComponent, { ReminderProps } from './Reminder';
import { Text, FlatList, Pressable, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { RemindersContext } from './RemindersProvider';

interface ReminderScreenProps {
  navigation: any;
}

export default function RemindersScreen(props: ReminderScreenProps) {
  const { reminders } = useContext(RemindersContext);

  return (
    <View style={{flex: 1, backgroundColor: 'black', padding: 20}}>
      <Pressable onPress={() => props.navigation.navigate('Add new reminder')} android_ripple={{color: 'black'}} style={{flex: 1, flexDirection: 'row', height: '20%', backgroundColor: 'lightblue', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 5}}>
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
