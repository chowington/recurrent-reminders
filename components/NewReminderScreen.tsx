import { useCallback, useContext, useState } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import { RemindersContext } from './RemindersProvider';
import { DatePickerModal } from 'react-native-paper-dates';
import { DateTime } from 'luxon';

export default function AddNewReminderScreen({
  navigation,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}) {
  const [taskName, setTaskName] = useState('');
  const [interval, setInterval] = useState<number | undefined>();
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now()));
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const { addReminder } = useContext(RemindersContext);

  const isValid = taskName.length > 0 && interval > 0;

  const onDismissSingle = useCallback(() => {
    setDatePickerIsVisible(false);
  }, [setDatePickerIsVisible]);

  const onConfirmSingle = useCallback(
    (params) => {
      setDatePickerIsVisible(false);
      setStartDate(params.date);
    },
    [setDatePickerIsVisible, setStartDate]
  );

  const onCreateReminderPress = useCallback(() => {
    addReminder({
      title: taskName,
      interval: { days: interval },
      startDate: DateTime.fromJSDate(startDate).toISODate(),
    });
    navigation.goBack();
  }, [addReminder, taskName, interval, startDate, navigation]);

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
      <Text style={{ color: 'white', fontSize: 26, marginBottom: 10 }}>
        Start date
      </Text>
      <Pressable onPress={() => setDatePickerIsVisible(true)}>
        <Text
          style={{
            color: 'white',
            borderStyle: 'solid',
            borderColor: 'lightblue',
            borderWidth: 2,
            borderRadius: 10,
            height: 50,
            padding: 10,
            marginBottom: 30,
            textAlignVertical: 'center',
          }}
        >
          {startDate.toLocaleDateString()}
        </Text>
      </Pressable>
      <DatePickerModal
        locale='en'
        mode='single'
        visible={datePickerIsVisible}
        onDismiss={onDismissSingle}
        date={startDate}
        onConfirm={onConfirmSingle}
        saveLabel='Select'
        uppercase={false}
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
        <Text style={{ color: 'black', fontSize: 16 }}>Create reminder</Text>
      </Pressable>
    </View>
  );
}
