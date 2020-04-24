import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        leaders : state.leaders,
        promotions: state.promotions
    }
}

const RenderItem = (props) => {
    const item = props.item

    if (item == null) return <View></View>

    return <Card
        featuredTitle={item.name}
        
        featuredSubtitle={item.designation}
        image={{uri: baseUrl + item.image}}>
        <Text style={{ margin: 10 }}>{item.description}</Text>
    </Card>
}


class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return <ScrollView>
            <RenderItem item={this.props.dishes.dishes.filter(x => x.featured)[0]}></RenderItem>
            <RenderItem item={this.props.promotions.promotions.filter(x => x.featured)[0]}></RenderItem>
            <RenderItem item={this.props.leaders.leaders.filter(x => x.featured)[0]}></RenderItem>
        </ScrollView>
    }
}

export default connect(mapStateToProps)(Home)