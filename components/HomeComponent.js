import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading from './LoadingComponent'


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const RenderItem = (props) => {
    const item = props.item

    if (props.isLoading) {
        return <Loading />
    }
    else if (props.errMess) {
        return <Text>{props.errMess}</Text>
    }

    if (item == null) return <View></View>

    return <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={{ uri: baseUrl + item.image }}>
        <Text style={{ margin: 10 }}>{item.description}</Text>
    </Card>
}


class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return <ScrollView>
            <RenderItem item={this.props.dishes.dishes.filter(x => x.featured)[0]}
                isLoading={this.dishes.isLoading} errMess={this.dishes.errMess} />
            <RenderItem item={this.props.promotions.promotions.filter(x => x.featured)[0]}
                isLoading={this.promotions.isLoading} errMess={this.promotions.errMess} />
            <RenderItem item={this.props.leaders.leaders.filter(x => x.featured)[0]}
                isLoading={this.leaders.isLoading} errMess={this.leaders.errMess} />
        </ScrollView>
    }
}

export default connect(mapStateToProps)(Home)