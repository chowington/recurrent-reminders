import { useCallback, useContext, useState } from 'react';
import ReminderComponent, {
  getDueDate,
  getToday,
  ReminderProps,
} from '../components/Reminder';
import {
  Text,
  SectionList,
  Pressable,
  View,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { RemindersContext } from '../components/RemindersProvider';

interface ReminderScreenProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}

export default function RemindersScreen(props: ReminderScreenProps) {
  const { reminders, deleteReminder, setEditingReminder } =
    useContext(RemindersContext);
  const { width: windowWidth } = useWindowDimensions();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalReminder, setModalReminder] = useState<ReminderProps>(null);

  const createPressHandler = useCallback(
    (reminder: ReminderProps) => () => {
      setEditingReminder(reminder);
      props.navigation.navigate('Reminder');
    },
    [setEditingReminder, props.navigation]
  );

  const createLongPressHandler = useCallback(
    (reminder: ReminderProps) => () => {
      setModalReminder(reminder);
      setModalIsVisible(true);
    },
    []
  );

  const sections: { [key: string]: ReminderProps[] } = {
    'Top 3 today': [],
    Today: [],
    'Next 7 days': [],
    Later: [],
  };

  const now = getToday();

  // const numCompletedToday = reminders.filter(
  //   (reminder) => reminder.lastCompletion === now.toISODate()
  // ).length;

  const remindersSortFunction = (
    reminderA: ReminderProps,
    reminderB: ReminderProps
  ) =>
    getDueDate(reminderA)
      .diff(now)
      .minus(getDueDate(reminderB).diff(now))
      .as('days');

  const sortedReminders = reminders.sort(remindersSortFunction);

  sortedReminders.forEach((reminder) => {
    const daysFromDueDate = getDueDate(reminder).diff(now).as('days');

    if (daysFromDueDate <= 0) sections['Today'].push(reminder);
    else if (daysFromDueDate <= 7) sections['Next 7 days'].push(reminder);
    else sections['Later'].push(reminder);
  });

  if (sections['Today'].length > 3) {
    sections['Top 3 today'] = sections['Today'].slice(0, 3);
    sections['Today'] = sections['Today'].slice(3);
  }

  const sectionObjects = Object.entries(sections).map((entry) => ({
    title: entry[0],
    data: entry[1],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <Pressable
        onPress={() => props.navigation.navigate('Add new reminder')}
        android_ripple={{ color: 'black' }}
        style={{
          flex: 1,
          flexDirection: 'row',
          height: '20%',
          backgroundColor: 'lightblue',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: 'black', marginRight: 10 }}
        />
        <Text style={{ color: 'black', fontSize: 16 }}>Add new reminder</Text>
      </Pressable>
      <SectionList
        sections={sectionObjects}
        renderSectionHeader={({ section }) =>
          section.data.length > 0 ? (
            <Text style={{ color: 'lightslategray', margin: 5 }}>
              {section.title}
            </Text>
          ) : null
        }
        renderItem={({ item: reminder }) => (
          <ReminderComponent
            {...reminder}
            key={reminder.id}
            onPress={createPressHandler(reminder)}
            onLongPress={createLongPressHandler(reminder)}
          />
        )}
        style={{ height: '80%' }}
      />
      {modalReminder && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalIsVisible}
          onRequestClose={() => {
            setModalIsVisible(false);
          }}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 15,
              width: windowWidth - 20,
              margin: 10,
              padding: 15,
              backgroundColor: 'silver',
              borderRadius: 15,
            }}
          >
            <Text style={{ fontSize: 24, marginBottom: 30 }}>
              Delete reminder{' '}
              <Text style={{ fontWeight: 'bold' }}>{modalReminder.title}</Text>?
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <Pressable
                onPress={() => setModalIsVisible(false)}
                android_ripple={{ color: 'silver' }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    width: 0.35 * windowWidth,
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: 'lightblue',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  deleteReminder(modalReminder.id);
                  setModalIsVisible(false);
                }}
                android_ripple={{ color: 'silver' }}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    width: 0.35 * windowWidth,
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: 'red',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
