import * as ActionTypes from './ActionTypes'

export const comments = (state = {
    isLoading: true,
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: true, errMess: null, comments: action.payload }

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] }

        case ActionTypes.ADD_COMMENT:
            {
                console.log(state.comments)
                return { ...state, comments: state.comments.concat({ ...action.payload, id: state.comments.length }) }
            }
        default: return state
    }
}
