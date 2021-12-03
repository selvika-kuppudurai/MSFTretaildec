

const initialState = {
    userDetails: sessionStorage.getItem("userDetails") ? JSON.parse(sessionStorage.getItem("userDetails")) : {},
    listofAdmins: ""
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;



    switch (type) {
        case "STORE_USER_ROLE":
            return {
                // ...state.userDetails,
                userDetails: { ...payload.user, role: payload.role },
            }

        case "STORE_ADMINS":
            return {
                ...state,
                listofAdmins: payload
            }


        default:
            return state;
    }
}