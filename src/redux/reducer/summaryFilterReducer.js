/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    model: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "STORE_MODEL":
            return {
                ...state,
                model: payload
            }
        default:
            return state;
    }
}