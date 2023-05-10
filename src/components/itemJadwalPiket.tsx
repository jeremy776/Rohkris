import { Button, Text, useTheme } from "@ui-kitten/components";
import {
  View
} from 'react-native';

export function ItemJadwalPiket({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <View style={{
      paddingHorizontal: 15,
      paddingVertical: 4,
      borderRadius: 20,
      backgroundColor: theme['color-primary-100'],
      // borderWidth: 1,
    }}>
      <Text category='p1' style={{
        color: theme['color-primary-700']
      }}>{title}</Text>
    </View>
  )
}

export function ContainerItemJadwalPiket({ children }: {children: React.ReactNode}) {
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 5,
      backgroundColor: 'transparent',
      marginTop: 10,
      gap: 10
    }}>
      {children}
    </View>
  )
}
