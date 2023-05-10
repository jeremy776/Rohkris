import {
  Layout, Text, Icon, TopNavigation, TopNavigationAction, useTheme,
  Input,
  Button
} from "@ui-kitten/components";
import React from "react";
import { auth } from "../../../utils/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ScrollView, TouchableWithoutFeedback, View, Image } from "react-native";

export default function RegisterScreen({ navigation }: {
  navigation: any
}) {
  const theme = useTheme();

  // use state - secure text
  const [secureText, setSecureText] = React.useState(true);
  const [secureConfirmText, setSecureConfirmText] = React.useState(true);

  // use state - button loading
  const [loading, setLoading] = React.useState(false);

  // use state - to fill the value
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // use state - error message
  const [emailError, setEmailError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

  function handleRegister() {
    setLoading(true);
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // jika username kosong
    if (username.length === 0) {
      setLoading(false);
      setUsernameError('Pastikan nama diisi dengan benar');
      return;
    }

    // jika email kosong
    if (email.length === 0) {
      setLoading(false);
      setEmailError('Pastikan email diisi dengan benar');
      return;
    }
    // validasi email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      setEmailError('Email yang kamu berikan tidak valid');
      return;
    }

    // jika password kosong
    if (password.length === 0) {
      setLoading(false);
      setPasswordError('Pastikan password diisi dengan benar');
      return;
    }

    // jika password dibawah 6 karakter
    if (password.length < 6) {
      setLoading(false);
      setPasswordError('Password minimal 6 karakter');
      return;
    }

    // jika konfirm password tidak sama dengan password
    if (confirmPassword !== password) {
      setLoading(false);
      setConfirmPasswordError('Konfirmasi password tidak sama dengan password');
      return;
    }

    // create account
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      updateProfile(user, {
        displayName: username
      }).then(() => {
        // Update successful
      }).catch((error) => {
        // An error occurred
      });
      // console.log(user)
      // ...
      setLoading(false);
      navigation.navigate('Login');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      setLoading(false);
      console.log(errorCode, errorMessage);

      if (errorCode === 'auth/email-already-in-use') {
        setEmailError('Email sudah digunakan');
        return;
      }
    });
  }
  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 1
    }}>
      <Layout style={{
        flex: 1,
        backgroundColor: theme['color-info-100'],
        justifyContent: 'center',
      }}>
        <Layout style={{
          flex: 2,
          backgroundColor: 'transparent',
          alignItems: 'center',
          marginTop: 50,
          justifyContent: 'flex-end',
        }}>
          <Image
            style={{
              width: 150,
              height: 150,
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
          justifyContent: 'flex-start',
          backgroundColor: theme['color-info-300'],
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          gap: 10,
          paddingHorizontal: 20,
          paddingVertical: 40
        }}>
          <View>
            <Input
              placeholder='Masukan nama kamu'
              size='large'
              style={{
                borderRadius: 8,
                borderWidth: 2,
                borderColor: usernameError.length > 0 ? theme['color-danger-500'] : theme['color-basic-200']
              }}
              status={usernameError.length > 0 ? 'danger' : 'basic'}
              caption={usernameError}
              onChangeText={
                (nextValue) => setUsername(nextValue)
              }
              label={(_p) => {
                return (
                  <Text {..._p} style={{
                    color: theme['color-basic-200'],
                    "fontFamily": "System",
                    "fontSize": 14,
                    "fontWeight": "800",
                    "marginBottom": 4,
                  }}>Nama</Text>
                )
              }}
              accessoryLeft={(props: any) => <Icon fill='rgba(0,0,0,0.5)' style={{ width: 20, height: 20 }} name='person' />}
            />
          </View>

          <View>
            <Input
              placeholder='jhondoe@gmail.com'
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
          <View>
            <Input
              placeholder='Konfirmasi password kamu'
              size='large'
              status={confirmPasswordError.length > 0 ? 'danger' : 'basic'}
              caption={confirmPasswordError}
              style={{
                borderRadius: 8,
                borderWidth: 2,
                borderColor: confirmPasswordError.length > 0 ? theme['color-danger-500'] : theme['color-basic-200']
              }}
              onChangeText={
                (nextValue) => setConfirmPassword(nextValue)
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
                  }}>Konfirmasi Password</Text>
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
            onPress={handleRegister}
          >{loading ? "Loading..." : "Buat akun"}</Button>
        </Layout>
      </Layout>
    </ScrollView>
  )
}
