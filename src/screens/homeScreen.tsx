import { Card, Icon, Layout, Spinner, Text, useTheme } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { useEffect, useContext, useState } from "react";
import { ScrollView, RefreshControl, FlatList, Dimensions, ToastAndroid, View, Image, LogBox } from "react-native";
import { auth } from "../../utils/firebaseConfig";
import {
  getEvent
} from '../api/database/event';
import { UserContext } from "../../utils/hooks/context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loading from "../components/loading";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const backendRenunganList = "BACKEND RENUNGAN HARI INI";
  const [event, setEvent] = useState<any>(0);
  const [renunganToday, setRenunganToday] = useState<any>(undefined);
  const [refresing, setRefresing] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      let y = await getEvent();
      setEvent(y);
    })();
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    (async () => {
      fetch(backendRenunganList).then((res) => res.json()).then((res) => {
        setRenunganToday(res);
      });
    })();
  }, []);
  const theme = useTheme();
  const userData = useContext(UserContext) as any;
  useEffect(() => {
    setUser(userData.user);
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresing}
          onRefresh={() => {
            setRefresing(true);
            (async () => {
              fetch(backendRenunganList).then((res) => res.json()).then((res) => {
                setRenunganToday(res);
              });
            })();
            setUser(userData.user);
            setTimeout(() => {
              setRefresing(false);
            }, 2000)
          }}
        />
      }
      contentContainerStyle={{
        flexGrow: 1
      }} style={{
        flex: 1,
      }}>
      <Layout level="2" style={{
        flex: 1,
        backgroundColor: theme['color-basic-200'],
        paddingHorizontal: 15
      }}>
        <View style={{
          marginTop: 20,
        }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: theme['color-success-500']
            }}>Hello,</Text>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 20,
            }}>{' '} {user ? user.displayName : ''}</Text>
          </View>

          <View>
            <Text style={{
              fontSize: 13,
              color: theme['color-basic-800']
            }}>Selamat datang di Rohani Kristen SMAN 14 Bandar Lampung</Text>
          </View>

          <View style={{
            marginTop: 20,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme['color-basic-800']
            }}>Renungan hari ini</Text>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
              navigation.navigate('RenunganHarian');
            }}>
              <LinearGradient
                start={[1, 0]}
                end={[0, 0]}
                colors={[
                  theme['color-basic-100'],
                  theme['color-basic-100'],
                ]} style={{
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  borderRadius: 8,
                  marginTop: 10,

                }}>
                <View>
                  {renunganToday ? (
                    <>
                      <Text style={{
                        color: theme['color-basic-800'],
                        textAlign: 'center',
                        letterSpacing: 0.20,
                      }}>{renunganToday.passage}</Text>
                      <Text style={{
                        marginTop: 5,
                        fontSize: 12,
                        textAlign: 'right',
                        color: theme['color-basic-700']
                      }}>{renunganToday.ayat}</Text>
                      <Text style={{
                        marginTop: 15,
                        color: theme['color-basic-600'],
                        fontSize: 12,
                      }}>Baca selengkapnya</Text>
                    </>
                  ) : (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Loading />
                    </View>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
        }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: theme['color-basic-800'],
            marginTop: 20,
            paddingVertical: 5
          }}>Upcoming Events</Text>
          <FlatList
            data={event}
            horizontal
            inverted
            contentContainerStyle={{
              justifyContent: 'center',
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{
                width: Dimensions.get('window').width - 50,
                marginHorizontal: 5,
                borderWidth: 0,
              }}>
                <Image source={{ uri: item.banner }} style={{
                  flex: 1,
                  width: '100%',
                  height: 150,
                  borderRadius: 12,
                  resizeMode: 'contain'
                }} />
                <LinearGradient start={{
                  x: 0,
                  y: 1
                }} end={{
                  x: 0,
                  y: 0
                }} style={{
                  position: 'absolute',
                  borderRadius: 12,
                  bottom: 0,
                  left: 0,
                  height: 150,
                  width: '100%',
                }} colors={['rgba(0,0,0,0.9)', 'transparent']}>
                  <View style={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 10,
                  }}>
                    <Text style={{
                      zIndex: 1,
                      fontWeight: 'bold',
                      color: theme['color-basic-100'],
                    }}>{item.nama}</Text>
                    <Text style={{
                      fontSize: 12,
                      color: theme['color-info-200'],
                    }}>{item.tema}</Text>
                    <View style={{
                      marginTop: 5,
                      paddingHorizontal: 10,
                      alignSelf: 'flex-start',
                      borderRadius: 6,
                      backgroundColor: isEventDone(item.tanggal) ? theme['color-danger-200'] : theme['color-primary-200'],
                    }}>
                      <Text style={{
                        fontSize: 11,
                        color: isEventDone(item.tanggal) ? theme['color-danger-700'] : theme['color-primary-700'],
                      }}>{convertToDate(item.tanggal)}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            )}
          />
        </View>

        <View style={{
          padding: 10
        }}>
        </View>
      </Layout>
    </ScrollView >
  )
}

function isEventDone(timestamp: any) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  if (year < todayYear) {
    return true;
  } else if (year === todayYear) {
    if (month < todayMonth) {
      return true;
    } else if (month === todayMonth) {
      if (day < todayDay) {
        return true;
      }
    }
  }
}

function convertToDate(timestamp: any) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let monthList = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  return `${day} ${monthList[month - 1]} ${year}`;
}
