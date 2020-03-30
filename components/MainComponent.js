import React, { Component } from 'react'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import { View, Platform } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Contact from './ContactComponent'


const MenuNavigator = createStackNavigator(
    {
        Menu: { screen: Menu },
        DishDetail: { screen: DishDetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            }
        }
    })


const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            }
        }
    })

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            }
        }
    })


const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home'
            }
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu'
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                title: 'Contact',
                drawerLabel: 'Contact'
            }
        }
    },
    {
        drawerBackgroundColor: '#D1C4E9'
    })



export default class Main extends Component {
    render() {
        return <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ?
                0 :
                Expo.Constants.statusBarHeight
        }}>
            <MainNavigator />
        </View>
    }
}