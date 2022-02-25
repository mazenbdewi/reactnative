import React, { Component, useEffect } from 'react';

import analytics from '@react-native-firebase/analytics';


import { Image, TouchableOpacity, Platform, StyleSheet, Text, View, Alert, Linking, YellowBox } from "react-native";

//Pages
import PostView from './src/views/PostViews/PostView';
import PostDetail from './src/views/PostDetail/PostDetail';
import SearchView from './src/views/Search/Search';
import CategoryList from './src/views/Category/CategoryList/CategoryList';
import CategoryView from './src/views/Category/CategoryView/CategoryView';
//React Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WomanScreen from './src/views/WomanScreen/WomanScreen';
import CultureScreen from './src/views/CultureScreen/CultureScreen';
import VariousScreen from './src/views/VariousScreen/VariousScreen';
import * as RootNavigation from './RootNavigation';
import OneSignal from 'react-native-onesignal';


//Mobx
import { Provider, observer, inject } from 'mobx-react';
import store from './src/store/index';
//Color Package
import color from './src/config/color';



const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const WomanStack = createStackNavigator();
const CultureStack = createStackNavigator();
const VariousStack = createStackNavigator();


var bell;

const createAlert = () =>
  Alert.alert(
    "",
    "التنبيهات",
    [
      {
        text: " إلغاء التنبيهات",
        onPress: () => { bell = false; },
        style: "cancel"
      },
      { text: "نفعيل التبيهات", onPress: () => { bell = true; } }
    ]
  );


function HomeStackScreen({ navigation }) {

  return (
    <HomeStack.Navigator>

      <HomeStack.Screen name="PostView"
        options={{
          title: "", headerTitleAlign: 'center',
          headerTitle: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>)

          ,
          headerRight: () => (<TouchableOpacity onPress={createAlert} ><Image style={{ width: 30, height: 30, margin: 20 }} source={require("./src/img/icons/bell.png")} /></TouchableOpacity>),

        }}
        component={PostView} />

      <HomeStack.Screen name="Details"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }} component={PostDetail} />
      <Tab.Screen name="Search" component={SearchStackScreen} options={{ title: 'البحث ', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Woman" component={WomanStackScreen} options={{ title: 'المرأة', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Culture" component={CultureStackScreen} options={{ title: 'ثقافة', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Various" component={VariousStackScreen} options={{ title: 'منوعات', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />


    </HomeStack.Navigator >
  );
};


function SearchStackScreen({ navigation }) {
  navigation.setOptions({ tabBarVisible: false });
  return (

    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Search"
        options={{
          title: "البحث", headerTitleAlign: 'center'
          , headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={SearchView} />
      <SearchStack.Screen name="Search Detail" options={{ title: "النتائج", headerTitleAlign: 'center' }} component={PostDetail} />
    </SearchStack.Navigator>
  );
};



function CategoryStackScreen({ navigation }) {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen name="Category"
        options={{

          title: "الأقسام", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={CategoryList} />
      <CategoryStack.Screen name="Category View"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}

        component={CategoryView} />
      <CategoryStack.Screen name="Category Detail"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </CategoryStack.Navigator>
  );
};


function WomanStackScreen({ navigation }) {
  return (
    <WomanStack.Navigator screenOptions={{ headerShown: false }}>

      <WomanStack.Screen name="Woman"
        options={{
          title: "المرأة", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={WomanScreen} />
      <WomanStack.Screen name="Woman Detail"
        options={{ title: "المرأة", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </WomanStack.Navigator>
  );
};
function CultureStackScreen({ navigation }) {
  return (
    <CultureStack.Navigator screenOptions={{ headerShown: false }}>

      <CultureStack.Screen name="Culture"
        options={{
          title: "ثقافة", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={CultureScreen} />
      <CultureStack.Screen name="Culture Detail"
        options={{ title: "ثقافة", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </CultureStack.Navigator>
  );
};

function VariousStackScreen({ navigation }) {
  return (
    <VariousStack.Navigator screenOptions={{ headerShown: false }}>

      <VariousStack.Screen name="Various"
        options={{
          title: "منوعات", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={VariousScreen} />
      <VariousStack.Screen name="Various Detail"
        options={{ title: "منوعات", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </VariousStack.Navigator>
  );
};



function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.tabBarNavigation, { backgroundColor: isFocused ? color.tabBarColor : color.tabBarFocusColor }]}
          >

            <View style={[styles.iconsArea]}>
              {label === "Home" && <Image style={styles.navigationIcon} source={require('./src/img/icons/home.png')} tintColor="#212529" />}
              {label === "Search" && <Image style={styles.navigationIcon} source={require('./src/img/icons/search.png')} tintColor="#212529" />}
              {label === "Category" && <Image style={styles.navigationIcon} source={require('./src/img/icons/web.png')} tintColor="#212529" />}
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}



OneSignal.setLogLevel(6, 0);
OneSignal.setAppId("6d0a13dd-aa94-4253-94d0-cb1c711a3bfb");

if (bell) {
  OneSignal.disablePush(true);

} else {
  OneSignal.disablePush(false);

}

//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log("Prompt response #334: ", response);
})
//Method for handling notifications recieved while app in foreground
// Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  // Complete with null means don't show a notification.

  notificationReceivedEvent.complete(notification);


});

// Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {

  console.log("OneSignal: notification opened:", data);



});

// REMOTE NOTIFICATIONS SETUP END //


export default class App extends React.Component {


  componentDidMount() {
    analytics().logScreenView(
      {
        screen_name: 'Home',
        screen_class: 'HomeScreen',
      }
    )
  };


  render() {
    console.disableYellowBox = true;

    return (
      <Provider {...store}>

        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home" tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Category" component={CategoryStackScreen} />
            <Tab.Screen name="Home" component={HomeStackScreen} />


          </Tab.Navigator>
        </NavigationContainer>

      </Provider >

    );
  }
}

const styles = StyleSheet.create({
  tabBarNavigation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  navigationIcon: {
    height: 24,
    width: 24,
  }
})
