import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { Provider } from 'react-redux'

import { store } from '@/store'

export default function RootLayout() {
  return (
   <Provider store={store}>
     <Stack>
      <Stack.Screen name="index" />
    </Stack>
   </Provider>
  );
}
