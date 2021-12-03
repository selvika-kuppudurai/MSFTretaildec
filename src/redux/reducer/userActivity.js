/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    userActivity: [],
    loader: true
}


export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case "STORE_ACTIVITY":
            return {
                ...state,
                userActivity: payload,
                loader: false
            }
        default:
            return state
    }
}