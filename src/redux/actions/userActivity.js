import axios from "axios";
import { endPoints } from "../../config/Api";

export const loadUserActivity = (mailId) => async dispatch => {

    try {

        const url = endPoints.userManage.activityTrack + "?Params=" + `${mailId}`

        const res = await axios.get(url)

        if (res.status === 200) {
            console.log("userres", res)
            dispatch({ type: "STORE_ACTIVITY", payload: res.data })
        }

    } catch (err) {

        console.error(err)
    }
}