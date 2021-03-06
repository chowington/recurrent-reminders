import { useCallback, useContext, useState } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import { RemindersContext } from './RemindersProvider';
import { DatePickerModal } from 'react-native-paper-dates';
import { DateTime, Duration } from 'luxon';
import { ReminderProps } from './Reminder';

interface ReminderFormProps {
  reminder?: ReminderProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}

export default function ReminderForm(props: ReminderFormProps) {
  const [taskName, setTaskName] = useState(props.reminder?.title ?? '');
  const [interval, setInterval] = useState<number | undefined>(
    props.reminder
      ? Duration.fromObject(props.reminder.interval).as('days')
      : undefined
  );
  const [startDate, setStartDate] = useState<Date>(
    props.reminder
      ? DateTime.fromISO(props.reminder.startDate).toJSDate()
      : new Date(Date.now())
  );
  const [lastCompletion, setLastCompletion] = useState<Date | undefined>(
    props.reminder?.lastCompletion
      ? DateTime.fromISO(props.reminder.lastCompletion).toJSDate()
      : undefined
  );

  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [dateInFocus, setDateInFocus] = useState<
    'startDate' | 'lastCompletion'
  >('startDate');

  const { addReminder, updateReminder } = useContext(RemindersContext);

  const isValid = taskName.length > 0 && interval > 0;

  const onDismissSingle = useCallback(() => {
    if (dateInFocus === 'lastCompletion') setLastCompletion(undefined);
    setDatePickerIsVisible(false);
  }, [dateInFocus, setDatePickerIsVisible]);

  const onConfirmSingle = useCallback(
    (params) => {
      if (dateInFocus === 'startDate') setStartDate(params.date);
      else setLastCompletion(params.date);
      setDatePickerIsVisible(false);
    },
    [dateInFocus]
  );

  const onComplete = useCallback(() => {
    const newReminder: Omit<ReminderProps, 'id'> = {
      title: taskName,
      interval: { days: interval },
      startDate: DateTime.fromJSDate(startDate).toISODate(),
    };

    if (props.reminder) {
      newReminder.lastCompletion =
        lastCompletion && DateTime.fromJSDate(lastCompletion).toISODate();
      updateReminder(props.reminder.id, newReminder);
    } else {
      addReminder(newReminder);
    }

    props.navigation.goBack();
  }, [
    props.reminder,
    updateReminder,
    addReminder,
    taskName,
    interval,
    startDate,
    lastCompletion,
    props.navigation,
  ]);

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
      <Pressable
        onPress={() => {
          setDateInFocus('startDate');
          setDatePickerIsVisible(true);
        }}
      >
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
      {props.reminder && (
        <>
          <Text style={{ color: 'white', fontSize: 26, marginBottom: 10 }}>
            Last completion date
          </Text>
          <Pressable
            onPress={() => {
              setDateInFocus('lastCompletion');
              setDatePickerIsVisible(true);
            }}
          >
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
              {lastCompletion && lastCompletion.toLocaleDateString()}
            </Text>
          </Pressable>
        </>
      )}
      <DatePickerModal
        locale='en'
        mode='single'
        visible={datePickerIsVisible}
        onDismiss={onDismissSingle}
        date={dateInFocus === 'startDate' ? startDate : lastCompletion}
        onConfirm={onConfirmSingle}
        saveLabel='Select'
        uppercase={false}
      />
      <Pressable
        onPress={onComplete}
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
        <Text style={{ color: 'black', fontSize: 16 }}>
          {props.reminder ? 'Update reminder' : 'Create reminder'}
        </Text>
      </Pressable>
    </View>
  );
}
