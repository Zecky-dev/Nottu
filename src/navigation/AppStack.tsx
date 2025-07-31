import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';

import { Home } from '@screens/App';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppStack;
