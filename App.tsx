import { View, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RemindersScreen from './components/RemindersScreen';
import AddNewReminderScreen from './components/NewReminderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={{flex: 1, backgroundColor: 'black', padding: 20}}>
        <StatusBar backgroundColor='black' />
        <Stack.Navigator initialRouteName='Reminders' screenOptions={{headerStyle: {backgroundColor: 'black'}, headerTintColor: 'white'}}>
          <Stack.Screen name='Reminders' component={RemindersScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Add new reminder' component={AddNewReminderScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
