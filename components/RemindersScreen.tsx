import ReminderComponent, { ReminderProps } from './Reminder';
import {
  Text,
  FlatList,
  Pressable,
  View,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useContext, useState } from 'react';
import { RemindersContext } from './RemindersProvider';

interface ReminderScreenProps {
  navigation: any;
}

export default function RemindersScreen(props: ReminderScreenProps) {
  const { reminders, deleteReminder } = useContext(RemindersContext);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalReminder, setModalReminder] = useState<ReminderProps>(null);

  const createLongPressHandler = useCallback(
    (reminder: ReminderProps) => () => {
      setModalReminder(reminder);
      setModalIsVisible(true);
    },
    []
  );

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
      <FlatList
        data={reminders}
        renderItem={({ item: reminder }) => (
          <ReminderComponent
            {...reminder}
            key={reminder.id}
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
              Delete reminder for task '{modalReminder.title}'?
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
