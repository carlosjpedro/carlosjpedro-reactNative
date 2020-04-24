import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

function RenderDish(props) {
    const dish = props.dish

    if (dish != null) return <Card
        featuredTitle={dish.name}
        image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon name={props.favorite ? 'heart' : 'heart-o'}
            raised reverse
            type='font-awesome'
            color='#f50' onPress={() => { props.favarite ? console.log('Already favorite') : props.onPress() }} ></Icon>
    </Card>

    return <View></View>
}

function RenderComments(props) {
    const comments = props.comments
    const renderCommentItem = ({ item, index }) =>
        <View kye={index} style={{ margin: 10 }} >
            <Text style={{ fontSize: 14 }}>
                {item.comment}
            </Text>
            <Text style={{ fontSize: 12 }}>{item.rating}</Text>
            <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
        </View >


    return <Card title="Comments">
        <FlatList
            data={comments} renderItem={renderCommentItem}
            keyExtractor={x => x.id.toString()} />
    </Card>
}

class DishDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            favorites: []
        }
    }

    static navigationOptions = {
        title: 'Dish Detail'
    }

    markFavorite(dishId) {
        this.setState({ favorites: this.state.favorites.concat(dishId) })
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '')

        return <ScrollView>
            <RenderDish
                dish={this.props.dishes.dishes[+dishId]}
                favorite={this.state.favorites.some(x => x === dishId)}
                onPress={() => this.markFavorite(dishId)} />
            <RenderComments
                comments={this.props.comments.comments.filter(x => x.dishId === dishId)}
            />
        </ScrollView>
    }

}


export default connect(mapStateToProps)(DishDetail)