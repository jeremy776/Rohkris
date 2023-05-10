import { View } from 'react-native';
import { Text, Layout, Spinner } from '@ui-kitten/components';

export default function SplashScreen() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner size='large' />
    </Layout>
  )
}
