import {
  View
} from 'react-native';
import {
  Text,
  useTheme
} from '@ui-kitten/components'

interface CardJadwalRenunganProps {
  waktu: string;
  pujian: string;
  firman: string;
}

export default function CardJadwalRenungan({
  waktu,
  pujian,
  firman,
}: CardJadwalRenunganProps) {
  const theme = useTheme();
  return (
    <>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'transparent',
      }}>
        <Text status="info" style={{
          fontWeight: 'bold'
        }}>Waktu</Text>
        <Text style={{
        color: theme['color-basic-700'],
          fontWeight: 'bold'
        }}>{waktu}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'transparent',
      }}>
        <Text status="success" style={{
          fontWeight: 'bold'
        }}>Pujian</Text>
        <Text style={{
          color: theme['color-basic-700'],
          fontWeight: 'bold'
        }}>
          {pujian}
        </Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'transparent',
      }}>
        <Text status="success" style={{
          fontWeight: 'bold'
        }}>Firman</Text>
        <Text style={{
          color: theme['color-basic-700'],
          fontWeight: 'bold'
        }}>{firman}</Text>
      </View>
    </>
  )
}
