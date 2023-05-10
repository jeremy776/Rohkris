import { IconRegistry, useTheme } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import {
  EvaIconsPack
} from '@ui-kitten/eva-icons';
import { ApplicationProvider } from '@ui-kitten/components/theme';
import * as eva from '@eva-design/eva';
import Navigation from './src/navigation/index';
import { auth } from './utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import * as SplashScreen from 'expo-splash-screen';

import { UserContext } from './utils/hooks/context';
import NoConnectionInfo from './src/components/noConnectionInfo';
SplashScreen.preventAutoHideAsync();
export default function App() {
  let [isLogged, setIsLogged] = React.useState<any>(null);
  const [user, setUser] = React.useState<any>(null);
  let [isConnectedInternet, setInternetConnection] = React.useState<Boolean>(false);
  let [isLoading, setIsLoading] = React.useState<any>(true);

  useEffect(() => {
    (async () => {
      const credentials = await AsyncStorage.getItem('credentials');
      if (credentials) {
        const { email, password } = JSON.parse(credentials);
        signInWithEmailAndPassword(auth, email, password).then(async (userCredential: any) => {
          setIsLogged(true);
          setUser(userCredential.user);
          setIsLoading(false);
        }).catch((error: any) => {
          setIsLogged(false);
        });
      } else {
        setIsLogged(false);
        setIsLoading(false);
      }
    })();
  }, []);


  useEffect(() => {
    let eventNet = NetInfo.addEventListener((state: any) => {
      setInternetConnection(state.isConnected);
    });

    return () => eventNet();
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const theme = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBar style='dark' animated={true} translucent />
      <IconRegistry icons={EvaIconsPack} />
      <UserContext.Provider value={{ user, setUser: (x) => setUser(x) }}>
        <ApplicationProvider {...eva} theme={{ ...eva.light }}>
          <NoConnectionInfo hasInternet={isConnectedInternet} />
          <Navigation isLoading={isLoading} isLoggedIn={isLogged} />
        </ApplicationProvider>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
}
