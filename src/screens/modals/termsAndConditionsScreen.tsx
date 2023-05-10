import { Text, useTheme, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { ScrollView, View } from 'react-native';

export default function TermsAndConditions({ navigation }: { navigation: any }) {
  const theme = useTheme();

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
            }}>Terms & Conditions</Text>
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
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme['color-basic-200']
      }}>
        <View style={{
          padding: 10,
        }}>
          <View style={{
            padding: 20,
            borderRadius: 10,
            gap: 25,
            backgroundColor: theme['color-basic-100']
          }}>
            <View style={{
              paddingHorizontal: 10
            }}>
              <Text category='h6'>1. Pengenalan</Text>
              <Text style={{
                color: theme['color-basic-700'],
                marginTop: 5
              }}>Aplikasi ini merupakan sebuah aplikasi yang dibuat untuk melihat jadwal dan juga event yang akan datang di rohkris [NAMA SEKOLAH]. Aplikasi ini dimiliki dan dioperasikan oleh seorang siswa [NAMA SEKOLAH] dan dapat diakses melalui perangkat seluler [Android]</Text>
            </View>
            <View style={{
              paddingHorizontal: 10
            }}>
              <Text category='h6'>2. Penggunaan Aplikasi</Text>
              <Text style={{
                color: theme['color-basic-700'],
                marginTop: 5
              }}>Dengan menggunakan aplikasi ini, pengguna dianggap telah membaca dan menyetujui syarat dan ketentuan yang tertera dalam Terms & Conditions ini. Pengguna bertanggung jawab untuk memastikan bahwa data yang diberikan adalah benar dan akurat.</Text>
            </View>
            <View style={{
              paddingHorizontal: 10
            }}>
              <Text category='h6'>3. Kebijakan Privasi</Text>
              <Text style={{
                color: theme['color-basic-700'],
                marginTop: 5
              }}>Aplikasi ini akan mengumpulkan data pribadi berupa email dan nama pengguna. Data ini akan digunakan untuk kepentingan internal aplikasi dan tidak akan disebarkan ke pihak ketiga tanpa persetujuan pengguna. Pengguna juga dapat menghubungi kami jika ingin menghapus data pribadi mereka dari aplikasi.</Text>
            </View>
            <View style={{
              paddingHorizontal: 10
            }}>
              <Text category='h6'>4. Pembayaran</Text>
              <Text style={{
                color: theme['color-basic-700'],
                marginTop: 5
              }}>Aplikasi ini tersedia secara gratis dan tidak dikenakan biaya apapun. Namun, pengguna harus membayar biaya data yang dikeluarkan oleh operator seluler atau penyedia layanan internet.</Text>
            </View>
            <View style={{
              paddingHorizontal: 10
            }}>
              <Text category='h6'>5. Pembatasan Tanggung Jawab</Text>
              <Text style={{
                color: theme['color-basic-700'],
                marginTop: 5
              }}>Penyedia aplikasi tidak bertanggung jawab atas kerusakan atau kehilangan yang disebabkan oleh penggunaan aplikasi ini. Aplikasi ini disediakan "apa adanya" tanpa jaminan apapun, baik tersurat maupun tersirat.</Text>
            </View>
            <View style={{
              paddingHorizontal: 10
            }}>
              <Text category='h6'>6. Perubahan Terms & Conditions</Text>
              <Text style={{
                color: theme['color-basic-700'],
                marginTop: 5
              }}>Penyedia aplikasi berhak untuk mengubah syarat dan ketentuan ini tanpa pemberitahuan terlebih dahulu. Pengguna disarankan untuk secara rutin memeriksa halaman Terms & Conditions untuk memperbarui diri tentang syarat dan ketentuan yang terbaru.</Text>
            </View>
            <View>
              <Text style={{
                color: theme['color-basic-700']
              }}>Dengan menggunakan aplikasi ini, pengguna dianggap telah membaca, memahami, dan menyetujui syarat dan ketentuan yang tertera dalam Terms & Conditions ini. Jika pengguna tidak setuju dengan syarat dan ketentuan ini, pengguna dilarang untuk menggunakan aplikasi ini.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
