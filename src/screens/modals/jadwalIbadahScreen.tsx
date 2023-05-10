import { Layout, List, ListItem, TopNavigation, TopNavigationAction, Icon, Text, useTheme, Divider, Spinner } from "@ui-kitten/components";
import { ScrollView, View, LogBox, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import { getIbadah } from "../../api/database/jadwal-ibadah";
import Loading from "../../components/loading";
import CardJadwalRenungan from "../../components/cardJadwalRenungan";

export default function JadwalIbadah({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const [dataRenungan1, setDataRenungan1] = useState<any>('loading');

  let daftarHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  let [renunganHariIni, setRenunganHariIni] = useState<any>('loading');
  let [time, setTime] = useState<any>('');
  let date = new Date();
  let hariIni = daftarHari[date.getDay() - 1];
  let [waktu, setWaktu] = useState<string>('');

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    (async () => {
      let dt = new Date();
      dt.setDate(1);
      let firstDay = dt.getDay() + 1;
      let week = Math.ceil((dt.getDate() + firstDay) / 7);

      let data = await getIbadah({ mingguke: week });
      setDataRenungan1(data);

      let jam = date.getHours();
      setTime(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      if (jam < 9) {
        setWaktu('Ibadah Pagi');
      } else if (jam > 9) {
        setWaktu('Ibadah Siang');
      }
      if (!['Minggu', 'Sabtu'].includes(hariIni)) {
        setRenunganHariIni(data ? data.filter((item: any) => item.hari === hariIni)[0] : null);
      }
    })();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    (async () => {
      setRefreshing(true);
      let dt = new Date();
      dt.setDate(1);
      let firstDay = dt.getDay() + 1;
      let week = Math.ceil((dt.getDate() + firstDay) / 7);
      let data = await getIbadah({ mingguke: week });
      let newDate = new Date();
      setTime(`${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`);
      let jam = newDate.getHours();
      if (jam < 9) {
        setWaktu('Ibadah Pagi');
      } else if (jam > 9) {
        setWaktu('Ibadah Siang');
      }
      let hariIni = daftarHari[newDate.getDay() - 1];
      if (!['Minggu', 'Sabtu'].includes(hariIni)) {
        setRenunganHariIni(data ? data.filter((item: any) => item.hari === hariIni)[0] : null);
      }
    })();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{
          flexGrow: 1
        }} style={{
          flex: 1,
          backgroundColor: theme['color-basic-200'],
        }}>
        <View style={{
          flex: 1,
          padding: 20
        }}>
          <Text category='h6' style={{
            textAlign: 'center',
            color: theme['color-basic-800'],
          }} appearance='hint'>Jadwal Ibadah Mingguan</Text>

          {/* Ibadah Hari ini */}
          <View style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: theme['color-basic-100'],
            borderRadius: 10
          }}>
            <Text category='p1' style={{
              color: theme['color-basic-700'],
              fontWeight: 'bold',
              paddingLeft: 10
            }}>Renungan hari {hariIni}</Text>

            {/* List */}
            <>
              {renunganHariIni == 'loading' ? (
                <Loading />
              ) : renunganHariIni == null ? (
                <Text style={{
                  textAlign: 'center',
                  color: theme['color-basic-700'],
                  fontWeight: 'bold',
                  padding: 20,
                }}>Tidak ada jadwal renungan hari ini</Text>
              ) : (
                <CardJadwalRenungan
                  waktu={waktu}
                  pujian={waktu && waktu === 'Ibadah Pagi' ? (renunganHariIni.petugas[0][0].nama.length > 1 ? renunganHariIni.petugas[0][0].nama : 'Petugas Rohkris') : renunganHariIni.petugas[1][0].nama}
                  firman={waktu && waktu === 'Ibadah Pagi'? (renunganHariIni.petugas[0][1].nama.length > 1 ? renunganHariIni.petugas[0][1].nama : 'Petugas Rohkris') : renunganHariIni.petugas[1][1].nama}
                />
              )}
            </>
          </View>

          <View style={{
            marginTop: 20,
            // padding: 10,
            borderRadius: 10
          }}>
            <Text category='p1' style={{
              color: theme['color-basic-700'],
              fontWeight: 'bold',
              // paddingLeft: 10
            }}>Seluruh Jadwal Ibadah Minggu ini</Text>

            <View style={{
              marginTop: 10,
              padding: 0,
            }}>
              {typeof dataRenungan1 !== 'string' ? (
                <>
                  <List
                    data={dataRenungan1}
                    ListEmptyComponent={() => {
                      return (
                        <Loading />
                      )
                    }}
                    contentContainerStyle={{
                      gap: 5,
                      backgroundColor: "transparent"
                    }}
                    keyExtractor={(item: any, index: any) => index.toString()}
                    renderItem={({ item, index }: any) => {
                      return (
                        <ListItem
                          style={{
                            borderRadius: 5,
                            backgroundColor: 'transparent',
                          }}
                          title={() => {
                            return <Text style={{
                              color: theme['color-basic-800'],
                              fontWeight: 'bold',
                              paddingLeft: 5,
                              marginBottom: 10
                            }}>{item.hari}</Text>
                          }}
                          description={() => {
                            return (
                              <View style={{
                                borderRadius: 10,
                                borderColor: theme['color-basic-200'],
                                borderWidth: 1,
                                padding: 5,
                                backgroundColor: theme['color-basic-100'],
                              }}>
                                <CardJadwalRenungan
                                  waktu={'Ibadah Pagi'}
                                  pujian={item.petugas[0][0].nama.length > 1 ? item.petugas[0][0].nama : 'Petugas Rohkris'}
                                  firman={item.petugas[0][1].nama.length > 1 ? item.petugas[0][1].nama : 'Petugas Rohkris'}
                                />
                                <Divider style={{
                                  marginVertical: 10,
                                  backgroundColor: theme['color-primary-100']
                                }} />
                                <CardJadwalRenungan
                                  waktu={'Ibadah Siang'}
                                  pujian={item.petugas[1][0].nama.length > 1 ? item.petugas[1][0].nama : 'Petugas Rohkris'}
                                  firman={item.petugas[1][1].nama.length > 1 ? item.petugas[1][1].nama : 'Petugas Rohkris'}
                                />
                              </View>
                            )
                          }}
                        />
                      )
                    }}
                  />
                </>
              ) : (
                <Loading />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
