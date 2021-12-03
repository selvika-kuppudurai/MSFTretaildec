/* eslint-disable no-useless-concat */
import axios from "axios"
import { endPoints } from "../../config/Api"


// Load user role 
export const loadUserRole = (userDetails) => async dispatch => {
    try {
        let url = endPoints.user.role + "?" + "Email=" + `${userDetails.email}` + "&" + "Name=" + `${userDetails.name}` + "&" + "Country=" + `${userDetails.country}` + "&" + "RoleRequested=" + `${userDetails.requestedRole}`

        const res = await axios.post(url)

        if (res.status === 200) {
            dispatch({ type: "STORE_USER_ROLE", payload: { user: userDetails, role: res.data[0].role } })
            sessionStorage.setItem("userRoleDetail", res.data[0].role)
        }

    } catch (err) {

    }
}

// Load All Admins 
export const loadAdmins = () => async dispatch => {
    try {

        let url = endPoints.user.admins

        const res = await axios.get(url)

        if (res.status === 200) {
            console.log("myadminres", res.data[0].email)
            dispatch({ type: "STORE_ADMINS", payload: res.data[0].email })
        }
    } catch (err) {

    }
}