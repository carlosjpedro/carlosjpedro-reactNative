import React, { Component } from 'react'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import { View, Platform, ScrollView, SafeAreaView, StyleSheet, Image, Text } from 'react-native'
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators'



const mapStateToProps = state => { return {} }

const mapDispatchToProps = dispatch => ({
    fetchComments: () => dispatch(fetchComments()),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromos: () => dispatch(fetchPromos())
})

const MenuNavigator = createStackNavigator(
    {
        Menu: {
            screen: Menu, navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name='menu' size={24}
                    color='white' onPress={() => navigation.toggleDrawer()} />
            })
        },
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
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />,
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            }
        })
    })

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />,
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            }
        })
    })

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />,
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            }
        })
    })



const CustomDrawerContentComponent = (props) => (<ScrollView>
    <SafeAreaView style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={require('./images/logo.png')}
                    style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
        </View>
        <DrawerItems {...props} />
    </SafeAreaView>
</ScrollView >)

const MainNavigator = createDrawerNavigator(
    {
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                title: 'About Us',
                drawerLabel: 'About Us',
                drawerIcon: ({ tintColor }) => <Icon name='info-circle' type='font-awesome'
                    size={24} color={tintColor} />
            }
        },
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home',
                drawerIcon: ({ tintColor }) => <Icon name='home' type='font-awesome'
                    size={24} color={tintColor} />
            }
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu',
                drawerIcon: ({ tintColor }) => <Icon name='list' type='font-awesome'
                    size={24} color={tintColor} />
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                title: 'Contact Us',
                drawerLabel: 'Contact Us',
                drawerIcon: ({ tintColor }) => <Icon name='address-card' type='font-awesome'
                    size={22} color={tintColor} />
            }
        }
    },
    {
        drawerBackgroundColor: '#D1C4E9',
        contentComponent: CustomDrawerContentComponent
    })


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }

});
class Main extends Component {

    componentDidMount() {
        this.props.fetchComments()
        this.props.fetchDishes()
        this.props.fetchLeaders()
        this.props.fetchPromos()
    }


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

export default connect(mapStateToProps, mapDispatchToProps)(Main)