import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native'
import { Card, Icon, Input, Rating } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux'
import { postFavorite, postComment } from '../redux/ActionCreators'


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})

function RenderDish(props) {
    const dish = props.dish

    if (dish != null) return <Card
        featuredTitle={dish.name}
        image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row'
        }}>
            <Icon name={props.favorite ? 'heart' : 'heart-o'}
                raised reverse
                type='font-awesome'
                color='#f50' onPress={() => { props.favarite ? console.log('Already favorite') : props.markFavorite() }} ></Icon>
            <Icon name='pencil' type='font-awesome' color="blue" reverse raised onPress={() => props.toggleModal()}></Icon>
        </View>
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
            favorites: [],
            showModal: false,
            review: {
                dishId: null,
                author: '',
                rating: 0,
                comment: '',
                date: null
            }
        }
    }

    static navigationOptions = {
        title: 'Dish Detail'
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }


    toggleModal(dishId) {
        this.setState({
            showModal: false,
            dishId: dishId,
            author: '',
            rating: 0,
            comment: '',
            date: null
        })
    }

    submitReview() {
        this.props.postComment(dishId,
            this.state.author,
            this.state.comment,
            this.state.rating,
            new Date().toISOString())
        this.toggleModal()
    }

    updateRating(rating) {
        this.setState({ rating: rating })
    }
    updateAuthor(author) {
        this.setState({ author: author })
    }

    updateComment(comment) {
        this.setState({ comment: comment })
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '')
        return <ScrollView>
            <RenderDish
                dish={this.props.dishes.dishes[dishId]}
                favorite={this.props.favorites.some(x => x === dishId)}
                markFavorite={() => this.markFavorite(dishId)}
                toggleModal={() => this.toggleModal(dishId)} />
            <RenderComments
                comments={this.props.comments.comments.filter(x => x.dishId === dishId)}
            />

            <Modal
                animationType={'slide'}
                style={{
                    justifyContent: 'center',
                    margin: 20,
                }} visible={this.state.showModal}>
                <Rating
                    showRating
                    startingValue={0}
                    onFinishRating={value => this.updateRating(value)}

                />
                <View style={style.formRow}>
                    <Input placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={value => this.updateAuthor(value)}
                    />
                </View>
                <View style={style.formRow}>
                    <Input placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        onChangeText={value => this.updateComment(value)}></Input>
                </View>
                <View style={style.formRow}>
                    <Button title="Submit" onPress={() => this.submitReview()}></Button>
                </View>
                <View style={style.formRow}>
                    <Button title="Cancel" styte={style.modalButton} color="gray" onPress={() => this.toggleModal()}></Button>
                </View>

            </Modal>
        </ScrollView>
    }

}

const style = StyleSheet.create({
    formRow: {
        margin: 10
    },
    cancelButton: {
        color: "gray"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)