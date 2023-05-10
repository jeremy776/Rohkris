import {
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  useTheme,
  Input,
  Button,
} from '@ui-kitten/components';
import { View } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import {
  updateProfile,
  updateEmail
} from 'firebase/auth';
import { UserContext } from '../../../utils/hooks/context';
import { auth } from '../../../utils/firebaseConfig';

export default function EditProfile({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const userData = useContext(UserContext) as any;
  const [buttoneLoading, setButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    setUser(auth.currentUser);
    setName(auth.currentUser?.displayName || '');
    setEmail(auth.currentUser?.email || '');
    console.log(userData)
  }, []);

  function handleEditProfile() {
    setButtonLoading(true);
    if (name !== '') {
      updateProfile(user, {
        displayName: name
      }).then((nd) => {
        console.log('success');
        userData.setUser(user);
      }).catch((error: any) => {
        console.log(error);
      })
    }

    setTimeout(() => {
      setButtonLoading(false);
      navigation.goBack();
    }, 2000)
  }

  return (
    <>
      <View style={{
        paddingTop: 25,
        backgroundColor: theme['color-basic-100']
      }}>
        <TopNavigation
          title={() => {
            return <Text category='h6' style={{
              color: 'black'
            }}>Edit Profil</Text>
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
        flex: 1,
        padding: 20,
        backgroundColor: theme['color-basic-200']
      }}>
        <View style={{
          marginBottom: 20
        }}>
          <Input
            label="Nama"
            style={{
              backgroundColor: theme['color-basic-100'],
            }}
            placeholder="Masukkan nama"
            value={user ? name : 'Loading..'}
            onChangeText={(value) => {
              setName(value);
            }}
          />
        </View>
        <View>
          <Button disabled={buttoneLoading} onPress={() => {
            handleEditProfile()
          }}>
            Simpan
          </Button>
        </View>
      </View>
    </>
  )
}
