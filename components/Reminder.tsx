import { Text, View, Pressable } from 'react-native';
import { DateTime, Duration, DurationLikeObject, DurationUnit } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHistory, faBackspace, faClock } from '@fortawesome/free-solid-svg-icons';

const durationUnits = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
];

export interface ReminderProps {
  id: string;
  title: string;
  interval: DurationLikeObject;
  lastCompletion?: string;
}

const getBestUnit = (duration: Duration) => {
  for (const timeUnit of durationUnits) {
    const result = duration[timeUnit] as number;
    // console.log(result);
    if (result > 0) return timeUnit as DurationUnit;
  }
}

const getDueDate = (reminder: ReminderProps) => {
  const lastCompletion = reminder.lastCompletion ? DateTime.fromISO(reminder.lastCompletion) : DateTime.now();
  return lastCompletion.plus(reminder.interval);
}

const onPress = () => {};

export default function Reminder(props: ReminderProps) {
  // console.log(props);
  const intervalDuration = Duration.fromObject(props.interval);
  // console.log(intervalDuration);
  const durationBestUnit = getBestUnit(intervalDuration);
  // console.log(durationBestUnit);

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: 'black'}}
      style={{
        margin: 5,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 15,
      }}
    >
      <Text style={{color: 'white', fontSize: 20}}>{props.title}</Text>
      <View style={{margin: 2, flex: 1, flexDirection: 'row'}}>
        <View style={{marginRight: 15}}>
          <FontAwesomeIcon icon={faClock} style={{color: 'white', marginRight: 5}}/>
          <Text style={{color: 'white'}}>Due: {getDueDate(props).toLocaleString()}</Text>
        </View>
        <View style={{marginRight: 15}}>
          <FontAwesomeIcon icon={faHistory} style={{color: 'white', marginRight: 5}}/>
          <Text style={{color: 'white'}}>{intervalDuration.as(durationBestUnit) + ' ' + durationBestUnit}</Text>
        </View>
        {props.lastCompletion && (
          <View style={{marginRight: 15}}>
            <FontAwesomeIcon icon={faBackspace} style={{color: 'white', marginRight: 5}}/>
            <Text style={{color: 'white'}}>{props.lastCompletion}</Text>
          </View>
        )}
      </View>
    </Pressable>
  )
}
