import { combineReducers } from "redux";
import carouselReducer from "./carouselReducer";
import userReducer from "./userReducer";
import mapReducer from "./mapReducer"
import fixtureandinstallerReducer from "./fixtureandinstallerReducer";
import storeInfoReducer from "./storeInfoReducer";
import summaryFilterReducer from "./summaryFilterReducer";
import approvalsReducer from "./approvalsReducer";
import userActivity from "./userActivity";
import installationimages  from "./installationimages";


export default combineReducers({
    user: userReducer,
    map: mapReducer,
    carousel: carouselReducer,
    fixtureinstaller: fixtureandinstallerReducer,
    storeInfo: storeInfoReducer,
    summaryFilter: summaryFilterReducer,
    approvals: approvalsReducer,
    userTrack: userActivity,
    installation: installationimages,
});