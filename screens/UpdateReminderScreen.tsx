import { useContext } from 'react';
import ReminderForm from '../components/ReminderForm';
import { RemindersContext } from '../components/RemindersProvider';

export default function UpdateReminderScreen({
  navigation,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}) {
  const { editingReminder } = useContext(RemindersContext);
  return <ReminderForm reminder={editingReminder} navigation={navigation} />;
}
