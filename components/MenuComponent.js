import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading from './LoadingComponent'

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes
    }
}


class Menu extends Component {

    static navigationOptions = {
        title: 'Menu'
    }

    render() {
        const renderMenuItem = ({ item, index }) => <Tile key={index}
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate('DishDetail', { dishId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }} />

        const { navigate } = this.props.navigation

        if (this.props.dishes.isLoading) {
            return <Loading />
        }
        if (this.props.dishes.errMess) {
            return <Text>{this.props.dishes.errMess}</Text>
        }

        return <FlatList
            data={this.props.dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()} />
    }
}

export default connect(mapStateToProps)(Menu)