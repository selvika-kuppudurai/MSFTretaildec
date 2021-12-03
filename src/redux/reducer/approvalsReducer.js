/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    pendingData: [],
    activityData: [],
    approvalDetails: []
}


export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "PENDING_DATA":
            return {
                ...state,
                pendingData: payload
            }
        case "ACTIVITY_DATA":
            return {
                ...state,
                activityData: payload
            }
        case "APPROVAL_DETAILS":
            return {
                ...state,
                approvalDetails: payload
            }
        default:
            return state;
    }
}