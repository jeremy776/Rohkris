import {
  Avatar,
  useTheme,
  Text,
  Icon,
  List,
  ListItem
} from "@ui-kitten/components";
import {
  useEffect,
  useState,
  useContext
} from "react";
import { auth } from "../../utils/firebaseConfig";
import {
  ToastAndroid,
  ScrollView,
  RefreshControl,
  View,
  Alert
} from "react-native";
import { UserContext } from "../../utils/hooks/context";
import * as NavigationBar from 'expo-navigation-bar';
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, sendEmailVerification, signOut } from "firebase/auth";

export default function SettingScreen({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [dataLink] = useState<any>([
    {
      id: 1,
      title: 'Edit Profile',
      icon: 'person-outline',
      href: 'EditProfile',
      description: 'Change name, profile picture, etc'
    },
    {
      id: 2,
      title: 'Change Password',
      icon: 'lock-outline',
      href: 'ChangePassword',
      description: 'Change your password'
    },
    // syarat dan ketentuan
    {
      id: 3,
      title: 'Terms & Conditions',
      icon: 'file-text-outline',
      href: 'TermsAndConditions',
      description: 'Read our terms and conditions'
    },
    {
      id: 4,
      title: 'App Info',
      icon: 'info-outline',
      // description: 'Version, developer, etc'
    }
  ])
  const [showVerifmsg, setVerifmsg] = useState<Boolean>(false);
  const userData = useContext(UserContext) as any;

  useEffect(() => {
    if (!userData.user.emailVerified) {
      setVerifmsg(true);
    } else {
      setVerifmsg(false);
    }
  }, []);
  useEffect(() => {
    setUser(userData.user);
  }, []);

  function handleKirimVerifikasi() {
    const a = auth.currentUser as User;
    sendEmailVerification(a).then(() => {
      ToastAndroid.show('Silahkan cek email kamu, untuk melanjutkan verifikasi', ToastAndroid.LONG);
      setVerifmsg(false);
    });
  }

  const theme = useTheme();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setUser(userData.user)
            setTimeout(() => {
              setRefreshing(false);
            }, 2000)
          }}
        />
      }
      contentContainerStyle={{
        flexGrow: 1
      }} style={{
        flex: 1,
        backgroundColor: theme['color-basic-100']
      }}>
      <View style={{
        padding: 20,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
      }}>
        <View style={{
          backgroundColor: theme['color-primary-600'],
          height: 50,
          width: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: theme['color-primary-100'],
            fontWeight: 'bold',
            fontSize: 20
          }}>
            {user ? user.displayName[0] : 'L'}
          </Text>
        </View>
        <View style={{
          backgroundColor: 'transparent'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6
          }}>
            <Text category="h6" style={{
              color: theme['color-baic-700']
            }}>{user ? user.displayName : 'Loading..'}</Text>
            <Text onPress={() => {
              ToastAndroid.show(user && user.emailVerified ? 'Email terverifikasi' : 'Email tidak terverifikasi', ToastAndroid.SHORT);
            }} category="c2" style={{
              color: user && user.emailVerified ? theme['color-success-900'] : theme['color-danger-100'],
              backgroundColor: user && user.emailVerified ? theme['color-success-200'] : theme['color-danger-700'],
              paddingHorizontal: 8,
              borderRadius: 5
            }}>{user && user.emailVerified ? 'Verified' : 'Not verified'}</Text>
          </View>
          <Text style={{
            color: theme['color-basic-600']
          }}>{user ? user.email : '....'}</Text>
        </View>
      </View>
      {showVerifmsg ? (
        <TouchableOpacity activeOpacity={0.7} onPress={() => {
          Alert.alert(
            'Pemberitahuan',
            'Kami akan mengirimkan sebuah email, ke alamat email pada akun ini',
            [
              {
                text: 'cancel',
                style: 'cancel'
              },
              {
                text: 'Kirim',
                onPress: handleKirimVerifikasi,
                style: 'destructive'
              }
            ],
          )
        }}>
          <View style={{
            backgroundColor: theme['color-success-500'],
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 8,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            margin: 10
          }}>
            <View style={{
              flex: 1
            }}>
              <Text category="p1" style={{
                fontWeight: 'bold',
                color: 'white'
              }}>Pemberitahuan</Text>
              <Text category="p2" style={{
                color: theme['color-basic-200']
              }}>Email kamu belum terverifikasi nih! verifikasi sekarang yuk</Text>
            </View>
            <View>
              <Icon fill='white' name="arrow-ios-forward-outline" style={{
                width: 25,
                height: 25
              }} />
            </View>
          </View>
        </TouchableOpacity>
      ) : ('')}
      <View>
        <List
          data={dataLink}
          contentContainerStyle={{
            marginTop: 2,
            marginBottom: 3,
            backgroundColor: theme['color-basic-200'],
            gap: 1
          }}
          renderItem={({ item }) => (
            <ListItem
              style={{
                // backgroundColor: theme['color-basic-200'],
                marginTop: 2,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
              title={() => <Text style={{
                color: theme['color-basic-700'],
                fontFamily: 'System',
                fontSize: 17,
                fontWeight: 'bold',
                marginHorizontal: 25,
              }}>{item.title}</Text>}
              onPress={() => {
                item.href ? navigation.navigate(item.href) : null;
              }}
              accessoryRight={(props) => {
                return (
                  <View style={{
                    backgroundColor: theme['color-basic-200'],
                    borderRadius: 50,
                    padding: 5
                  }}>
                    <Icon name="arrow-ios-forward-outline" style={{ width: 25, height: 25 }} fill={theme['color-basic-600']} />
                  </View>
                )
              }}
              accessoryLeft={(props) => {
                return (
                  <View style={{
                    backgroundColor: theme['color-primary-100'],
                    borderRadius: 50,
                    padding: 7
                  }}>
                    <Icon name={item.icon} style={{ width: 25, height: 25 }} fill={theme['color-primary-400']} />
                  </View>
                )
              }}
            />
          )}
        />
        <View>
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Pemberitahuan',
              'Apakah kamu yakin ingin keluar?',
              [
                {
                  text: 'cancel',
                  style: 'cancel'
                },
                {
                  text: 'Keluar',
                  onPress: () => {
                    signOut(auth).then(async () => {
                      await AsyncStorage.setItem('credentials', JSON.stringify(null)).then(() => {
                        console.log('user data deleted');
                        NavigationBar.setButtonStyleAsync("light");
                        NavigationBar.setBackgroundColorAsync(theme['color-info-300']);
                      })
                    })
                  },
                  style: 'destructive'
                }
              ],
            )
          }}>
            <View style={{
              paddingHorizontal: 11,
              backgroundColor: theme['color-basic-100'],
              paddingVertical: 10,
              marginTop: 4,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{
                  backgroundColor: theme['color-danger-100'],
                  borderRadius: 50,
                  padding: 5
                }}>
                  <Icon fill={theme['color-danger-500']} name="log-out-outline" style={{
                    width: 25,
                    height: 25,
                  }} />
                </View>
                <View>
                  <Text category="p1" style={{
                    color: theme['color-danger-500'],
                    fontFamily: 'System',
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginHorizontal: 28,
                  }}>Keluar</Text>
                </View>
              </View>
              <View style={{
                backgroundColor: theme['color-danger-100'],
                borderRadius: 50,
                padding: 5
              }}>
                <Icon fill={theme['color-danger-500']} name="arrow-ios-forward-outline" style={{
                  width: 25,
                  height: 25
                }} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
