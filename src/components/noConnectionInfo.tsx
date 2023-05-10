import { Layout, Text } from "@ui-kitten/components";
import { Dimensions } from "react-native";

interface NoConnectionInfoProps {
  hasInternet: Boolean;
}

export default function NoConnectionInfo({
  hasInternet
}: NoConnectionInfoProps) {
  return (
    <Layout style={{
      backgroundColor: 'red',
      paddingTop: 45,
      paddingBottom: 20,
      position: 'absolute',
      display: !hasInternet ? 'flex' : 'none',
      top: 0,
      left: 0,
      width: Dimensions.get('screen').width,
      zIndex: 10
    }}>
      <Text style={{
        color: 'white',
        textAlign: 'center'
      }}>Tidak ada sambungan internet</Text>
    </Layout>
  )
}
