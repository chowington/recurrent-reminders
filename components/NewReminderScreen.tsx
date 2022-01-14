import { useCallback, useContext, useState } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import { RemindersContext } from './RemindersProvider';

export default function AddNewReminderScreen({ navigation }) {
  const [taskName, setTaskName] = useState('');
  const [interval, setInterval] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { addReminder } = useContext(RemindersContext);

  const onCreateReminderPress = useCallback(() => {
    addReminder({
      title: taskName,
      interval: { days: parseInt(interval) },
    });
    navigation.goBack();
  }, [taskName, interval]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 26, marginBottom: 10 }}>
        Task
      </Text>
      <TextInput
        value={taskName}
        onChangeText={setTaskName}
        style={{
          color: 'white',
          borderStyle: 'solid',
          borderColor: 'lightblue',
          borderWidth: 2,
          borderRadius: 10,
          height: 50,
          padding: 10,
          marginBottom: 30,
        }}
      />
      <Text style={{ color: 'white', fontSize: 26, marginBottom: 10 }}>
        Interval (days)
      </Text>
      <TextInput
        value={interval}
        onChangeText={setInterval}
        keyboardType='numeric'
        style={{
          color: 'white',
          borderStyle: 'solid',
          borderColor: 'lightblue',
          borderWidth: 2,
          borderRadius: 10,
          height: 50,
          padding: 10,
          marginBottom: 30,
        }}
      />
      <Pressable
        onPress={onCreateReminderPress}
        android_ripple={{ color: 'black' }}
        style={{
          width: '100%',
          height: 70,
          backgroundColor: 'lightblue',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        {/* <FontAwesomeIcon icon={faPlus} style={{color: 'black', marginRight: 10}}/> */}
        <Text style={{ color: 'black', fontSize: 16 }}>Create reminder</Text>
      </Pressable>
    </View>
  );
}
