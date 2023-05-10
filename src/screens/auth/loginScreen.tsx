import { Layout, Text, useTheme, Icon, Button, Spinner, TopNavigation, TopNavigationAction, Input } from '@ui-kitten/components';
import { useEffect } from 'react';
import * as NavigationBar from "expo-navigation-bar";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import { app, auth } from '../../../utils/firebaseConfig';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const [secureText, setSecureText] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmErr] = React.useState('');
  const [passwordError, setPassErr] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);


  function handleLogin() {
    setLoading(true);
    setEmErr('');
    setPassErr('');

    if (email.length === 0) {
      setLoading(false);
      setEmErr('Pastikan email diisi dengan benar');
      return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      setEmErr('Email yang kamu berikan tidak valid');
      return;
    }

    if (password.length === 0) {
      setLoading(false);
      setPassErr('Pastikan password diisi dengan benar');
      return;
    }

    //signInWithEmailAndPassword(auth, email, password).then(async(userCredential) => {
    signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;
      await AsyncStorage.setItem('credentials', JSON.stringify({
        email: email,
        password: password,
      }));
      NavigationBar.setButtonStyleAsync("dark");
      NavigationBar.setBackgroundColorAsync(theme['color-basic-100']);
      setLoading(false);
      // navigation.replace('MainScreen');

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorCode === 'auth/user-not-found') {
        setEmErr('Email ini tidak terdaftar');
      } else if (errorCode === 'auth/wrong-password') {
        setPassErr('Password yang kamu berikan salah');
      }
      setLoading(false);
    });
  }
  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 1,
    }}>
      <Layout style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme['color-info-100'],
      }}>
        <Layout style={{
          flex: 2,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <Image
            style={{
              width: 260,
              height: 260,
              backgroundColor: theme['color-info-transparent-100'],
              borderRadius: 290,
              marginBottom: 40
            }}
            source={
              require('../../../assets/login.png')
            } />
        </Layout>
        <Layout style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme['color-info-300'],
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          gap: 10,
          paddingHorizontal: 20,
          paddingVertical: 40
        }}>
          <View>
            <Input
              placeholder='Masukan email kamu'
              size='large'
              style={{
                borderRadius: 8,
                borderWidth: 2,
                borderColor: emailError.length > 0 ? theme['color-danger-500'] : theme['color-basic-200']
              }}
              status={emailError.length > 0 ? 'danger' : 'basic'}
              caption={emailError}
              onChangeText={
                (nextValue) => setEmail(nextValue)
              }
              label={(_p) => {
                console.log(_p)
                return (
                  <Text {..._p} style={{
                    color: theme['color-basic-200'],
                    "fontFamily": "System",
                    "fontSize": 14,
                    "fontWeight": "800",
                    "marginBottom": 4,
                  }}>Email</Text>
                )
              }}
              accessoryLeft={(props: any) => <Icon fill='rgba(0,0,0,0.5)' style={{ width: 20, height: 20 }} name='email-outline' />}
            />
          </View>
          <View>
            <Input
              placeholder='Masukan password kamu'
              size='large'
              status={passwordError.length > 0 ? 'danger' : 'basic'}
              caption={passwordError}
              style={{
                borderRadius: 8,
                borderWidth: 2,
                borderColor: passwordError.length > 0 ? theme['color-danger-500'] : theme['color-basic-200']
              }}
              onChangeText={
                (nextValue) => setPassword(nextValue)
              }
              secureTextEntry={secureText}
              label={(_p) => {
                console.log(_p)
                return (
                  <Text {..._p} style={{
                    color: theme['color-basic-200'],
                    "fontFamily": "System",
                    "fontSize": 14,
                    "fontWeight": "800",
                    "marginBottom": 4,
                  }}>Password</Text>
                )
              }}
              accessoryLeft={(props: any) => <Icon fill='rgba(0,0,0,0.5)' style={{ width: 20, height: 20 }} name='lock-outline' />}
              accessoryRight={(props: any) => (
                <TouchableWithoutFeedback onPress={() => setSecureText(!secureText)}>
                  <Icon fill='rgba(0,0,0,0.5)' style={{ width: 20, height: 20 }} name={secureText ? 'eye-off-outline' : 'eye-outline'} />
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </Layout>
        <Layout style={{
          backgroundColor: theme['color-info-300'],
          paddingHorizontal: 20,
          paddingVertical: 10
        }}>
          <Button
            style={{
              borderRadius: 8,
            }}
            disabled={loading}
            onPress={handleLogin}
          >{loading ? "Loading..." : "Login"}</Button>
        </Layout>
      </Layout>
    </ScrollView>
  )
}
