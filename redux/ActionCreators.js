import * as ActionsTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

// COMMENTS
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {            
            if (response.ok) {
                return response
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            let errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
    type: ActionsTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = (comments) => ({
    type: ActionsTypes.ADD_COMMENTS,
    payload: comments
})


// DISHES
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading())
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            let errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesFailed = (errmess) => ({
    type: ActionsTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionsTypes.ADD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({
    type: ActionsTypes.DISHES_LOADING
})


// LEADERS
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading())
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            let errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersFailed = (errmess) => ({
    type: ActionsTypes.LEADERS_FAILED,
    payload: errmess
})

export const addLeaders = (leaders) => ({
    type: ActionsTypes.ADD_LEADERS,
    payload: leaders
})

export const leadersLoading = () => ({
    type: ActionsTypes.LEADERS_LOADING
})


// PROMOTIONS
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading())
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            let errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosFailed = (errmess) => ({
    type: ActionsTypes.PROMOS_FAILED,
    payload: errmess
})

export const addPromos = (promotions) => ({
    type: ActionsTypes.ADD_PROMOS,
    payload: promotions
})

export const promosLoading = () => ({
    type: ActionsTypes.PROMOS_LOADING
})