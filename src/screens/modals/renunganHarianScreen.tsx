import { Text, useTheme, TopNavigation, TopNavigationAction, Icon, Spinner, Divider } from '@ui-kitten/components';
import { ScrollView, View, Linking, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RenunganHarian({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const [renungan, setRenungan] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      fetch(backendURLforRenungan).then((res) => res.json()).then((res) => {
        setRenungan(res);
      });
    })();
  }, []);
  return (
    <>
      <View style={{
        backgroundColor: theme['color-basic-100'],
        paddingTop: StatusBar.currentHeight
      }}>
        <TopNavigation
          title={() => {
            return <Text category='h6' style={{
              color: 'black'
            }}>Renungan Hari Ini</Text>
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
        // padding: 10,
        backgroundColor: theme['color-basic-200']
      }}>
        {renungan ? (
          <View style={{
            marginTop: 20,
          }}>
            <View style={{
              padding: 10,
            }}>
              <Text category='h6' style={{
                color: 'black',
                marginBottom: 2
              }}>{renungan.title}</Text>
              <Text category='c1' style={{
                color: theme['color-basic-700']
              }}>{renungan.date}</Text>
              <View>
                <View style={{
                  marginTop: 20,
                }}>
                  <Text category='p1' style={{
                    color: 'black',
                    fontWeight: 'bold'
                  }}>{renungan.ayat}</Text>
                  <Text style={{
                    fontStyle: 'italic',
                    color: theme['color-basic-700'],
                    fontSize: 16,
                    letterSpacing: 0.22,
                  }}>{renungan.passage}</Text>
                </View>
              </View>
            </View>
            <Divider style={{
              marginBottom: 20,
              marginTop: 30,
              backgroundColor: theme['color-basic-300']
            }} />
            <View style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
              shadowColor: "rgba(0,0,0,0.1)",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
              backgroundColor: theme['color-basic-100'],
            }}>
              <Text style={{
                color: theme['color-basic-800'],
                marginBottom: 10,
                fontSize: 16,
                letterSpacing: 0.4,
                fontWeight: '100'
              }}>{renungan.body}</Text>
            </View>
          </View>
        ) : (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Spinner size='large' />
          </View>
        )}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
          <Text style={{
            color: theme['color-basic-700'],
            marginTop: 20,
            marginBottom: 20,
            fontSize: 14,
            letterSpacing: 0.25,
            fontWeight: '100'
          }}>Sumber:</Text>
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://alkitab.mobi/renungan/rh');
          }} style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              color: theme['color-primary-500'],
              fontSize: 14,
            }}>Alkitab Mobi</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </>
  )
}
