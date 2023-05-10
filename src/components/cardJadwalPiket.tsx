import {
  View
} from 'react-native';
import {
  Text,
  useTheme
} from '@ui-kitten/components';
import { ItemJadwalPiket, ContainerItemJadwalPiket } from './itemJadwalPiket';

interface cardJadwalPiketProps {
  hari: string;
  item: [];
}

export default function cardJadwalPiket({
  hari,
  item
}: cardJadwalPiketProps) {
  const theme = useTheme();
  return (
    <View style={{
      paddingHorizontal: 10,
      paddingVertical: 15,
      backgroundColor: theme['color-basic-100'],
      paddingBottom: 10,
      marginTop: 10,
      borderRadius: 10,
    }}>
      <Text category='p1' style={{
        color: theme['color-basic-800'],
        fontWeight: 'bold'
      }}>{hari}</Text>
      <ContainerItemJadwalPiket>
        {item.map((item: any, index: number) => {
          return (
            <ItemJadwalPiket title={item} key={index} />
          )
        })}
      </ContainerItemJadwalPiket>
    </View>
  )
}
