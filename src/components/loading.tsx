import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";

export default function Loading() {
  return (
    <View style={{
      padding: 20,
      alignItems: 'center',
    }}>
      <Spinner size='large' />
    </View>
  )
}
