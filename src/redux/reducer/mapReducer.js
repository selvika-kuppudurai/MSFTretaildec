

const initialState = {
    mapDetails: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;



    switch (type) {
        case "STORE_LATLANG":
            return {
                ...state,
                mapDetails: payload
            }
        default:
            return state;
    }
}