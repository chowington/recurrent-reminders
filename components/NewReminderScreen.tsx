import { useCallback, useContext, useState } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import { RemindersContext } from './RemindersProvider';

export default function AddNewReminderScreen({
  navigation,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}) {
  const [taskName, setTaskName] = useState('');
  const [interval, setInterval] = useState<number>();
  const { addReminder } = useContext(RemindersContext);

  const isValid = taskName.length > 0 && interval > 0;

  const onCreateReminderPress = useCallback(() => {
    addReminder({
      title: taskName,
      interval: { days: interval },
    });
    navigation.goBack();
  }, [addReminder, taskName, interval, navigation]);

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
        value={interval ? interval.toString() : undefined}
        onChangeText={(value) => setInterval(parseInt(value))}
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
        disabled={!isValid}
        style={{
          width: '100%',
          height: 70,
          backgroundColor: isValid ? 'lightblue' : 'dimgrey',
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
