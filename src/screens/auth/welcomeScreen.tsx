import { Layout, Text, useTheme, Button, Icon } from '@ui-kitten/components';
import { useEffect } from 'react';
import * as NavigationBar from "expo-navigation-bar";
import { Image, View } from 'react-native';

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  useEffect(() => {
    NavigationBar.setButtonStyleAsync("light");
    NavigationBar.setBackgroundColorAsync(theme['color-info-300']);
  }, []);
  return (
    <Layout style={{
      backgroundColor: theme['color-info-100'],
      flex: 1,
    }}>
      <Layout style={{
        flex: 2,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          paddingLeft: 20,
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: theme['color-info-400'],
            textAlign: 'left'
          }}>Rohani Kristen</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme['color-info-400'],
            textAlign: 'left'
          }}>Nama Sekolah</Text>
        </View>
        <Image
          style={{
            width: '100%',
            height: 180,
            borderRadius: 10,
          }}
          source={
            require('../../../assets/welcome.png')
          } />
      </Layout>
      <Layout style={{
        backgroundColor: theme['color-info-300'],
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        width: '100%',
        padding: 20
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'white',
        }}>Selamat Datang</Text>
        <Text style={{
          fontSize: 17,
          color: theme['color-basic-300'],
        }}>Silahkan login atau register untuk melanjutkan</Text>

        <View style={{
          flex: 1,
          gap: 10,
          justifyContent: 'flex-end',
        }}>
          <Button onPress={() => {
            navigation.navigate('Login');
          }} style={{
            borderRadius: 8,
          }}>Login</Button>
          <Button status='control' onPress={() => {
            navigation.navigate('Register');
          }} appearance='ghost' style={{
            borderRadius: 8,
          }}>Register</Button>
        </View>
      </Layout>
    </Layout>
  )
}
