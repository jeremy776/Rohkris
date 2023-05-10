import {
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  useTheme,
  Input,
  Button
} from '@ui-kitten/components';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, View } from 'react-native';
import { User, updatePassword } from 'firebase/auth';
import { auth } from '../../../utils/firebaseConfig';

export default function ChangePasswordScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  let [currentPass, setCurrentPass] = useState<string>('');
  let [passError, setPassError] = useState<string>('');
  let [newPass, setNewPass] = useState<string>('');
  let [newPassError, setNewPassError] = useState<string>('');
  let [confirmPass, setConfirmPass] = useState<string>('');
  let [confirmPassError, setConfirmPassError] = useState<string>('');

  async function handleChangePass() {
    setNewPassError('');
    setConfirmPassError('');
    setPassError('');

    if (newPass === '') {
      return setNewPassError('Password baru tidak boleh kosong');
    } else if (newPass.length <= 7) {
      return setNewPassError('Minimal password harus memiliki 8 karakter');
    }

    if (confirmPass !== newPass) {
      return setConfirmPassError('Password tidak valid');
    }

    const credentials = await AsyncStorage.getItem('credentials');
    if (credentials) {
      let { email, password } = JSON.parse(credentials);
      if (currentPass !== password) {
        return setPassError('Password tidak valid');
      }

      updatePassword(auth.currentUser as User, newPass).then(async() => {
        await AsyncStorage.setItem('credentials', JSON.stringify({
          email,
          password: newPass
        }));
        navigation.goBack();
        ToastAndroid.show('Password berhasil diganti', ToastAndroid.LONG);
      }).catch(() => {

      });
    }
  }
  return (
    <View style={{
      backgroundColor: theme['color-basic-200'],
      flex: 1
    }}>
      <View style={{
        paddingTop: 25,
        backgroundColor: theme['color-basic-100']
      }}>
        <TopNavigation
          title={() => {
            return <Text category='h6' style={{
              color: 'black'
            }}>Change Password</Text>
          }}
          alignment="center"
          style={{
            backgroundColor: 'transparent'
          }}
          accessoryLeft={() => (
            <TopNavigationAction
              icon={(props) => (
                <Icon
                  style={{
                    width: 25,
                    height: 25
                  }}
                  fill="black"
                  name="arrow-back-outline"
                />
              )}
              onPress={() => navigation.goBack()}
            />
          )}
        />
      </View>
      <View style={{
        padding: 20,
        gap: 20
      }}>
        <Input
          onChangeText={(e) => setCurrentPass(e)}
          label={'Current Password'}
          status={passError.length > 0 ? 'danger' : 'basic'}
          caption={passError}
          value={currentPass}
          secureTextEntry={true}
          style={{
            backgroundColor: theme['color-basic-100'],
          }}
          placeholder='Your current password'
        />
        <Input
          value={newPass}
          onChangeText={(e) => setNewPass(e)}
          status={newPassError.length > 0 ? 'danger' : 'basic'}
          caption={newPassError}
          label={'New Password'}
          style={{
            backgroundColor: theme['color-basic-100'],
          }}
          secureTextEntry={true}
          placeholder='Set new password'
        />
        <Input
          onChangeText={(e) => setConfirmPass(e)}
          label={'Confirm Password'}
          value={confirmPass}
          style={{
            backgroundColor: theme['color-basic-100'],
          }}
          secureTextEntry={true}
          status={confirmPassError.length > 0 ? 'danger' : 'basic'}
          caption={confirmPassError}
          placeholder='Confirm new password'
        />
        <View style={{
          flexDirection: 'row',
          gap: 10
        }}>
          <Button onPress={() => navigation.goBack()} appearance='ghost'>Cancel</Button>
          <Button onPress={handleChangePass}>Save</Button>
        </View>
      </View>
    </View>
  )
}
