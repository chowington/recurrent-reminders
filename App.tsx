import { View, Text, StatusBar, InteractionManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RemindersScreen from './screens/RemindersScreen';
import NewReminderScreen from './screens/NewReminderScreen';
import UpdateReminderScreen from './screens/UpdateReminderScreen';
import RemindersProvider from './components/RemindersProvider';
import { setUpNotifications } from './utils/notifications';
import { registerTranslation, en } from 'react-native-paper-dates';
import { Provider as PaperProvider } from 'react-native-paper';
// import {
//   hasMigratedFromAsyncStorage,
//   migrateFromAsyncStorage,
// } from './utils/storage';
// import { useEffect, useState } from 'react';

setUpNotifications();
registerTranslation('en', en);
const Stack = createNativeStackNavigator();

export default function App() {
  // // TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
  // const [hasMigrated, setHasMigrated] = useState(hasMigratedFromAsyncStorage);

  // useEffect(() => {
  //   if (!hasMigratedFromAsyncStorage) {
  //     InteractionManager.runAfterInteractions(async () => {
  //       try {
  //         await migrateFromAsyncStorage();
  //         setHasMigrated(true);
  //       } catch (e) {
  //         // TODO: fall back to AsyncStorage? Wipe storage clean and use MMKV? Crash app?
  //       }
  //     });
  //   }
  // }, []);

  // if (!hasMigrated) {
  //   // show loading indicator while app is migrating storage...
  //   return (
  //     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //       {/* <ActivityIndicator color="black" /> */}
  //       <Text>Migrating storage...</Text>
  //     </View>
  //   );
  // }

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
              <Stack.Screen name='Reminder' component={UpdateReminderScreen} />
              <Stack.Screen
                name='Add new reminder'
                component={NewReminderScreen}
              />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </RemindersProvider>
    </PaperProvider>
  );
}
