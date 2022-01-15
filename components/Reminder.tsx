import { useCallback, useContext, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { DateTime, Duration, DurationLikeObject } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHistory, faClock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { RemindersContext } from './RemindersProvider';

const durationUnits: Array<keyof DurationLikeObject> = [
  'year',
  'month',
  'week',
  'day',
  'hour',
  'minute',
  'second',
];

export interface ReminderProps {
  id: string;
  title: string;
  interval: DurationLikeObject;
  lastCompletion?: string;
}

interface ReminderComponentProps extends ReminderProps {
  onLongPress: () => void;
}

const getToday = () => DateTime.now().startOf('day');

const getBestUnit = (duration: Duration) => {
  for (const timeUnit of durationUnits) {
    const result = duration.get(timeUnit);
    if (result > 0) return timeUnit;
  }
};

export const getDueDate = (reminder: ReminderProps) => {
  const lastCompletion = reminder.lastCompletion
    ? DateTime.fromISO(reminder.lastCompletion)
    : getToday();
  return lastCompletion.plus(reminder.interval);
};

const makeFriendlyDueDateMessage = (dueDate: DateTime) => {
  const daysFromNow = dueDate.diff(getToday()).as('days');

  if (daysFromNow >= 2) return `Due in ${daysFromNow} days`;
  if (daysFromNow == 1) return 'Due tomorrow';
  if (daysFromNow == 0) return 'Due today';
  if (daysFromNow == -1) return 'Due yesterday';
  else return `Due ${-daysFromNow} days ago`;
};

const makeFriendlyIntervalMessage = (interval: DurationLikeObject) => {
  const intervalDuration = Duration.fromObject(interval);
  const durationBestUnit = getBestUnit(intervalDuration);
  const intervalNumber = intervalDuration.as(durationBestUnit);
  const intervalText =
    intervalNumber > 1
      ? `Every ${intervalNumber} ${durationBestUnit}s`
      : 'Every ' + durationBestUnit;
  return intervalText;
};

export default function Reminder({
  id,
  title,
  interval,
  lastCompletion,
  onLongPress,
}: ReminderComponentProps) {
  const { updateReminder } = useContext(RemindersContext);
  const [isChecked, setIsChecked] = useState(false);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const onCompletion = useCallback(() => {
    const now = DateTime.now();
    setIsChecked(true);
    setTimeout(() => {
      updateReminder(id, { lastCompletion: now.toISODate() });
      setIsChecked(false);
    }, 1500);
  }, [id]);

  return (
    <Pressable
      onPress={() => {}}
      onLongPress={onLongPress}
      android_ripple={{ color: 'black' }}
      style={{
        ...styles.reminderPressable,
        backgroundColor: isChecked ? 'mediumseagreen' : 'dodgerblue',
      }}
    >
      <View style={{ marginRight: 10, width: 50, height: 50, padding: 5 }}>
        <Pressable
          onPress={onCompletion}
          style={{
            width: '100%',
            height: '100%',
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon
            icon={faCheck}
            size={24}
            style={{ display: isChecked ? 'flex' : 'none' }}
          />
        </Pressable>
      </View>
      <View style={{ width: windowWidth - 50 - 35 }}>
        <Text style={{ ...styles.reminderText, fontSize: 20, marginBottom: 5 }}>
          {title}
        </Text>
        <View style={{ margin: 2, flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={styles.iconLabel}>
            <FontAwesomeIcon
              icon={faClock}
              style={{ ...styles.reminderText, marginRight: 5 }}
            />
            <Text style={styles.reminderText}>
              {makeFriendlyDueDateMessage(
                getDueDate({
                  id,
                  title,
                  interval,
                  lastCompletion,
                })
              )}
            </Text>
          </View>
          <View style={styles.iconLabel}>
            <FontAwesomeIcon
              icon={faHistory}
              style={{ ...styles.reminderText, marginRight: 5 }}
            />
            <Text style={styles.reminderText}>
              {makeFriendlyIntervalMessage(interval)}
            </Text>
          </View>
          {lastCompletion && (
            <View style={styles.iconLabel}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ ...styles.reminderText, marginRight: 5 }}
              />
              <Text style={styles.reminderText}>
                {DateTime.fromISO(lastCompletion).toLocaleString()}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  reminderPressable: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
    margin: 5,
    padding: 10,
    borderRadius: 15,
  },
  iconLabel: {
    // flex: 0,
    flexDirection: 'row',
    marginRight: 15,
  },
  reminderText: {
    color: 'black',
  },
});
