/* eslint-disable no-useless-concat */
import axios from "axios"
import moment from "moment"
import { endPoints } from "../../config/Api"



// load user approvals 
export const loadUserApprovals = (paramData) => async dispatch => {
    try {
        const url = endPoints.userManage.approvals + "?Params=" + `${paramData}`

        const res = await axios.get(url)

        if (res.status === 200) {
            if (paramData === "Manage") {
                dispatch({ type: "PENDING_DATA", payload: res.data })
            }

            if (paramData === "Activity") {
                dispatch({ type: "ACTIVITY_DATA", payload: res.data })
            }
        }

    } catch (err) {

    }
}

// approve or reject
export const userApproveReject = (flag, loggedInUser, body) => async dispatch => {
    try {
        let systemDate = []
        if (body.length > 0) {
            // systemDate = body.map(d => moment(d.systemUpdatedDate).format("YYYY-MM-DD HH:mm:ss.SSS"))
            systemDate = body.map(d => d.systemUpdatedDate)
        }
        const url = endPoints.userManage.approvalsAction + "?Flag=" + `${flag}` + "&Approvaluser=" + `${loggedInUser}`

        const res = await axios.put(url, body)

        if (res.status === 200) {

            if (flag === "Approval" || flag === "Rejected") {
                dispatch(loadUserApprovals("Manage"))
            } else {
                dispatch(loadUserApprovals("Activity"))
            }
        }

    } catch (err) {

    }
}

// Load approval details 
export const approvalDetails = (data) => async dispatch => {
    try {
        const url = endPoints.userManage.approvalDetails + "?GLID=" + `${data.glid}` + "&updateddate=" + `${data.systemUpdatedDate}` + "&Updatedby=" + `${data.updatedby}`

        const res = await axios.get(url)

        if (res.status === 200) {
            dispatch({ type: "APPROVAL_DETAILS", payload: res.data })
        }

    } catch (err) {
        console.error(err)
    }
}