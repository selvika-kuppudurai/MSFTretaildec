/* eslint-disable eqeqeq */
/* eslint-disable no-mixed-operators */

import React, { useState, useEffect } from "react";
import { Modal } from "antd"
import { NormalInput } from "../Common/NormalInput"
import { NormalButton } from "../Common/NormalButton";
import AddStoreModal from "./AddStoreModal";
import { checkGlId } from "../../redux/actions/storeInfoAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './Storemodel.scss'

import { BsSearch } from 'react-icons/bs'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from "@material-ui/core/Button"


const store = [
    { num: 123 },
    { num: 123789 },
    { num: 123456 },
    { num: 78920 },
]


const repTool = [
    { num: 745, Retailer: "Best Buy", Storename: "Best Buy Toronto", Region: "North America", Country: "Canada", City: "Toronto", Address: "10 Old Stock Yards Road" },
    { num: 36404, Retailer: "Best Buy", Storename: "Best Buy Toronto", Region: "North America", Country: "Canada", City: "Toronto", Address: "10 Old Stock Yards Road" },
    { num: 67839, Retailer: "Best Buy", Storename: "Best Buy Toronto", Region: "North America", Country: "Canada", City: "Toronto", Address: "10 Old Stock Yards Road" },
    { num: 36849, Retailer: "Best Buy", Storename: "Best Buy Toronto", Region: "North America", Country: "Canada", City: "Toronto", Address: "10 Old Stock Yards Road" },
    { num: 35867, Retailer: "Best Buy", Storename: "Best Buy Toronto", Region: "North America", Country: "Canada", City: "Toronto", Address: "10 Old Stock Yards Road" },
]

const StoreModal = ({ visible, title, cancel, checkGlId, repToolErr, storeError, dispatch, editModal, storeData, detailsModal }) => {

    const [locationId, setLocationId] = useState("")
    const [searchenable, setsearchenable] = useState([])
    const [repToolData, setRepToolData] = useState("")
    const [addModal, setAddModal] = useState(false)



    const handleChange = () => {
        console.log(searchenable)
        if (searchenable.length !== 0) {
            console.log(searchenable)
            checkGlId(searchenable)
            dispatch({ type: "GLID_INPUT", payload: searchenable })
            console.log(storeData)
            console.log(repToolErr)
        } else {

            dispatch({ type: "GLID_CLEAR" })
        }

        setLocationId(searchenable)

    }

    const callfunction = (res) => {
        console.log('9', res)
        setsearchenable(res)
        setLocationId(res)
    }



    const addModalCancel = () => {

        setAddModal(false)
        cancel()
        // dispatch({ type: "GLID_CLEAR" })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('enter press here! ')
            handleChange()
        }
    }
