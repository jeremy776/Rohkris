import { Layout, Button, useTheme, Icon, Text, TopNavigation, Modal, Card, TopNavigationAction, Spinner } from '@ui-kitten/components';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useState, useEffect } from 'react';
import { getPiket } from '../../api/database/jadwal-piket';
import Loading from '../../components/loading';
import CardJadwalPiket from '../../components/cardJadwalPiket';
import { ItemJadwalPiket, ContainerItemJadwalPiket } from '../../components/itemJadwalPiket';

interface dataPiketProps {
  hari: string;
  petugas: {
    nama: string;
  }[]
}

export default function PiketScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();

  const [modal, setModalVisible] = useState(false);

  const [isRefresh, setIsRefresh] = useState(false);
  const daftarHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const [piketToday, setPiketToday] = useState<any>('loading');
  const [piket, setPiket] = useState<any>('loading');

  let date = new Date();
  let day = date.getDay();

  function onRefresh() {
    setIsRefresh(true);
    setTimeout(() => {
      setIsRefresh(false);
    }, 1500);
    (async () => {
      const data = (await getPiket()).reverse() as any;
      const td = data[day - 1] as [];

      let filtered = data;
      if (td !== undefined) filtered = data.filter((item: any) => item != td);
      setPiket(filtered);
      if (td === undefined) return setPiketToday(null);
      setPiketToday(td);
      date = new Date();
      day = date.getDay();
    })();

  }

  useEffect(() => {
    (async () => {
      const data = (await getPiket()).reverse() as any;
      const td = data[day - 1] as [];

      let filtered = data;
      if (td !== undefined) filtered = data.filter((item: any) => item != td);
      setPiket(filtered);
      if (td === undefined) return setPiketToday(null);
      setPiketToday(td);
    })();
  }, []);

  return (
    <>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={isRefresh}
          onRefresh={onRefresh}
        />
      } contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          padding: 20,
          backgroundColor: theme['color-basic-200']
        }}>
          <Text style={{ textAlign: 'center', color: theme['color-basic-800'] }} category='h6'>Daftar Jadwal Piket</Text>
          {/* Piket today */}
          <View style={{
            marginTop: 20,
            backgroundColor: theme['color-basic-100'],
            // borderColor: theme['color-basic-800'],
            // borderWidth: 1,
            padding: 10,
            borderRadius: 10
          }}>
            <Text category='p1' style={{
              color: theme['color-basic-700'],
              fontWeight: 'bold',
              paddingLeft: 10
            }}>Piket hari ini - {daftarHari[day]}</Text>

            {piketToday == 'loading' ? (
              <Loading />
            ) : piketToday == null ? (
              <Text category='h6' style={{
                color: theme['color-basic-700'],
                fontWeight: 'bold',
                padding: 20,
                textAlign: 'center'
              }}>Tidak yang ada piket hari ini</Text>
            ) : (
              <ContainerItemJadwalPiket>
                {piketToday.map((item: any, index: number) => {
                  return (
                    <ItemJadwalPiket
                      key={index}
                      title={item}
                    />
                  )
                })}
              </ContainerItemJadwalPiket>
            )}
          </View>

          <View style={{
            marginTop: 20,
            // backgroundColor: theme['color-basic-900'],
            // padding: 10,
            borderRadius: 10
          }}>
            <Text category='p1' style={{
              color: theme['color-basic-800'],
              fontWeight: 'bold',
              paddingTop: 10,
            }}>Seluruh Jadwal Piket</Text>

            {piket == 'loading' ? (
              <Loading />
            ) :
              piket.map((item: any, index: number) => {
                return (
                  <CardJadwalPiket
                    key={index}
                    hari={daftarHari.filter(y => y !== 'Minggu').filter(y1 => y1 !== daftarHari[day])[index]}
                    item={item}
                  />
                )
              })}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
