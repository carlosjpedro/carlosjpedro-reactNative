import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { DISHES } from '../shared/dishes'
import { PROMOTIONS } from '../shared/promotions'
import { LEADERS } from '../shared/leaders'

const RenderItem = (props) => {
    const item = props.item

    if (item == null) return <View></View>

    return <Card
        featuredTitle={item.name}
        
        featuredSubtitle={item.designation}
        image={require('./images/uthappizza.png')}>
        <Text style={{ margin: 10 }}>{item.description}</Text>
    </Card>
}


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishes: DISHES,
            leaders: LEADERS,
            promotions: PROMOTIONS
        }
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return <ScrollView>
            <RenderItem item={this.state.dishes.filter(x => x.featured)[0]}></RenderItem>
            <RenderItem item={this.state.promotions.filter(x => x.featured)[0]}></RenderItem>
            <RenderItem item={this.state.leaders.filter(x => x.featured)[0]}></RenderItem>
        </ScrollView>
    }
}