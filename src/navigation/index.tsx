import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, useTheme, Icon, Text } from "@ui-kitten/components";
import * as SplashScreenExpo from 'expo-splash-screen';

// splash screen
import SplashScreen from "../screens/splashScreen";
// import screen
import HomeScreen from "../screens/homeScreen";
import SettingScreen from "../screens/settingScreen";
// Modal Screen
import PiketScreen from "../screens/modals/piketScreen";
import EditProfileScreen from "../screens/modals/editProfileScreen";
import ChangePasswordScreen from "../screens/modals/changePasswordScreen";
import JadwalIbadahScreen from "../screens/modals/jadwalIbadahScreen";
import TermsAndConditionsScreen from "../screens/modals/termsAndConditionsScreen";
import RenunganHarianScreen from "../screens/modals/renunganHarianScreen";
// Auth Screen
import WelcomeScreen from "../screens/auth/welcomeScreen";
import LoginScreen from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/registerScreen";

import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { View } from "react-native";

const Stack = createStackNavigator();
export default function Navigation({ isLoading, isLoggedIn }: { isLoading: boolean, isLoggedIn: boolean }) {
  const theme = useTheme();
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('white');
    NavigationBar.setButtonStyleAsync("dark");
    NavigationBar.setBorderColorAsync('transparent');
  }, [theme]);
  return (
    <NavigationContainer onReady={async () => {
      await SplashScreenExpo.hideAsync();
    }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : isLoggedIn ? (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Group>
              <Stack.Screen options={{
                presentation: 'modal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }} name="Piket" component={PiketScreen} />
              <Stack.Screen options={{
                presentation: 'modal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }} name="TermsAndConditions" component={TermsAndConditionsScreen} />
              <Stack.Screen options={{
                presentation: 'modal',
                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
              }} name="RenunganHarian" component={RenunganHarianScreen} />
              <Stack.Screen options={{
                presentation: 'modal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }} name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen options={{
                presentation: 'modal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }} name="ChangePassword" component={ChangePasswordScreen} />
              <Stack.Screen options={{
                presentation: 'modal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }} name="JadwalIbadah" component={JadwalIbadahScreen} />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Screen
const { Navigator, Screen } = createBottomTabNavigator();

// Bottom bar
const BottomBar = ({ navigation, state }: any) => {
  const theme = useTheme();
  let barColor = (state: boolean) => {
    return state ? theme['color-primary-400'] : 'rgba(0,0,0,0.4)';
  }
  return (
    <BottomNavigation
      appearance="noIndicator"
      style={{
        backgroundColor: 'white'
      }} selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab style={{
      }} icon={(props) =>
        <View style={{
          backgroundColor: state.index === 0 ? theme['color-primary-100'] : 'transparent',
          padding: 10,
          marginVertical: 5,
          borderRadius: 100,
        }}>
          <Icon
            name={state.index === 0 ? 'home' : 'home-outline'}
            style={{
              width: 24,
              height: 24,
            }}
            fill={barColor(state.index == 0)}
          />
        </View>
      } />
      <BottomNavigationTab icon={(p) => <View style={{
          backgroundColor: state.index === 1 ? theme['color-primary-100'] : 'transparent',
          padding: 10,
          marginVertical: 5,
          borderRadius: 100,
        }}>
          <Icon
            name={state.index === 1 ? 'book' : 'book-outline'}
            style={{
              width: 24,
              height: 24,
            }}
            fill={barColor(state.index == 1)}
          />
        </View>
      } />
      <BottomNavigationTab icon={(p) => <View style={{
          backgroundColor: state.index === 2 ? theme['color-primary-100'] : 'transparent',
          padding: 10,
          marginVertical: 5,
          borderRadius: 100,
        }}>
          <Icon
            name={state.index === 2 ? 'bookmark' : 'bookmark-outline'}
            style={{
              width: 24,
              height: 24,
            }}
            fill={barColor(state.index == 2)}
          />
        </View>
      } />
      <BottomNavigationTab icon={(p) =>
        <View style={{
          backgroundColor: state.index === 3 ? theme['color-primary-100'] : 'transparent',
          padding: 10,
          marginVertical: 5,
          borderRadius: 100,
        }}>
          <Icon
            name={state.index === 3 ? 'settings' : 'settings-outline'}
            style={{
              width: 24,
              height: 24,
            }}
            fill={barColor(state.index == 3)}
          />
        </View>
      } />
    </BottomNavigation>
  )
}

function MainScreen() {

  const theme = useTheme();
  return (
    <Navigator tabBar={
      (props) => <BottomBar {...props} />
    }>
      <Screen name="Home" options={{
        headerTintColor: 'black',
        headerTitle: 'Beranda',
        headerStyle: {
          backgroundColor: 'white',
        },
      }} component={HomeScreen} />
      <Screen name="JadwalIbadah" options={{
        headerTintColor: 'black',
        headerTitle: 'Renungan',
        headerStyle: {
          backgroundColor: "white",
        }
      }} component={JadwalIbadahScreen} />
      <Screen name="Piket" options={{
        headerTintColor: 'black',
        headerTitle: 'Jadwal Piket',
        headerStyle: {
          backgroundColor: theme['color-basic-100'],
        }
      }} component={PiketScreen} />
      <Screen name="Settings" options={{
        headerTintColor: 'black',
        headerTitle: 'Pengaturan',
        headerStyle: {
          backgroundColor: theme['color-basic-100'],
        },
      }} component={SettingScreen} />
    </Navigator>
  )
}

function AuthScreen() {

  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={{
        headerShown: false,
        presentation: 'modal',
      }} name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" options={{
        headerShown: false,
        presentation: 'modal'
      }} component={RegisterScreen} />
    </Stack.Navigator>
  )
}