console.log(storeData)
    return (
        // console.log(storeData)
        <div className="addstore__modal" >
            <Modal visible={visible} title={title} footer={null} onCancel={cancel} centered={true}  >
                <div className="p-5 d-flex justify-content-center flex-column align-items-center store__modal">
                    <div>
                        <h4 className="store__modal--title">Global Location ID </h4>
                    </div>



                    <div className={`mt-3 store__modal--input col-lg-10 col-sm-12 ${(storeError || repToolErr) && "input-err"}`}>
                        <TextField
                            onChange={(f) => callfunction(f.target.value)}
                            onKeyPress={handleKeyPress}
                            value={locationId}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <BsSearch size="15" className="cursor-pointer" onClick={() => handleChange()} />
                                    </InputAdornment>
                                )
                            }}
                        />
                        {/* <NormalInput value={locationId} onChange={(data) => handleChange(data)} iconname={BsSearch}/> */}

                    </div>

                    {storeError && <div className="store__modal--err mt-3">
                        <div className="text-align">
                            Store already Exists
                        </div>
                        {storeData && storeData.result && Object.keys(storeData.result).length > 0 && <div className="mt-3 d-flex retailer__details flex-column justify-content-between">

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Retailer </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result.retailer !== null ? storeData.result.retailer : "Not available"}</div>
                            </div>
                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Store Name </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result.storeName !== null ? storeData.result.storeName : "Not available"}</div>
                            </div>

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Region </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result.region}</div>
                            </div>

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Country </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result.country !== null ? storeData.result.country : "Not available"}</div>
                            </div>

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> City </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result.city !== null ? storeData.result.city : "Not available"}</div>
                            </div>

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Address </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-5">{storeData.result.address !== null ? storeData.result.address : "Not available"}</div>
                            </div>
                        </div>}

                    </div>}

                    {storeError && <div className="store__modal--info mt-3">
                        Note: You can only edit the details.Click EDIT to make changes or CANCEL to exit
                    </div>}

                    {repToolErr && <div className="store__modal--err mt-3">
                        Store unavailable in the REP TOOL!
                    </div>}

                    {repToolErr && <div className="store__modal--info mt-3">
                        Note: Please add the store in REP TOOL and then try again
                    </div>}
                    <div className="d-flex flex-column">
                        {/* {repToolData !== "" && repToolData && Object.entries(repToolData).map(([key]) => {

                            return (
                                key !== "num" && <div className="mt-3 d-flex retailer__details justify-content-between">
                                    <span>{key}  </span>
                                     <span>:</span>
                                    <span className="ml-5">{repToolData[key]}</span>
                                </div>
                            )

                        })} */}

                        {storeData && storeData.result && storeData.result.length > 0 && <div className="mt-3 d-flex retailer__details flex-column justify-content-between">

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Retailer </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result[0].retailerName !== null ? storeData.result[0].retailerName : "Not available"}</div>
                            </div>
                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Store Name </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result[0].storeName !== null ? storeData.result[0].storeName : "Not available"}</div>
                            </div>

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Region </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result[0].countryName}</div>
                            </div>

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Country </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result[0].countryName !== null ? storeData.result[0].countryName : "Not available"}</div>
                            </div>

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> City </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-6">{storeData.result[0].cityName !== null ? storeData.result[0].cityName : "Not available"}</div>
                            </div>

                            <div>
                                <div className="col-1"></div>
                                <div className="col-3 columncolor"> Address </div>
                                <div className="col-1">:</div>
                                <div className="ml-5 col-5">{storeData.result[0].addressName !== null ? storeData.result[0].addressName : "Not available"}</div>
                            </div>
                        </div>}
                    </div>

                    {storeError && <div className="store__modal--btns mt-5  d-flex justify-content-center">
                        <div className="mt-4 add__asset__cancel">
                            <Button variant="contained" onClick={cancel} className="store__modal--btns-cancel mr-3" > Cancel</Button>
                        </div>
                        <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={() => setAddModal(true)} className="store__modal--btns-edit" > {repToolData === "" ? "Confirm & Edit" : "Confirm & Next"}</Button>
                        </div>
                        {/* <NormalButton label={"Cancel"} onClick={cancel} className="px-5 store__modal--btns-cancel mr-4 " /> */}
                        {/* <NormalButton label={repToolData === "" ? "Confirm & Edit" : "Confirm & Next"} onClick={() => setAddModal(true)} className="store__modal--btns-edit" /> */}
                    </div>}

                    {repToolErr && <div className="store__modal--btns mt-5  d-flex justify-content-end">
                        <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={cancel}  > Ok</Button>
                        </div>
                        {/* <NormalButton label={"OK"} onClick={cancel} className="store__modal--btns-edit mr-5 " /> */}
                    </div>}

                    {storeData && storeData.result && storeData.result.length > 0 && <div className="store__modal--btns mt-5  justify-content-center d-flex flex-lg-justify-content-end flex-sm-justify-content-center">
                        {/* <NormalButton label={"Cancel"} onClick={cancel} className="px-5 store__modal--btns-cancel mr-4 " /> */}
                        <div className="mt-4 add__asset__cancel">
                            <Button variant="contained" onClick={cancel} className="store__modal--btns-cancel mr-3" > Cancel</Button>
                        </div>
                        <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={() => setAddModal(true)} className="store__modal--btns-edit" > Confirm & Next</Button>
                        </div>
                        {/* <NormalButton label={"Confirm & Next"} onClick={() => setAddModal(true)} className="store__modal--btns-edit" /> */}
                    </div>}

                </div>

            </Modal>

            {(addModal || editModal || detailsModal) && <AddStoreModal visible={(addModal || editModal || detailsModal)} title={title} cancel={addModalCancel} detailsModal={detailsModal} />}
        </div >
    )
}

const mapStateToProps = ({ storeInfo }) => {
    return {
        repToolErr: storeInfo.repToolError,
        storeError: storeInfo.storeError,
        storeData: storeInfo.storeData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        checkGlId,
        dispatch
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreModal);