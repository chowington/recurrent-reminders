import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RemindersScreen from './components/RemindersScreen';
import AddNewReminderScreen from './components/NewReminderScreen';
import RemindersProvider from './components/RemindersProvider';
import { setUpNotifications } from './utils/notifications';
import { registerTranslation, en } from 'react-native-paper-dates';
import { Provider as PaperProvider } from 'react-native-paper';

setUpNotifications();
const Stack = createNativeStackNavigator();
registerTranslation('en', en);

export default function App() {
  return (
    <PaperProvider>
      <RemindersProvider>
        <NavigationContainer>
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar backgroundColor='black' />
            <Stack.Navigator
              initialRouteName='Reminders'
              screenOptions={{
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: 'white',
              }}
            >
              <Stack.Screen
                name='Reminders'
                component={RemindersScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='Add new reminder'
                component={AddNewReminderScreen}
              />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </RemindersProvider>
    </PaperProvider>
  );
}
