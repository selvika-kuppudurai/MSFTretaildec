import React, { useState } from "react"
import { NormalInput } from "../Common/NormalInput"
import { NormalSelect1 } from "../Common/Normalselect1"
import UploadComponent from "../Common/UploadComponent"
import { DatePicker, Input } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { AiOutlineCheck } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import "./fixureInstaller.scss"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addStore, loadMaterialOptions } from "../../redux/actions/storeInfoAction"
import SimpleReactValidator from "../../helpers/plugins"
import FilePreview from "../Common/FilePreview";
import { bindActionCreators } from "redux";
import moment from "moment";
import Button from "@material-ui/core/Button"
import CustomTable from "../Common/CustomTable";
import { IconButton, InputAdornment, Paper, TableCell, TableRow, TextareaAutosize } from "@material-ui/core";
import { AddAlertRounded, AddCircleOutline, AddOutlined, ClearRounded, DeleteOutline, DeleteOutlineRounded } from "@material-ui/icons";
import Scanner from "../Common/Scanner";
import { endPoints } from "../../config/Api";
import axios from "axios";
import Dialoguebox from '../../components/Common/dialoguboxforupload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as XLSX from 'xlsx';
import { AiOutlineDownload } from 'react-icons/ai'
import { HiDownload } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'
import { GrCircleInformation } from 'react-icons/gr'
import { AiOutlineUpload } from 'react-icons/ai'
// import './dialoguestyle.scss';
// import Button from "@material-ui/core/Button"
import { GrFormClose } from 'react-icons/gr';
import LoaderIcon from "react-loader-icon";

import { CSVLink, CSVDownload } from "react-csv";

import CSVicon from '../../assets/images/CSVicon.png'

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Countdown from 'react-countdown';
import { objectEach, Time } from "highcharts";
// ../../redux/actions/userActivity
import { loadUserActivity } from '../../redux/actions/userActivity';
// import { of, from, Observable } from "rxjs";
// import { map, mergeMap } from "rxjs/operators";

import { AxiosResponse } from 'axios';
// import axios from "axios";

// import TextFi    eld from '@material-ui/core/TextField';


import { Audio } from 'react-loader-spinner'
import { ThrottlingConstants } from "@azure/msal-common/dist/utils/Constants";
import { ClientAuthError } from "msal";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const columns = [
    { id: 'Model', label: 'Model', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Fixture', label: 'Fixture', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Fixture Description', label: 'Fixture Description', className: "text-c2 fw-700", required: false, width: "14%" },
    { id: 'Asset Id', label: 'Asset Id', className: "text-c2 fw-700", required: false, width: "12%" },
    // { id: 'Previous Asset Id', label: 'Previous Asset Id', className: "text-c2 fw-700", required: false, width: "12%" },
    //  { id: 'Cost', label: 'Cost', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Status', label: 'Status', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Installer', label: 'Installer', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Installer Contact', label: 'Installer Contact', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Installer Phone', label: 'Installer Phone', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Actual', label: 'Actual Installation Date', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Propesed', label: 'Proposed Installation Date', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Action', label: 'Action', className: "text-c2 fw-700", width: "3%" },

];

// csv header
const headerforcsv = [{ key: 'model', label: 'Model' },
{ key: 'sku', label: 'Fixture' },
{ key: 'fixtureDescription', label: 'Fixture Description' },
{ key: 'assetTagId', label: 'Asset Id' },
{ key: 'status', label: 'Status' },
{ key: 'installerName', label: 'Installer' },
{ key: 'installerContact', label: 'Installer Contact' },
{ key: 'installerPhone', label: 'Installer Phone' },
{ key: 'actualInstallationDate', label: 'Actual Installation Date' },
{ key: 'proposedInstallationDate', label: 'Proposed Installation Date' },
]

let val = Number

let valassign = []
let checkboolean = false
var dialoguebox = false;

let validatingassetduplcate = false

let validationcall = []

// var vall = []

class FixtureInstaller extends React.Component {
    constructor(props) {
        super(props);
        this.csvLink = React.createRef();
        const hiddenFileInput = React.createRef();
    }

    state = {

        formFields: {
            materialInfoList: [
                {
                    model: "",
                    sku: "",
                    fixtureDescription: "",
                    assetTagId: "",
                    assetError: false,
                    assetDuplicate: false,
                    assetExists: false,
                    assetDisable: true,
                    wayfinder: false,
                    previousAssetTag: "",
                    fixtureCost: "",
                    status: "",
                    installerName: "",
                    installerContact: "",
                    installerPhone: "",
                    actualInstallationDate: "",
                    proposedInstallationDate: "",
                    deleteBtn: true,
                    fieldDisable: false,
                    comments: '',
                    dialoguebox: false,
                    editaddset: false,
                    installationimagedisable: false,
                    colorchange: false,
                    count: 0,
                    LastAssetFlag: 0,
                    fixturedescriptionforexisting: "",
                    fixturesforexisting: "",





                    modelOptions: [],
                    fixtureOptions: [],
                    fixtureDescOptions: []
                }
            ],
            materialinfolist2: [


            ],
          
            dateduplicates: [],
            idxtoupdate: [],
            materialvalue: [{
                assettag: false,
            }
            ],
            modelimport: '',
            glidvalues: '',
           
            checkassetforupload: false,
            copyformglid: false,
            countlength: 0,


            dialogue: false,
            clickasset: false,

            materialinforvalidationcheck: false,
            imagevalidationcheck: false,
            assetdeplicatecheck: false,

            



            InstallationFiles: [],
            Hero_shot: [],
            Main_front: [],
            Left_front: [],
            Right_front: [],
            Main_rear: [],
            Best_side: [],
            SignatureFiles: [],
            excelfile: [],


            Installationimagelink: [],
            Hero_shotLink: [],
            Main_frontLink: [],
            Left_frontLink: [],
            Right_frontLink: [],
            Main_rearLink: [],
            Best_sideLink: [],
            siganturelink: [],
            excelfileLink: []
        },
        fileNameduplicate: '',
        imagevalidation: false,
        materialinfovalidation: false,
        assetduplicatevalidation: true,
        assetCheckLoader: false,
        formLoader: false,
        warningbox: false,
        clickallfunctionlity: true,
        dialogueboxforautofill: false,
        showRemainChars: false,
        showsumbitbutton: true,
        dialogueboxforbeforeupload: false,
        uploadiconshow: true,
        showsubmitbuttonvalidation: false,
        showvalidationinformation: false,
        checkassetfunctionvalidationcheck: false,
        vali: false,
        loadingvalidation: false,
        showcopyinput: false,
        checkassetsuccessfulmessage: false,
        validateasset: [],
        table__loader: true,
        
        
        name: '',
        typing: false,
        typingTimeout: 0,
        copyerrormessage: false,
        copysuccessfullymessage: false,


        maxLength: 200
    }

    // formFields.Comments = ''
    handleCancel = () => {

        this.setdialogueboxfor1(false)
    }



    setdialogueboxfor1 = (val) => {

        if (this.props.userDetails.role === 'Installer') {
            if (val) {
                if (this.installationimagevalidation.allValid()) {
                    let { formFields } = this.state
                    formFields['dialogue'] = false;
                    this.setState({ formFields })
                } else {
                    if (!this.installationimagevalidation.allValid()) {
                        this.installationimagevalidation.showMessages()
                    }

                }
            } else {
                let { formFields } = this.state
                formFields['dialogue'] = false;
                this.setState({ formFields })
            }
        } else {
            let { formFields } = this.state
            formFields['dialogue'] = false;
            this.setState({ formFields })
        }
    }

    addMaterialRow = () => {

        const { formFields: { materialInfoList } } = this.state
        const {formFields} = this.state


        const { storeDrpdwns, userDetails } = this.props

        // let i = formFields.countlength + 1
        // console.log('count', i)
        // formFields.countlength = i
        // console.log('count', formFields.countlength)
        // this.setState({formFields})


        materialInfoList.push({
            model: "",
            sku: "",
            fixtureDescription: "",
            assetTagId: "",
            assetDisable: true,
            assetDuplicate: false,
            assetExists: false,
            assetError: false,
            wayfinder: false,
            previousAssetTag: "",
            fixtureCost: "",
            status: "",
            installerName: "",
            installerContact: "",
            installerPhone: "",
            actualInstallationDate: "",
            proposedInstallationDate: "",
            deleteBtn: true,
            clickallfunctionlity: true,
            dialogueboxforautofill: false,
            colorchange: false,
            count: 0,
            LastAssetFlag: 0,
            fixturedescriptionforexisting: [],
            fixturesforexisting: [],
            fieldDisable: (userDetails.role === "Installer" || "Fixture Manufacturer") ? false : true,
            modelOptions: storeDrpdwns.model ? storeDrpdwns.model : [],
            fixtureOptions: storeDrpdwns.fixtures ? storeDrpdwns.fixtures : [],
            fixtureDescOptions: storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : [],
        })

        this.setState({ materialInfoList })
        console.log('vbvbvbvbvbvvbv', materialInfoList)

    }
    setdialoguebox = (val) => {

        this.state.formFields.materialInfoList.dialoguebox = val
        dialoguebox = val

    }
    renderer = ({ hours, minutes, seconds, completed }) => {
        const { formFields } = this.state

        if (completed) {
            // Render a completed state


            //    formFields.showsumbitbutton = true;

            return <span>Next submission can be done in :{minutes}:{seconds}</span>;
        } else {
            // Render a countdown
            //   this.setState({ showsumbitbutton: true })
            // formFields.showsumbitbutton = false;
            return <span>Next submission can be done in :{minutes}:{seconds}</span>;

        }
    };

    handleMaterialInfoList = async (index, type) => {

        const { formFields: { materialInfoList } } = this.state
        // const {formFields}
       

        const { formFields } = this.state
        console.log('countlenth', formFields)
        formFields['clickasset'] = true

        // console.log(formFields.showsumbitbutton)

        // console.log('tete', Date().toLocaleString())
        // let date1 =  Date().toLocaleString()
        // var today = new Date();
        // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // console.log(new Date().toISOString())
        // console.log(new Date().toISOString().split('T')[1].split(':')[1] - this.props.activity.result.approvalDate.split('T')[1].split(':')[1])
        // console.log('tete', this.props.activity.result.approvalDate)

        // if(this.props.activity.result != '' && this.props.activity.result.approvalDate > this.props.activity.result.systemUpdatedDate){
        //     console.log('if', this.props.activity.result.systemUpdatedDate.split('T')[1].split(':')[1]-this.props.activity.result.approvalDate.split('T')[1].split(':')[1])
        // } else {
        //     console.log('else')
        // }

        if (type === "add") {

            materialInfoList['editaddset'] = true
            if (this.materialInfoValidator.allValid() && materialInfoList.every(d => !d.assetDuplicate)) {

                this.addMaterialRow()

                // if (materialInfoList[materialInfoList.length - 1].assetTagId !== "") {
                //     const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + materialInfoList[materialInfoList.length - 1].assetTagId

                //     const res = await axios.get(url)

                //     if (res.data.message === "Assettagid already Exists") {
                //         materialInfoList[materialInfoList.length - 1].assetDuplicate = true
                //     } else {
                //         this.addMaterialRow()
                //     }

                // } else {
                //     this.addMaterialRow()
                // }
                this.materialInfoValidator.hideMessages();
            } else {
                this.materialInfoValidator.showMessages()
            }
        } else {
            console.log('lengthh', this.props.storeDrpdwns.materialInfo.length)
            if(materialInfoList.length > this.props.storeDrpdwns.materialInfo.length  ) {
                // this.props.storeDrpdwns.materialInfo.map(res => {

                // })
                if(this.props.storeDrpdwns.materialInfo.length <= index){
                for(let i = index; i < materialInfoList.length; i++){
                    materialInfoList[i].count = materialInfoList[i].count - 1
                }
            }
            }

            if (materialInfoList.length >= 2) {
                materialInfoList.splice(index, 1)
                if (index <= this.props.storeDrpdwns.materialInfo.length) {

                    this.props.storeDrpdwns.materialInfo.splice(index, 1)
                }
            }
        }
    
        this.setState({ materialInfoList })
        console.log('countcheck',materialInfoList)
    }

    // checking assettagid in database
    checkAsset = async (value, idx, validatecheck) => {
        let formFields = this.state
        // if (this.state.typingTimeout) {
        //     clearTimeout(this.state.typingTimeout);
        // }
        const { formFields: { materialInfoList } } = this.state


        if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length >= idx + 1) {
            if (materialInfoList[idx].assetTagId != this.props.storeDrpdwns.materialInfo[idx].assetTagId) {

                if (value !== "") {
                    this.setState({ assetCheckLoader: true })
                    const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + value
                    const res = await axios.get(url)

                    // fetch(url).then(response => console.log(response)).then(data => console.log(data))
                    // let res
                    if (res.data.message === "Assettagid already Exists") {
                        materialInfoList[idx].assetDuplicate = true
                        /// this.setState({checkassetfunctionvalidationcheck: false})
                        // this.setState({loadingvalidation: true})

                    } else {
                        materialInfoList[idx].assetDuplicate = false
                        /// this.setState({checkassetfunctionvalidationcheck: true})
                    }
                    // this.setState({
                    //     name: value,
                    //     typing: false,
                    //     typingTimeout: setTimeout(function async () {

                    //       }, 5000)
                    //  });

                    validatingassetduplcate = true
                    // this.setState({ loadingvalidation: true })
                } else {
                    materialInfoList[idx].assetDuplicate = false
                    validatingassetduplcate = true
                    // this.setState({checkassetfunctionvalidationcheck: false})
                }
            }
            else {
                materialInfoList[idx].assetDuplicate = false
                // this.setState({ loadingvalidation: true })
                validatingassetduplcate = true
                /// this.setState({checkassetfunctionvalidationcheck: true})
            }
        } else {

            if (value !== "") {
                this.setState({ assetCheckLoader: true })
                const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + value
                const res = await axios.get(url)

                if (res.data.message === "Assettagid already Exists") {
                    materialInfoList[idx].assetDuplicate = true
                    ///  this.setState({checkassetfunctionvalidationcheck: false})

                } else {
                    materialInfoList[idx].assetDuplicate = false
                    ///   this.setState({checkassetfunctionvalidationcheck: true})
                }
                // this.setState({ loadingvalidation: true })
                validatingassetduplcate = true
            } else {
                materialInfoList[idx].assetDuplicate = false
                // this.setState({checkassetfunctionvalidationcheck: false})
                validatingassetduplcate = true
                // this.setState({ loadingvalidation: true })

            }
        }
        //     if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length >= idx + 1) {
        //     for(let z=0 ; z<this.props.storeDrpdwns.materialInfo.length;z++){
        //         if(this.props.storeDrpdwns.materialInfo[z].assetTagId != ""){
        //         // for(let x = z + 1; x<materialInfoList.length;x++){
        //             console.log('checkassetif444',materialInfoList[z].assetTagId)
        //             // console.log('checkassetif444',materialInfoList[x].assetTagId)

        //             if(this.props.storeDrpdwns.materialInfo[z].assetTagId === materialInfoList[idx].assetTagId){
        //                 materialInfoList[idx].assetDuplicate = true
        //             }
        //         // }
        //     }
        //     }
        // }

        //checking new assettagid duplicate or not while typing
        // if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length <= idx + 1) {
        for (let i = 0; i < materialInfoList.length; i++) {
            if (materialInfoList[i].assetTagId != "") {
                if (i !== idx) {
                    if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length >= idx + 1) {
                        if (this.props.storeDrpdwns.materialInfo[idx].assetTagId != materialInfoList[idx].assetTagId) {
                            if (materialInfoList[i].assetTagId === materialInfoList[idx].assetTagId) {
                                materialInfoList[idx].assetDuplicate = true
                            }
                        }
                    } else {
                        if (materialInfoList[i].assetTagId === materialInfoList[idx].assetTagId) {
                            materialInfoList[idx].assetDuplicate = true
                        }
                    }
                }
            }
        }
        // } 
        // else {
        //     for (let i = 0; i < this.props.storeDrpdwns.materialInfo.length; i++) {
        //         // console.log('bbbbbb',this.props.storeDrpdwns.materialInfo[idx].assetTagId)
        //         // console.log('bbbbbb',materialInfoList[idx].assetTagId)
        //         console.log('bbbb', materialInfoList[i].assetTagId)
        //         console.log('bbbb',materialInfoList[idx].assetTagId)
        //         console.log('bbbb', i)
        //         console.log('bbbb', idx)
        //         if (this.props.storeDrpdwns.materialInfo[i].assetTagId != "") {
        //         if(i !== idx){
        //           if(this.props.storeDrpdwns.materialInfo[idx].assetTagId != materialInfoList[idx].assetTagId){
        //                 if (materialInfoList[i].assetTagId === materialInfoList[idx].assetTagId) {
        //                     materialInfoList[idx].assetDuplicate = true
        //                 }
        //             }
        //         } else {
        //             console.log('bbbb')
        //             if(this.props.storeDrpdwns.materialInfo[idx].assetTagId != materialInfoList[idx].assetTagId){
        //             if (materialInfoList[i].assetTagId === materialInfoList[idx].assetTagId) {
        //                 materialInfoList[idx].assetDuplicate = true
        //             }
        //         }
        //         }

        //         }
        //     }
        // }
        // console.log('validatefunction',validatingassetduplcate)
        // if (validatingassetduplcate) {
        //     if (validatecheck === 'validate') {
        //         console.log('validatecheck', formFields.materialInfoList)
        //            if(formFields.materialInfoList.every(d => !d.assetDuplicate)){
        //             this.setState({checkassetfunctionvalidationcheck: true})
        //            } else {
        //             this.setState({checkassetfunctionvalidationcheck: false})
        //            }
        //            this.setState({ loadingvalidation: true })
        //     }
        // }



        // const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + item.assetTagId
        // const res = await axios.get(url)


        // if(i < idx){
        //     this.setState({ assetCheckLoader: false })
        //     materialInfoList[idx].assetExists = false
        // } else {
        //     materialInfoList[idx].assetExists = true

        // }
        // }

        // console.log(materialInfoList[idx].assetExists)


        this.setState({ materialInfoList, assetCheckLoader: false })

    }


    storeInput = ({ target: { value, name } }) => {

        let { formFields } = Object.assign({}, this.state);
        formFields[name] = value
        this.setState({ formFields })
    }


    splitUrlFiles = (name) => {

        const { formFields } = this.state;

        if (name === "Excelfile") {

            let excelfiles = formFields[name]

            formFields["excelfileLink"] = excelfiles.filter(d => d.name === undefined)

            formFields["excelfile"] = excelfiles.filter(d => d.name !== undefined)

        }

        if (name === "Heroshotfiles") {

            let heroShotfiles = formFields[name]

            formFields["Hero_shotLink"] = heroShotfiles.filter(d => d.name === undefined)

            formFields["Hero_shot"] = heroShotfiles.filter(d => d.name !== undefined)

        }
        if (name === "Mainfrontfiles") {

            let mainfrontfiles = formFields[name]

            formFields["Main_frontLink"] = mainfrontfiles.filter(d => d.name === undefined)

            formFields["Main_front"] = mainfrontfiles.filter(d => d.name !== undefined)

        }
        if (name === "Leftfrontfiles") {

            let leftfrontfiles = formFields[name]

            formFields["Left_frontLink"] = leftfrontfiles.filter(d => d.name === undefined)

            formFields["Left_front"] = leftfrontfiles.filter(d => d.name !== undefined)

        }
        if (name === "Rightfrontfiles") {

            let rightfrontfiles = formFields[name]

            formFields["Right_frontLink"] = rightfrontfiles.filter(d => d.name === undefined)

            formFields["Right_front"] = rightfrontfiles.filter(d => d.name !== undefined)

        }
        if (name === "Mainrearfiles") {

            let mainrearfiles = formFields[name]

            formFields["Main_rearLink"] = mainrearfiles.filter(d => d.name === undefined)

            formFields["Main_rear"] = mainrearfiles.filter(d => d.name !== undefined)

        }
        if (name === "Bestsidefiles") {

            let bestsidefiles = formFields[name]

            formFields["Best_sideLink"] = bestsidefiles.filter(d => d.name === undefined)

            formFields["Best_side"] = bestsidefiles.filter(d => d.name !== undefined)

        }

        if (name === "Signature") {

            let signatureFiles = formFields[name]

            formFields["siganturelink"] = signatureFiles.filter(d => d.name === undefined)

            formFields["SignatureFiles"] = signatureFiles.filter(d => d.name !== undefined)

        }



        this.setState({ formFields })


    }

    storeFiles = (data, name) => {


        let { formFields } = Object.assign({}, this.state);

        var arr = [];
        for (var i = 0; i < data.target.files.length; i++) {

            arr.push(data.target.files[i]);
        }



        if (formFields[name] && formFields[name].length > 0) {

            for (let i = 0; i < data.target.files.length; i++) {

                formFields[name].push(data.target.files[i])
            }

        } else {
            formFields[name] = arr
        }

        // formFields[name] = arr



        this.setState({ formFields }, () => this.splitUrlFiles(name))
    }

    onSort = (sortKey) => {


    }
    handlechangedforreplicatedateformat() {
        console.log('table__loader', this.state)
        this.setState({ table__loader: false })
        this.setState({ warningbox: false })
        const { formFields: { materialInfoList } } = this.state
        const { formFields: { materialinfolist2 } } = this.state
        const { formFields } = this.state

        this.state.formFields.materialInfoList = materialinfolist2
        this.setState({ checkassetsuccessfulmessage: true })
        setTimeout(() => {
            // formFields.checkassetsuccessfulmessage = false
            return this.setState({
                checkassetsuccessfulmessage: false,
            });
        }, 2000);
        // this.setState({formFields})


        this.state.formFields.checkassetforupload = true
        this.state.formFields.copyformglid = true

        this.setState({ materialInfoList })

        this.setState({ fileNameduplicate: '' })
        this.setState({ table__loader: true })
        console.log('table__loader', this.state)

    }
    handlechangedforreplicate() {

        const { formFields: { dateduplicates } } = this.state

        const { formFields } = this.state


        // console.log('table__loader', this.state)
        this.setState({ uploadiconshow: true })
        // this.state.formFields.materialInfoList = []
        // materialinfolist2.shift()

        if (dateduplicates.includes('no')) {
            this.setState({ warningbox: true })
            // this.setState({table__loader: false})
            // console.log('table__loader', this.state)
        } else {
            // console.log('mss', materialinfolist2)
            this.setState({ table__loader: false })
            console.log('table__loader', this.state)

            this.handlechangedforreplicatedateformat()
        }

        // console.log('mss', this.state.formFields.materialInfoList)




    }
    handleokayfordateformatdialoguebox() {
        this.handlechangedforreplicatedateformat()

    }

    ExcelDateToJSDate(date) {
        let converted_date = new Date(Math.round((date - 25569) * 864e5));
        converted_date = String(converted_date).slice(4, 15)
        date = converted_date.split(" ")
        let day = date[1];
        let month = date[0];
        month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
        if (month.toString().length <= 1)
            month = '0' + month
        let year = date[2];


        return String(day + '-' + month + '-' + year.slice(2, 4))
    }

    handleUpload = (e) => {
        const { formFields: { dateduplicates } } = this.state
        const formFields = this.state
        const warningbox = []
        let v = false
        this.state.formFields.materialinfolist2 = []

        this.setState({ fileNameduplicate: e.target.files[0].name })
        // console.log('vvvvvvvvvvv', this.state.formFields.fileNameduplicate)
        const existinginformtion = this.props.storeDrpdwns.materialInfo
        // console.log('vvvvvvvvvvv ', existinginformtion)
        const { formFields: { materialInfoList } } = this.state
        const { formFields: { materialinfolist2 } } = this.state
        // this.state.formFields.materialinfolist2 = []
        // console.log('material', materialinfolist2)
        // console.log('dataParse',formFields)
        e.preventDefault();


        var files = e.target.files, f = files[0];
        // const dataParse
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            // this.ExcelDateToJSDate(44662.00011574074);
            // console.log('dataparse',)
            // checkkk();
            // console.log('dataparse', d1)
            let readedData = XLSX.read(data, { type: 'binary' });
            // console.log('dataParse', readedData)
            const wsname = readedData.SheetNames[0];
            // console.log('dataParse', wsname)
            const ws = readedData.Sheets[wsname];
            // console.log('dataParse', ws)
            // Object.keys(ws).length
            // for (i =0; i< Object.keys(ws).length; i++){

            // }
            //             /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
            dataParse.shift()

            // console.log('dataParse', dataParse)
            // console.log('dataParse', formFields)
            var sampleobject = {}
            const materailinfo = []
            dataParse.map(item => {
                let dateformat
                let dateformatforactual
                if (item.length > 0) {

                    // console.log('lengthhhhhh',this.props.storeDrpdwns.materialInfo)
                    // console.log('lengthhhhhh',this.props.storeDrpdwns)
                    // console.log('lengthhhhhh', existinginformtion)
                    // console.log('lengthhhhhh', typeof (item[9]))


                    let co = false
                    // console.log('existinginformtion', existinginformtion)

                    existinginformtion && existinginformtion.length > 0 && existinginformtion.map(res => {
                        // console.log('item', res.installerPhone)
                        // console.log('item', item[7])
                        // console.log('vvvvvvvvvvv', res.sku === (item[1] === undefined ? '' : item[1]))
                        // console.log('vvvvvvvvvvv', res.fixtureDescription === (item[2] === undefined ? '' : item[2]))
                        // console.log('vvvvvvvvvvv', res.assetTagId === (item[3] === undefined ? '' : item[3].toString()))
                        // console.log('vvvvvvvvvvv', res.status === (item[4] === undefined ? '' : item[4]))
                        // console.log('vvvvvvvvvvv', res.installerName === (item[5] === undefined ? '' : item[5]))
                        // console.log('vvvvvvvvvvv', res.installerContact === (item[6] === undefined ? '' : String(item[6])))
                        // console.log('vvvvvvvvvvv', res.installerPhone === (item[7] === undefined ? null : String(item[7])))
                        // console.log('vvvvvvvvvvv', res.actualInstallationDate === (item[8] === undefined ? null : item[8]))
                        // console.log('vvvvvvvvvvv', res.proposedInstallationDate === (item[9] === undefined ? '' : item[9]))
                        // console.log('vvvvvvvvvvv', res.model === (item[0] === undefined ? '' : item[0]) && res.sku === (item[1] === undefined ? '' : item[1]) && res.fixtureDescription === (item[2] === undefined ? '' : item[2]) && res.assetTagId === (item[3] === undefined ? '' : item[3]) && res.status === (item[4] === undefined ? '' : item[4]) && res.installerName === (item[5] === undefined ? '' : item[5]) && res.installerContact === (item[6] === undefined ? '' : String(item[6])) && res.installerPhone === (item[7] === undefined ? null : item[7]) && res.actualInstallationDate === (item[8] === undefined ? '' : item[8]) && res.proposedInstallationDate === (item[9] === undefined ? '' : item[9]))
                        if (res.model === (item[0] === undefined ? '' : item[0]) && res.sku === (item[1] === undefined ? '' : item[1]) && res.fixtureDescription === (item[2] === undefined ? '' : item[2]) && res.assetTagId === (item[3] === undefined ? '' : item[3].toString()) && res.status === (item[4] === undefined ? '' : item[4]) && res.installerName === (item[5] === undefined ? '' : item[5]) && res.installerContact === (item[6] === undefined ? '' : String(item[6])) && res.installerPhone === (item[7] === undefined ? res.installerPhone === null ? null : '' : String(item[7])) && res.actualInstallationDate === (item[8] === undefined ? null : item[8]) && res.proposedInstallationDate === (item[9] === undefined ? '' : item[9])) {
                            co = true
                        }
                    })
                    if (typeof (item[9]) === 'string') {
                        if (co) {
                            warningbox.push('yes')
                            dateduplicates.push('yes')
                            // console.log('cooooo', item[9].split('T')[0].split('-')[0])

                            if (item[9].split('T')[0].split('-')[0] !== 1900) {
                                dateformat = item[9].split('T')[0]
                            } else {
                                dateformat = ''
                            }

                        } else {
                            console.log('item[9]', item[9])
                            warningbox.push('no')
                            // console.log('hhhh', warningbox)
                            if (item[9].split('T').length > 1) {
                                dateduplicates.push('yes')
                                console.log('item[9]', item[9].split('T')[0].split('-')[1])

                                if (item[9].split('T')[0].split('-')[1] <= 12 && item[9].split('T')[0].split('-')[2] <= 31) {
                                    console.log(item[9].split('T')[0].split('-')[1])
                                    dateformat = item[9].split('T')[0]
                                } else if (item[9].split('T')[0].split('/')[1] <= 12 && item[9].split('T')[0].split('/')[2] <= 31) {
                                    dateformat = item[9].split('T')[0]
                                } else {
                                    dateformat = ''
                                    dateduplicates.push('no')
                                }

                            } else {
                                dateformat = ''
                                dateduplicates.push('no')
                            }
                        }

                    } else {
                        warningbox.push('yes')
                        dateduplicates.push('yes')
                        let converted_date = new Date(Math.round((item[9] - 25569) * 864e5));
                        converted_date = String(converted_date).slice(4, 15)
                        let date = converted_date.split(" ")
                        let day = date[1];
                        let month = date[0];
                        month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
                        if (month.toString().length <= 1)
                            month = '0' + month
                        let year = date[2];
                        if (year === 1900) {
                            dateformat = ''
                        }
                        else {
                            dateformat = String(day + '-' + month + '-' + year)
                        }
                    }

                    if (typeof (item[8]) === 'string') {
                        if (co) {
                            warningbox.push('yes')
                            dateduplicates.push('yes')
                            // console.log('cooooo', item[9].split('T')[0].split('-')[0])

                            if (item[8].split('T')[0].split('-')[0] !== 1900) {
                                dateformatforactual = item[8].split('T')[0]
                            } else {
                                dateformatforactual = ''
                            }

                        } else {
                            warningbox.push('no')
                            // console.log('hhhh', warningbox)
                            if (item[8].split('T').length > 1) {
                                // dateduplicates.push('yes')
                                // dateformatforactual = item[8].split('T')[0]
                                dateduplicates.push('yes')
                                console.log('item[9]', item[8].split('T')[0].split('-')[1])

                                if (item[8].split('T')[0].split('-')[1] <= 12 && item[8].split('T')[0].split('-')[2] <= 31) {
                                    console.log(item[8].split('T')[0].split('-')[1])
                                    dateformatforactual = item[8].split('T')[0]
                                } else if (item[8].split('T')[0].split('/')[1] <= 12 && item[8].split('T')[0].split('/')[2] <= 31) {
                                    dateformatforactual = item[8].split('T')[0]
                                } else {
                                    dateformatforactual = ''
                                    dateduplicates.push('no')
                                }
                            } else {
                                dateformatforactual = ''
                                dateduplicates.push('no')
                            }
                        }

                    } else {

                        warningbox.push('yes')
                        dateduplicates.push('yes')
                        let converted_date = new Date(Math.round((item[8] - 25569) * 864e5));
                        converted_date = String(converted_date).slice(4, 15)
                        let date = converted_date.split(" ")
                        let day = date[1];
                        let month = date[0];
                        month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
                        if (month.toString().length <= 1)
                            month = '0' + month
                        let year = date[2];
                        if (year === 1900) {
                            dateformatforactual = ''
                        }
                        else {
                            dateformatforactual = String(day + '-' + month + '-' + year)
                        }
                    }
                    //    console.log('item[8]', item[9].getDate())
                    materialinfolist2.push({
                        model: (item[0] === undefined) ? '' : item[0],
                        sku: (item[1] === undefined) ? '' : item[1],
                        fixtureDescription: (item[2] === undefined) ? '' : item[2],
                        assetTagId: (item[3] === undefined) ? '' : item[3],
                        status: (item[4] === undefined) ? '' : item[4],
                        installerName: (item[5] === undefined) ? '' : item[5],
                        installerContact: (item[6] === undefined) ? '' : item[6],
                        installerPhone: (item[7] === undefined) ? '' : item[7],
                        actualInstallationDate: (item[8] === undefined) ? '' : dateformatforactual,
                        proposedInstallationDate: (item[9] === undefined) ? '' : dateformat,
                        fixtureDescOptions: materialInfoList[0].fixtureDescOptions,
                        fixtureOptions: materialInfoList[0].fixtureOptions,
                        modelOptions: materialInfoList[0].modelOptions,
                        assetDisable: false,
                        existingrecord: co,
                        existingrecordforcopy: false,
                        fieldDisable: true,
                        fixtureCost: "",
                        aid: null,
                        pid: null
                    })
                    // sampleobject.model = (item[0] === undefined) ? '' : item[0]
                    // sampleobject.sku = (item[1] === undefined) ? '' : item[1]
                    // sampleobject.fixtureDescription = (item[2] === undefined) ? '' : item[2]
                    // sampleobject.assetTagId = (item[3] === undefined) ? '' : item[3]
                    // sampleobject.previousAssetTag = (item[4] === undefined) ? '' : item[4]
                    // sampleobject.status = (item[5] === undefined) ? '' : item[5]
                    // sampleobject.installerName = (item[6] === undefined) ? '' : item[6]
                    // sampleobject.installerContact = (item[7] === undefined) ? '' : item[7]
                    // sampleobject.installerPhone = (item[8] === undefined) ? '' : item[8]
                    // sampleobject.actualInstallationDate = (item[9] === undefined) ? '' : item[9]
                    // sampleobject.proposedInstallationDate = (item[10] === undefined) ? '' : item[10]
                    // console.log('dataparse', sampleobject)
                    // materailinfo.push(sampleobject)
                    // sampleobject = []
                    // console.log('dataParse', materialinfolist2)
                }
            })



            // materialinfolist2.push(materailinfo)




            v = true
            // setFileUploaded(dataParse);
        };
        // console.log('ddddd', warningbox)
        if (v && warningbox.length > 0 && warningbox.includes('no')) {
            console.log('ddddd', warningbox)
            this.setState({ warningbox: true })
            console.log('ddddd', this.state.formFields.warningbox)
        }
        this.setState({ materialinfolist2 })

        // console.log('dataParse', materialinfolist2)
        reader.readAsBinaryString(f)
        // e.target.value = ''/
    }
    handleSubmit = () => {
        const { formFields } = this.state;
        this.validatefunction('sumbit')
        // console.log('vallll',vallll)



        // formFields.Comments = '';
    }

    setdialoguebox = () => {
        let { formFields } = this.state
        formFields['dialogue'] = true;
        this.setState({ formFields })
    }
    // Disable past dates
    disabledDate = (current) => {


        var startdate = moment();
        startdate = startdate.add(1, 'year');
        startdate = startdate.format('YYYY-MM-DD');

        let currentDate = moment().format('YYYY-MM-DD');

        return current && current < moment(currentDate, "YYYY-MM-DD")
    };


    UNSAFE_componentWillMount() {
        this.validator = new SimpleReactValidator({
            element: (message) => <span className="error-message font-md">{message}</span>,
            autoForceUpdate: this,
        });

        this.materialInfoValidator = new SimpleReactValidator({
            element: (message) => (
                <span className="error-message font-md">{message}</span>
            ),
            autoForceUpdate: this,
        });
        this.installationimagevalidation = new SimpleReactValidator({
            element: (message) => (
                <span className="error-message font-md">{message}</span>
            ),
            autoForceUpdate: this,
        });
    }

    getOptions = () => {
        const { storeData, storeDrpdwns } = this.props

        const { formFields } = this.state;



        formFields.statusOptions = storeDrpdwns.status ? storeDrpdwns.status : []

        // formFields.materialInfoList.modelOptions = storeDrpdwns.model ? storeDrpdwns.model : []
        // formFields.fixtureOptions = storeDrpdwns.fixtures ? storeDrpdwns.fixtures : []
        // formFields.fixtureDescOptions = storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : []



        this.setState({ formFields })
    }

    getFormDetails = () => {




        const { storeData, storeDrpdwns } = this.props

        let { formFields } = Object.assign({}, this.state);
        console.log('getformdetails')


        if (storeDrpdwns.materialInfo) {
            console.log('getformdetailsif')

            // inject "assetDisable" property
            let updatedList = storeDrpdwns.materialInfo.map((d) => {
                var o = Object.assign({}, d)
                if (d.assetTagId && d.assetTagId !== "null") {
                    o.assetDisable = false
                } else {
                    o.assetDisable = true
                }
                o.fieldDisable = true
                o.modelOptions = []
                o.fixtureOptions = []
                o.fixtureDescOptions = []
                return o
            })

            updatedList.map((d, index) => {
                console.log('d.model',d.model)
                if(d.model === "MISX") {
                    d.fixturesforexisting = storeDrpdwns.fixturesforexisting ? storeDrpdwns.fixturesforexisting.misxFixture : []
                } else if (d.model === 'Surface'){
                    d.fixturesforexisting = storeDrpdwns.fixturesforexisting ? storeDrpdwns.fixturesforexisting.surfaceFixture : []

                }
                d.fixturedescriptionforexisting = storeDrpdwns.fixturedescriptionforexisting[index] ? storeDrpdwns.fixturedescriptionforexisting[index] : []
                d.modelOptions = storeDrpdwns.model ? storeDrpdwns.model : []
                d.fixtureOptions = storeDrpdwns.fixtures ? storeDrpdwns.fixtures : []
                d.fixtureDescOptions = storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : []
            })


            formFields.materialInfoList = updatedList




        } else {
            console.log('getformdetailselse')

            formFields.materialInfoList.map((d) => {
                d.modelOptions = storeDrpdwns.model ? storeDrpdwns.model : []
                d.fixtureOptions = storeDrpdwns.fixtures ? storeDrpdwns.fixtures : []
                d.fixtureDescOptions = storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : []
            })

            this.setState({ formFields })
        }

        // console.log('cc', storeData)

        formFields.model = storeData.model ? storeData.model : ""
        formFields.sku = storeData.sku ? storeData.sku : ""

        if (storeData.assetTagId === "null") {

            formFields.assetId = ""
        } else {

            formFields.assetId = storeData.assetTagId ? storeData.assetTagId : ""
        }

        // formFields.assetId = storeData.assetTagId ? storeData.assetTagId : ""
        formFields.fixtureCost = storeData.fixtureCost ? storeData.fixtureCost : ""
        formFields.status = storeData.status ? storeData.status : ""

        formFields.installer = storeData.installerName ? storeData.installerName : ""
        formFields.installerContact = storeData.installerContact ? storeData.installerContact : ""
        formFields.installerPhone = storeData.installerPhone ? storeData.installerPhone : ""
        formFields.deliveryAddress = storeData.deliveryAddress ? storeData.deliveryAddress : ""
        formFields.deliveryCity = storeData.deliveryCity ? storeData.deliveryCity : ""
        formFields.deliveryState = storeData.deliveryState ? storeData.deliveryState : ""
        formFields.deliveryZip = storeData.deliveryZip ? storeData.deliveryZip : ""
        formFields.Comments = storeData.comments ? storeData.comments : ""

        // image links 
        // formFields.Installationimagelink = storeData.installationImage ? storeData.installationImage.split(",") : []

        formFields.siganturelink = storeData.signature ? storeData.signature.split(",") : []
        formFields.Hero_shotLink = storeData.heroShot ? storeData.heroShot.split(",") : []
        formFields.Main_frontLink = storeData.mainFront ? storeData.mainFront.split(",") : []
        formFields.Left_frontLink = storeData.leftFront ? storeData.leftFront.split(",") : []
        formFields.Right_frontLink = storeData.rightFront ? storeData.rightFront.split(",") : []
        formFields.Main_rearLink = storeData.mainRear ? storeData.mainRear.split(",") : []
        formFields.Best_sideLink = storeData.bestSide ? storeData.bestSide.split(",") : []

        // formFields.Hero_shotLink = storeData.
        // image links ends

        // formFields.InstallationImage = storeData.installationImage ? storeData.installationImage.split(",") : []

        formFields.Signature = storeData.signature ? storeData.signature.split(",") : []

        // formFields.siganturelink = storeData.signature ? storeData.signature.split(",") : []
        formFields.Heroshotfiles = storeData.heroShot ? storeData.heroShot.split(",") : []
        formFields.Mainfrontfiles = storeData.mainFront ? storeData.mainFront.split(",") : []
        formFields.Leftfrontfiles = storeData.leftFront ? storeData.leftFront.split(",") : []
        formFields.Rightfrontfiles = storeData.rightFront ? storeData.rightFront.split(",") : []
        formFields.Mainrearfiles = storeData.mainRear ? storeData.mainRear.split(",") : []
        formFields.Bestsidefiles = storeData.bestSide ? storeData.bestSide.split(",") : []

        this.setState({ formFields })
    }

    cancelfunction() {
        checkboolean = false
        this.props.cancelModal()
    }

    getDatafromStore = () => {

        const { fixtureInstallerDetails } = this.props

        const { formFields } = this.state;


        formFields.model = fixtureInstallerDetails.model ? fixtureInstallerDetails.model : ""
        formFields.sku = fixtureInstallerDetails.sku ? fixtureInstallerDetails.sku : ""
        formFields.assetId = fixtureInstallerDetails.assetTagId ? fixtureInstallerDetails.assetTagId : ""
        formFields.fixtureCost = fixtureInstallerDetails.fixtureCost ? fixtureInstallerDetails.fixtureCost : ""
        formFields.status = fixtureInstallerDetails.status ? fixtureInstallerDetails.status : ""
        formFields.installer = fixtureInstallerDetails.installerName ? fixtureInstallerDetails.installerName : ""
        formFields.installerContact = fixtureInstallerDetails.installerContact ? fixtureInstallerDetails.installerContact : ""
        formFields.installerPhone = fixtureInstallerDetails.installerPhone ? fixtureInstallerDetails.installerPhone : ""
        formFields.deliveryAddress = fixtureInstallerDetails.deliveryAddress ? fixtureInstallerDetails.deliveryAddress : ""
        formFields.deliveryCity = fixtureInstallerDetails.deliveryCity ? fixtureInstallerDetails.deliveryCity : ""
        formFields.deliveryState = fixtureInstallerDetails.deliveryState ? fixtureInstallerDetails.deliveryState : ""
        formFields.deliveryZip = fixtureInstallerDetails.deliveryZip ? fixtureInstallerDetails.deliveryZip : ""
        formFields.Comments = fixtureInstallerDetails.comments ? fixtureInstallerDetails.comments : ""

        this.setState({ formFields })
    }


    componentDidMount() {

        // console.log('cc22', this.props.activity.result.toLocaleString().split(',')[1].split(':')[1])
        // console.log(this.props)
        const { userDetails } = this.props
        this.getOptions()

        if (this.props.fixtureInstallerDetails) {

            this.getDatafromStore()
        } else {

            this.getFormDetails()
        }



        this.assettimer(userDetails)

        columns[0].required = (userDetails.role === "Country Lead")

        columns[1].required = (userDetails.role === "Country Lead")

        columns[2].required = (userDetails.role === "Country Lead")

        columns[3].required = false

        columns[4].required = (userDetails.role === "Country Lead" || userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer")

        columns[5].required = (userDetails.role === "Installer")

        columns[6].required = (userDetails.role === "Installer")

        columns[7].required = (userDetails.role === "Installer")

        columns[8].required = (userDetails.role === "Installer")

        columns[9].required = userDetails.role === "Country Lead"




    }

    assettimer(userDetails) {
        // const { userDetails } = this.props

        let valassignforadmin = []
        let checkdata = []

        if (userDetails.role != 'Admin') {

            const url = endPoints.userManage.activityTrack + "?Params=" + userDetails.email

            axios.get(url).then((res) => {

                res.data.map(e => {

                    if (e.glid === this.props.Glid) {
                        //    console.log('nv', e.Glid)
                        checkdata.push(e)
                    }
                })
                if (checkdata.length > 0) {

                    checkboolean = true
                    valassignforadmin = (new Date(Math.max.apply(null, checkdata.map(function (e) {
                        return new Date(e.systemUpdatedDate);
                    }))));

                    valassign = valassignforadmin.toLocaleString().split(',')[1].split(':')[1]
                    if (res.data.length > 0) {

                        if ((new Date().toISOString().split('T')[1].split(':')[1] - valassign) === 1) {

                            val = Date.now() + 180000
                            this.setState({
                                showsumbitbutton: false,
                            })
                            setTimeout(() => {
                                return this.setState({
                                    showsumbitbutton: true,
                                });
                            }, 180000);

                        } else if ((new Date().toISOString().split('T')[1].split(':')[1] - valassign) === 2) {


                            val = Date.now() + 120000
                            this.setState({
                                showsumbitbutton: false,
                            })
                            setTimeout(() => {
                                return this.setState({
                                    showsumbitbutton: true,
                                });
                            }, 120000);
                        } else if ((new Date().toISOString().split('T')[1].split(':')[1] - valassign) === 0) {
                            val = Date.now() + 180000
                            this.setState({
                                showsumbitbutton: false,
                            })
                            setTimeout(() => {
                                return this.setState({
                                    showsumbitbutton: true,
                                });
                            }, 180000);
                        }

                    }
                } else {
                    checkboolean = false
                }
            })

            // this.loadUserActivity1(userDetails.email)

            // const url = endPoints.userManage.activityTrack + "?Params=" + userDetails.email;
            // const res = axios.get(url)
            // this.loadUserActivity(userDetails.email).then((res) => {
            //     console.log('sasa', res)
            // })




        } else {
            if (this.props.activity.result != '') {
                valassign = this.props.activity.result.toLocaleString().split(',')[1].split(':')[1]
            }
        }
        if (this.props.activity.result != '') {

            if ((new Date().toISOString().split('T')[1].split(':')[1] - valassign) === 1) {

                val = Date.now() + 180000
                this.setState({
                    showsumbitbutton: false,
                })
                setTimeout(() => {
                    return this.setState({
                        showsumbitbutton: true,
                    });
                }, 180000);

            } else if ((new Date().toISOString().split('T')[1].split(':')[1] - valassign) === 2) {


                val = Date.now() + 120000
                this.setState({
                    showsumbitbutton: false,
                })
                setTimeout(() => {
                    return this.setState({
                        showsumbitbutton: true,
                    });
                }, 120000);
            } else if ((new Date().toISOString().split('T')[1].split(':')[1] - valassign) === 0) {
                val = Date.now() + 180000
                this.setState({
                    showsumbitbutton: false,
                })
                setTimeout(() => {
                    return this.setState({
                        showsumbitbutton: true,
                    });
                }, 180000);
            }

        }
    }

    removeFile = (idx, name) => {

        const { formFields } = this.state;

        let removedFiles = formFields[name].filter((d, index) => index !== idx)

        formFields[name] = removedFiles


        if (name === "Heroshotfiles") {

            let removeFiles = formFields["Hero_shot"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Hero_shotLink"].filter(item => formFields[name].includes(item))

            formFields["Hero_shot"] = removeFiles

            formFields["Hero_shotLink"] = removeLinks
        }

        if (name === "Mainfrontfiles") {

            let removeFiles = formFields["Main_front"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Main_frontLink"].filter(item => formFields[name].includes(item))

            formFields["Main_front"] = removeFiles

            formFields["Main_frontLink"] = removeLinks
        }

        if (name === "Rightfrontfiles") {

            let removeFiles = formFields["Right_front"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Right_frontLink"].filter(item => formFields[name].includes(item))

            formFields["Right_front"] = removeFiles

            formFields["Right_frontLink"] = removeLinks
        }

        if (name === "Leftfrontfiles") {

            let removeFiles = formFields["Left_front"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Left_frontLink"].filter(item => formFields[name].includes(item))

            formFields["Left_front"] = removeFiles

            formFields["Left_frontLink"] = removeLinks
        }

        if (name === "Mainrearfiles") {

            let removeFiles = formFields["Main_rear"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Main_rearLink"].filter(item => formFields[name].includes(item))

            formFields["Main_rear"] = removeFiles

            formFields["Main_rearLink"] = removeLinks
        }

        if (name === "Bestsidefiles") {

            let removeFiles = formFields["Best_side"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Best_sideLink"].filter(item => formFields[name].includes(item))

            formFields["Best_side"] = removeFiles

            formFields["Best_sideLink"] = removeLinks
        }


        if (name === "Signature") {

            let removeFiles = formFields["SignatureFiles"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["siganturelink"].filter(item => formFields[name].includes(item))

            formFields["SignatureFiles"] = removeFiles

            formFields["siganturelink"] = removeLinks
        }

        this.setState({ formFields })
    }

    changeTab = () => {
        const { formFields } = this.state
        // console.log("propsdispatch", this.props)
        this.props.dispatch({ type: "STORE_FIXTURE_DETAILS", payload: formFields })
        this.props.tabChange("2")

    }


    handleDate = (data, name, idx) => {
        let { formFields } = this.state
        let materialInfoList = formFields.materialInfoList

        materialInfoList[idx][name] = data
        if (name === "actualInstallationDate") {

            // let { formFields } = this.state
            formFields.idxtoupdate = idx
            this.setState({ clickallfunctionlity: false })
        }
        this.setState({ formFields })
    }

    handleMaterialInfoListValues = (event, idx) => {
        
        // this.checkAsset(materialInfoList[idx].assetTagId, idx)
        // console.log("sdfalshfahsfjkasf11111", event.target.name)
        let { formFields } = this.state
        let materialInfoList = formFields.materialInfoList

        if (event.target.name === "status") {
            formFields.idxtoupdate = idx
            this.setState({ clickallfunctionlity: false })
            // console.log("materrialcheck", this.props)
            // console.log('zz', this.props.storeDrpdwns)

            // console.log('g',this.props.storeDrpdwns.materialInfo[idx])
            // console.log(idx)
            // console.log(this.props.storeDrpdwns.materialInfo)
            if (materialInfoList.editaddset === true && (Object.keys(this.props.storeDrpdwns).includes('materialInfo')) && this.props.storeDrpdwns.materialInfo[idx] === undefined) {
                if (event.target.value === 'Refreshed') {
                    materialInfoList[idx]["previousAssetTag"] = materialInfoList[idx]["assetTagId"]
                    materialInfoList[idx]["assetTagId"] = ""

                } else {
                    if (materialInfoList[idx]["previousAssetTag"] !== "") {
                        materialInfoList[idx]["assetTagId"] = materialInfoList[idx]["previousAssetTag"]
                    }

                    materialInfoList[idx]["previousAssetTag"] = ""

                }
            }
            else {
                if (Object.keys(this.props.storeDrpdwns).includes('materialInfo')) {

                    if (materialInfoList[idx]["previousAssetTag"] !== "" && materialInfoList[idx]["assetTagId"] !== "") { } else {


                        if (event.target.value === 'Refreshed') {

                            materialInfoList[idx]["previousAssetTag"] = materialInfoList[idx]["assetTagId"]
                            materialInfoList[idx]["assetTagId"] = ""

                        } else {

                            if (materialInfoList[idx]["previousAssetTag"] !== "") {
                                materialInfoList[idx]["assetTagId"] = materialInfoList[idx]["previousAssetTag"]
                            }

                            materialInfoList[idx]["previousAssetTag"] = ""

                        }
                    }
                } else {
                    if (event.target.value === 'Refreshed') {

                        materialInfoList[idx]["previousAssetTag"] = materialInfoList[idx]["assetTagId"]
                        materialInfoList[idx]["assetTagId"] = ""

                    } else {
                        if (materialInfoList[idx]["previousAssetTag"] !== "") {
                            materialInfoList[idx]["assetTagId"] = materialInfoList[idx]["previousAssetTag"]
                        }

                        materialInfoList[idx]["previousAssetTag"] = ""

                    }
                }

            }
        }

        if (event.target.name === "assetTagId" && event.target.value.length < 7 && event.target.value.length !== 0) {

            if(formFields.materialInfoList[idx].existingrecord){
                console.log('ssssss', formFields.materialInfoList[idx].existingrecord   )
                formFields.materialInfoList[idx].existingrecord = false
                   
            }

              
            if (Object.keys(this.props.storeDrpdwns).includes('materialInfo')) {
                if (this.props.storeDrpdwns.materialInfo.length > idx && event.target.value === this.props.storeDrpdwns.materialInfo[idx].assetTagId) {
                    formFields.materialInfoList[idx].assetDuplicate = false
                    formFields.materialInfoList[idx].assetError = false
                } else {
                    formFields.materialInfoList[idx].assetDuplicate = false
                    formFields.materialInfoList[idx].assetError = true
                }
            } else {
                formFields.materialInfoList[idx].assetDuplicate = false
                formFields.materialInfoList[idx].assetError = true
            }
        } else if (event.target.name === "assetTagId" && event.target.value.length > 9) {

            if(formFields.materialInfoList[idx].existingrecord){
                console.log('ssssss', formFields.materialInfoList[idx].existingrecord   )
                formFields.materialInfoList[idx].existingrecord = false
                   
            }
            // formFields.materialInfoList[idx].assetError = true
            if (Object.keys(this.props.storeDrpdwns).includes('materialInfo')) {
                if (this.props.storeDrpdwns.materialInfo.length > idx && event.target.value === this.props.storeDrpdwns.materialInfo[idx].assetTagId) {
                    // formFields.materialInfoList[idx].assetDuplicate = false
                    formFields.materialInfoList[idx].assetError = false
                } else {
                    // formFields.materialInfoList[idx].assetDuplicate = false
                    formFields.materialInfoList[idx].assetError = true
                }
            } else {
                formFields.materialInfoList[idx].assetError = true
            }
        } else if (event.target.name === "assetTagId") {
            if(formFields.materialInfoList[idx].existingrecord){
                console.log('ssssss', formFields.materialInfoList[idx].existingrecord   )
                formFields.materialInfoList[idx].existingrecord = false
                   
            }
            // this.checkAsset(event.target.value, idx)

            // console.log(event.target.value)
            // console.log(this.props.storeDrpdwns.materialInfo[idx].assetTagId)
            formFields.materialInfoList[idx].assetError = false
            // formFields.materialInfoList[idx].assetDuplicate = false
        }



        if (event.target.name === "model") {

            this.props.loadMaterialOptions("Model", event.target.value, '').then((res) => {


                materialInfoList[idx].fixtureOptions = res.data.fixture
                materialInfoList[idx].fixtureDescOptions = res.data.fixtureDesription



                materialInfoList[idx].sku = ""



                materialInfoList[idx].fixtureDescription = ""

                this.setState({ formFields })

            })
        }

        if (event.target.name === "sku") {

            // if(event.target.value === "Wayfinder"){
            //     console.log('if')
            //     formFields.materialInfoList[idx].wayfinder = true
            //     columns[3].required = false;
            // } else {
            //     console.log(this.props)
            //     formFields.materialInfoList[idx].wayfinder = false
            //     columns[3].required = (this.props.userDetails.role === "Installer" )
            // }
            this.props.loadMaterialOptions("Fixture", event.target.value, materialInfoList[idx].model).then((res) => {

                materialInfoList[idx].fixtureDescOptions = res.data.fixtureDesription



                materialInfoList[idx].fixtureDescription = res.data.fixtureDesription.includes(materialInfoList[idx].fixtureDescription) ? materialInfoList[idx].fixtureDescription : res.data.fixtureDesription[0]

                materialInfoList[idx].fixtureDescription = " "

                this.setState({ formFields })

            })
        }

        if (event.target.name === "fixtureDescription") {

            this.props.loadMaterialOptions("FixtureDescription", event.target.value, '').then((res) => {

                // materialInfoList[idx].modelOptions = res.data.model
                // materialInfoList[idx].fixtureOptions = res.data.fixture

                // materialInfoList[idx].model = res.data.model.includes(materialInfoList[idx].model) ? materialInfoList[idx].model : res.data.model[0]

                // materialInfoList[idx].sku = res.data.fixture.includes(materialInfoList[idx].sku) ? materialInfoList[idx].sku : res.data.fixture[0]

                this.setState({ formFields })

            })
        }
        // if (event.target.name === "actualInstallationDate") {
        //     console.log('testinggggggggggggggggggg')
        //     let { formFields } = this.state
        //     formFields.idxtoupdate = idx
        //     this.setState({ clickallfunctionlity: false })
        // }
        if (event.target.name === 'installerName') {
            formFields.idxtoupdate = idx
            this.setState({ clickallfunctionlity: false })
        }

        if (event.target.name === 'installerContact') {
            formFields.idxtoupdate = idx
            this.setState({ clickallfunctionlity: false })
        }

        if (event.target.name === 'installerPhone') {
            formFields.idxtoupdate = idx
            this.setState({ clickallfunctionlity: false })
        }


        materialInfoList[idx][event.target.name] = event.target.value
        formFields.materialInfoList[idx].count = idx + 1

        this.setState({ formFields })
        console.log('countcheck', formFields)

    }

    apicallfunction = async (value) => {
        let { formFields } = this.state

        if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length < formFields.materialInfoList.length) {

            for (let i = 0; i < formFields.materialInfoList.length; i++) {

                if (formFields.materialInfoList[i].assetTagId && formFields.materialInfoList[i].assetTagId != "") {
                    const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[i].assetTagId
                    return axios.get(url)

                }

            }




        } else {

            this.setState({ assetduplicatevalidation: true })
        }

        // console.log('duplication', formFields.assetduplicatevalidation)
    }

    // fetchData = async () => {
    //     if(this.props.storeDrpdwns.materialInfo.length < formFields.materialInfoList.length){
    //             formFields.materialInfoList.map((item, index) => {
    //     const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + item.assetTagId
    //     const response = await axios.get(url);
    //     setRepos(response.data);
    //     console.log('multipleapicalls',response)
    //             }
    //             )}
    // }

    checkingassetforvalidation = async (check) => {
        //  console.log('lengthhh',this.props.storeDrpdwns.materialInfo.length)


        let { formFields } = this.state
        const { formFields: { materialInfoList } } = this.state

        console.log('ssssssss', formFields)

        let vv = []
        let vall = []
        let c = false
        if (this.props.storeDrpdwns.materialInfo === undefined) {
            for (let i = 0; i < formFields.materialInfoList.length; i++) {
                console.log('newcheck')
                if (formFields.materialInfoList[i].assetTagId && formFields.materialInfoList[i].assetTagId != "") {
                    const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[i].assetTagId
                    await axios.get(url).then(response => {
                        console.log('newcheck', response.data)
                        if (response.data.message === "Assettagid already Exists") {
                            // formFields.validateasset.push('No')
                            vv = "No"


                        } else if (formFields.materialInfoList[i].assetTagId && formFields.materialInfoList[i].assetTagId.length < 7 || formFields.materialInfoList[i].assetTagId.length > 9) {
                            // formFields.validateasset.push('Yes')
                            // vall.push('Yes')
                            vv = "No"

                        } else {
                            // formFields.validateasset.push('Yes')
                            // vall.push('Yes')
                            vv = "Yes"

                        }
                        vall.push(vv)

                    })
                }

            }

            this.setState({ loadingvalidation: true })
            console.log('newcheck', vall)

            if (vall.includes('No')) {
                console.log('newcheckif')
                this.setState({ checkassetfunctionvalidationcheck: false })
                formFields.assetdeplicatecheck = false
            } else {
                console.log('newcheckelse')
                this.setState({ checkassetfunctionvalidationcheck: true })
                formFields.assetdeplicatecheck = true
            }
        }

        if (!formFields.checkassetforupload && !formFields.copyformglid) {

            if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length === formFields.materialInfoList.length) {
                for (let j = 0; j < this.props.storeDrpdwns.materialInfo.length; j++) {
                    if (this.props.storeDrpdwns.materialInfo[j].assetTagId !== formFields.materialInfoList[j].assetTagId) {

                        if (formFields.materialInfoList[j].assetTagId != "") {
                            const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[j].assetTagId
                            await axios.get(url).then(response => {

                                if (response.data.message === "Assettagid already Exists") {
                                    // formFields.validateasset.push('No')
                                    vv = "No"


                                } else if (formFields.materialInfoList[j].assetTagId.length < 7 || formFields.materialInfoList[j].assetTagId.length > 9) {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "No"

                                } else {
                                    vv = "Yes"
                                }
                                vall.push(vv)

                            })
                        }
                    } else {

                        this.setState({ checkassetfunctionvalidationcheck: true })
                        formFields.assetdeplicatecheck = true
                    }
                }

                this.setState({ loadingvalidation: true })


                if (vall.includes('No')) {

                    this.setState({ checkassetfunctionvalidationcheck: false })
                    formFields.assetdeplicatecheck = false
                } else {

                    this.setState({ checkassetfunctionvalidationcheck: true })
                    formFields.assetdeplicatecheck = true
                }
            } else if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length < formFields.materialInfoList.length) {

                for (let i = this.props.storeDrpdwns.materialInfo.length; i < formFields.materialInfoList.length; i++) {
                    if (formFields.materialInfoList[i].assetTagId && formFields.materialInfoList[i].assetTagId != "") {

                        const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[i].assetTagId
                        await axios.get(url).then(response => {

                            if (response.data.message === "Assettagid already Exists") {
                                // formFields.validateasset.push('No')
                                vv = "No"


                            } else if (formFields.materialInfoList[i].assetTagId && formFields.materialInfoList[i].assetTagId.length < 7 || formFields.materialInfoList[i].assetTagId.length > 9) {
                                // formFields.validateasset.push('Yes')
                                // vall.push('Yes')
                                vv = "No"

                            } else {
                                // formFields.validateasset.push('Yes')
                                // vall.push('Yes')
                                vv = "Yes"

                            }
                            vall.push(vv)

                        })


                    }
                }



                this.setState({ loadingvalidation: true })


                if (vall.includes('No')) {

                    this.setState({ checkassetfunctionvalidationcheck: false })
                    formFields.assetdeplicatecheck = false
                } else {

                    this.setState({ checkassetfunctionvalidationcheck: true })
                    formFields.assetdeplicatecheck = true
                }


            } else if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length > formFields.materialInfoList.length) {
                for (let j = 0; j < formFields.materialInfoList.length; j++) {
                    if (this.props.storeDrpdwns.materialInfo[j].assetTagId !== formFields.materialInfoList[j].assetTagId) {

                        if (formFields.materialInfoList[j].assetTagId != "") {
                            const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[j].assetTagId
                            await axios.get(url).then(response => {

                                if (response.data.message === "Assettagid already Exists") {
                                    // formFields.validateasset.push('No')
                                    vv = "No"


                                } else if (formFields.materialInfoList[j].assetTagId.length < 7 || formFields.materialInfoList[j].assetTagId.length > 9) {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "No"

                                } else {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "Yes"

                                }
                                vall.push(vv)

                            })
                        }
                    } else {

                        this.setState({ checkassetfunctionvalidationcheck: true })
                        formFields.assetdeplicatecheck = true
                    }
                }

                this.setState({ loadingvalidation: true })

                if (vall.includes('No')) {

                    this.setState({ checkassetfunctionvalidationcheck: false })
                    formFields.assetdeplicatecheck = false
                } else {

                    this.setState({ checkassetfunctionvalidationcheck: true })
                    formFields.assetdeplicatecheck = true
                }
            }
        } else {
            if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length === formFields.materialInfoList.length) {
                for (let j = 0; j < this.props.storeDrpdwns.materialInfo.length; j++) {
                    if (!formFields.materialInfoList[j].existingrecord && this.props.storeDrpdwns.materialInfo[j].assetTagId !== formFields.materialInfoList[j].assetTagId) {

                        if (formFields.materialInfoList[j].assetTagId != "") {
                            const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[j].assetTagId
                            await axios.get(url).then(response => {

                                if (response.data.message === "Assettagid already Exists") {
                                    materialInfoList[j].assetDuplicate = true
                                    // formFields.validateasset.push('No')
                                    vv = "No"


                                } else if (formFields.materialInfoList[j].assetTagId.length < 7 || formFields.materialInfoList[j].assetTagId.length > 9) {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "No"
                                    materialInfoList[j].assetDuplicate = false
                                    materialInfoList[j].assetError = true

                                } else {
                                    vv = "Yes"
                                }
                                vall.push(vv)

                            })
                        }
                    } else {

                        this.setState({ checkassetfunctionvalidationcheck: true })
                        formFields.assetdeplicatecheck = true
                    }
                }

                this.setState({ loadingvalidation: true })


                if (vall.includes('No')) {

                    this.setState({ checkassetfunctionvalidationcheck: false })
                    formFields.assetdeplicatecheck = false
                } else {

                    this.setState({ checkassetfunctionvalidationcheck: true })
                    formFields.assetdeplicatecheck = true
                }
            } else if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length < formFields.materialInfoList.length) {
                let indexchangevalues = []
                // if(!formFields.checkassetforupload && !formFields.copyformglid) {
                formFields.materialInfoList.map(item => {
                    
                    this.props.storeDrpdwns.materialInfo.map(exitingvalue => {
                        // console.log('item.proposedInstallationDate', item.proposedInstallationDate)
                        // console.log('item.proposedInstallationDate', exitingvalue.proposedInstallationDate)
                        if (exitingvalue.model === item.model && exitingvalue.sku === item.sku && exitingvalue.fixtureDescription === item.fixtureDescription && exitingvalue.assetTagId === item.assetTagId && exitingvalue.status === item.status && exitingvalue.installerName === item.installerName && exitingvalue.installerContact === item.installerContact && exitingvalue.installerPhone === item.installerPhone && exitingvalue.actualInstallationDate === item.actualInstallationDate && exitingvalue.proposedInstallationDate === item.proposedInstallationDate) {

                            indexchangevalues.push('false')
                        } else {

                            indexchangevalues.push('true')

                        }
                    })
                })
            // }
            console.log('sssssss',indexchangevalues)

                if (indexchangevalues.includes('false')) {
                    for (let i = this.props.storeDrpdwns.materialInfo.length; i < formFields.materialInfoList.length; i++) {
                        if (formFields.materialInfoList[i].assetTagId && !formFields.materialInfoList[i].existingrecord && formFields.materialInfoList[i].assetTagId != "") {

                            const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[i].assetTagId
                            await axios.get(url).then(response => {

                                if (response.data.message === "Assettagid already Exists") {
                                    formFields.materialInfoList[i].assetDuplicate = true
                                    // formFields.validateasset.push('No')
                                    vv = "No"


                                } else if (formFields.materialInfoList[i].assetTagId && formFields.materialInfoList[i].assetTagId.length < 7 || formFields.materialInfoList[i].assetTagId.length > 9) {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "No"
                                    formFields.materialInfoList[i].assetDuplicate = false
                                    formFields.materialInfoList[i].assetError = true

                                } else {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "Yes"

                                }
                                vall.push(vv)

                            })


                        }
                    }
                   
                } else {
                    for (let i = 0; i < formFields.materialInfoList.length; i++) {
                        if (formFields.materialInfoList[i].assetTagId && !formFields.materialInfoList[i].existingrecord  && formFields.materialInfoList[i].assetTagId != "") {

                            const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[i].assetTagId
                            await axios.get(url).then(response => {

                                if (response.data.message === "Assettagid already Exists") {
                                    formFields.materialInfoList[i].assetDuplicate = true
                                    // formFields.validateasset.push('No')
                                    vv = "No"


                                } else if (formFields.materialInfoList[i].assetTagId && formFields.materialInfoList[i].assetTagId.length < 7 || formFields.materialInfoList[i].assetTagId.length > 9) {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "No"
                                    formFields.materialInfoList[i].assetDuplicate = false
                                    formFields.materialInfoList[i].assetError = true

                                } else {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "Yes"

                                }
                                vall.push(vv)

                            })


                        }
                    }
                   
                }



                this.setState({ loadingvalidation: true })


                if (vall.includes('No')) {

                    this.setState({ checkassetfunctionvalidationcheck: false })
                    formFields.assetdeplicatecheck = false
                } else {

                    this.setState({ checkassetfunctionvalidationcheck: true })
                    formFields.assetdeplicatecheck = true
                }


            } else if (this.props.storeDrpdwns.materialInfo && this.props.storeDrpdwns.materialInfo.length > formFields.materialInfoList.length) {
                for (let j = 0; j < formFields.materialInfoList.length; j++) {
                    if (!formFields.materialInfoList[j].existingrecord  && this.props.storeDrpdwns.materialInfo[j].assetTagId !== formFields.materialInfoList[j].assetTagId) {

                        if (formFields.materialInfoList[j].assetTagId != "") {
                            const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[j].assetTagId
                            await axios.get(url).then(response => {

                                if (response.data.message === "Assettagid already Exists") {
                                    // formFields.validateasset.push('No')
                                    vv = "No"
                                    materialInfoList[j].assetDuplicate = true


                                } else if (formFields.materialInfoList[j].assetTagId.length < 7 || formFields.materialInfoList[j].assetTagId.length > 9) {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    materialInfoList[j].assetDuplicate = false
                                    materialInfoList[j].assetError = true
                                    vv = "No"

                                } else {
                                    // formFields.validateasset.push('Yes')
                                    // vall.push('Yes')
                                    vv = "Yes"

                                }
                                vall.push(vv)

                            })
                        }
                    } else {

                        this.setState({ checkassetfunctionvalidationcheck: true })
                        formFields.assetdeplicatecheck = true
                    }
                }

                this.setState({ loadingvalidation: true })


                if (vall.includes('No')) {

                    this.setState({ checkassetfunctionvalidationcheck: false })
                    formFields.assetdeplicatecheck = false
                } else {

                    this.setState({ checkassetfunctionvalidationcheck: true })
                    formFields.assetdeplicatecheck = true
                }
            }
        }
        // else {
        //     if(this.props.storeDrpdwns.materialInfo.length === formFields.materialInfoList.length)
        //     for(let j = 0; j < formFields.materialInfoList.length; j++ ){
        //         // if(this.props.storeDrpdwns.materialInfo[j].assetTagId !== formFields.materialInfoList[j].assetTagId){
        //             console.log('newcheck5')
        //             if(formFields.materialInfoList[j].assetTagId != ""){
        //             const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + formFields.materialInfoList[j].assetTagId
        //             await axios.get(url).then(response => {
        //                 console.log('newcheck', response.data)
        //                 if (response.data.message === "Assettagid already Exists") {
        //                     // formFields.validateasset.push('No')
        //                     vv = "No"


        //                 } else {
        //                     // formFields.validateasset.push('Yes')
        //                     // vall.push('Yes')
        //                     vv = "Yes"

        //                 }
        //                 vall.push(vv)

        //             })
        //         }
        //     // } else{
        //     //     console.log('newcheck', vall)
        //     //     this.setState({checkassetfunctionvalidationcheck: true})
        //     //     formFields.assetdeplicatecheck = true
        //     // }
        //     }

        //     this.setState({ loadingvalidation: true })
        //     console.log('newcheck',vall)

        //     if(vall.includes('No')){
        //         console.log('newcheckif')
        //         this.setState({checkassetfunctionvalidationcheck: false})
        //         formFields.assetdeplicatecheck = false
        //     } else {
        //         console.log('newcheckelse')
        //         this.setState({checkassetfunctionvalidationcheck: true})
        //         formFields.assetdeplicatecheck = true
        //     }
        // }


        for (let z = 0; z < formFields.materialInfoList.length; z++) {
            if (formFields.materialInfoList[z].assetTagId && formFields.materialInfoList[z].assetTagId != "") {
                // formFields.materialInfoList.map(item => {
                //     if(formFields.materialInfoList[z].assetTagId === item.assetTagId){
                //         console.log('newcheck',)
                //         this.setState({checkassetfunctionvalidationcheck: false})
                //     }
                // })
                for (let x = z + 1; x < formFields.materialInfoList.length; x++) {
                    if (formFields.materialInfoList[z].assetTagId === formFields.materialInfoList[x].assetTagId) {

                        this.setState({ checkassetfunctionvalidationcheck: false })
                        formFields.assetdeplicatecheck = false
                    }
                }
            }
        }


        if (this.props.userDetails.role === 'Installer') {


            if (formFields.imagevalidationcheck && formFields.materialinforvalidationcheck && formFields.assetdeplicatecheck) {

                this.setState({ showsubmitbuttonvalidation: true })
            } else {

                this.setState({ showsubmitbuttonvalidation: false })
            }
        } else if (this.props.userDetails.role === 'Country Lead') {
            if (formFields.materialinforvalidationcheck && formFields.assetdeplicatecheck) {
                this.setState({ showsubmitbuttonvalidation: true })
            } else {
                this.setState({ showsubmitbuttonvalidation: false })
            }
        } else if (this.props.userDetails.role === 'Admin') {

            if (formFields.assetdeplicatecheck) {
                this.setState({ showsubmitbuttonvalidation: true })
            } else {
                this.setState({ showsubmitbuttonvalidation: false })
            }
        } else if (this.props.userDetails.role === 'Fixture Manufacturer') {

            if (formFields.materialinforvalidationcheck && formFields.assetdeplicatecheck) {
                this.setState({ showsubmitbuttonvalidation: true })
            } else {
                this.setState({ showsubmitbuttonvalidation: false })
            }
        } else if (this.props.userDetails.role === 'Store Planner') {

            this.setState({ showsubmitbuttonvalidation: true })
            // if (formFields.materialinforvalidationcheck && formFields.assetdeplicatecheck) {
            //     this.setState({ showsubmitbuttonvalidation: true })
            // } else {
            //     this.setState({ showsubmitbuttonvalidation: false })
            // }
        }


        if (check === 'sumbit') {
            formFields.clickasset = true


            const { detailsModal, storeData, listofAdmins } = this.props


            // console.log("floorplandata", this.props.updatedFloorPlan)
            // console.log('checking', this.validator.allValid())
            // console.log(formFields.mainrearfiles)
            // if((formFields.Heroshotfiles && formFields.Heroshotfiles.length > 0) && (formFields.Mainfrontfiles && formFields.Mainfrontfiles.length > 0) && (formFields.Leftfrontfiles && formFields.Leftfrontfiles.length > 0) && (formFields.Rightfrontfiles && formFields.Rightfrontfiles.length > 0) && (formFields.Bestsidefiles && formFields.Mainrearfiles.length > 0) && (formFields.Mainrearfiles && formFields.Bestsidefiles.length > 0)){
            // // if (formFields.Heroshotfiles.length === 0 && (formFields.leftfrontfiles.length === 0 || formFields.Leftfrontfiles === undefined) && (formFields.rightfrontfiles.length === 0 || formFields.rightfrontfiles === undefined) && (formFields.Mainfrontfiles.length === 0 || formFields.mainfrontfiles === undefined ) && (formFields.mainrearfiles.length === 0 || formFields.mainrearfiles === undefined) && (formFields.bestsidefiles.length === 0 || formFields.bestsidefiles === undefined)) {
            //      formFields.showerrormessage = false 
            // } else {
            //     console.log('vvvvvvvvv')
            //     formFields.showerrormessage = true
            //     // this.setState({ showerrormessage: true })
            // }
            // console.log(formFields.showerrormessage)

            if (this.props.userDetails.role === 'Installer' && formFields.imagevalidationcheck && formFields.materialinforvalidationcheck && formFields.assetdeplicatecheck) {
                if (this.validator.allValid() && this.materialInfoValidator.allValid() && formFields.materialInfoList.every(d => !d.assetDuplicate)) {


                    this.setState({ formLoader: true })
                    this.props.addStore(this.props.Glid, detailsModal ? this.props.updatedFloorPlan : this.props.floorPlanDetails, this.state.formFields, storeData, listofAdmins).then(() => {
                        this.props.cancelModal()
                        this.setState({ formLoader: false })
                    })
                } else {

                    if (!this.validator.allValid()) {
                        this.validator.showMessages()
                    }

                    if (!this.materialInfoValidator.allValid()) {
                        this.materialInfoValidator.showMessages()
                    }
                }
            } else if (this.props.userDetails.role === 'Country Lead' && formFields.materialinforvalidationcheck && formFields.assetdeplicatecheck) {
                if (this.validator.allValid() && this.materialInfoValidator.allValid() && formFields.materialInfoList.every(d => !d.assetDuplicate)) {


                    this.setState({ formLoader: true })
                    this.props.addStore(this.props.Glid, detailsModal ? this.props.updatedFloorPlan : this.props.floorPlanDetails, this.state.formFields, storeData, listofAdmins).then(() => {
                        this.props.cancelModal()
                        this.setState({ formLoader: false })
                    })
                } else {

                    if (!this.validator.allValid()) {
                        this.validator.showMessages()
                    }

                    if (!this.materialInfoValidator.allValid()) {
                        this.materialInfoValidator.showMessages()
                    }
                }
            } else if (this.props.userDetails.role === 'Admin' && formFields.assetdeplicatecheck) {

                if (this.validator.allValid() && this.materialInfoValidator.allValid() && formFields.materialInfoList.every(d => !d.assetDuplicate)) {


                    this.setState({ formLoader: true })
                    this.props.addStore(this.props.Glid, detailsModal ? this.props.updatedFloorPlan : this.props.floorPlanDetails, this.state.formFields, storeData, listofAdmins).then(() => {
                        this.props.cancelModal()
                        this.setState({ formLoader: false })
                    })
                } else {

                    if (!this.validator.allValid()) {
                        this.validator.showMessages()
                    }

                    if (!this.materialInfoValidator.allValid()) {
                        this.materialInfoValidator.showMessages()
                    }
                }
            } else if (this.props.userDetails.role === 'Fixture Manufacturer' && formFields.assetdeplicatecheck && formFields.materialinforvalidationcheck) {

                if (this.validator.allValid() && this.materialInfoValidator.allValid() && formFields.materialInfoList.every(d => !d.assetDuplicate)) {


                    this.setState({ formLoader: true })
                    this.props.addStore(this.props.Glid, detailsModal ? this.props.updatedFloorPlan : this.props.floorPlanDetails, this.state.formFields, storeData, listofAdmins).then(() => {
                        this.props.cancelModal()
                        this.setState({ formLoader: false })
                    })
                } else {

                    if (!this.validator.allValid()) {
                        this.validator.showMessages()
                    }

                    if (!this.materialInfoValidator.allValid()) {
                        this.materialInfoValidator.showMessages()
                    }
                }
            } else if (this.props.userDetails.role === 'Store Planner') {

                if (this.validator.allValid() && this.materialInfoValidator.allValid() && formFields.materialInfoList.every(d => !d.assetDuplicate)) {


                    this.setState({ formLoader: true })
                    this.props.addStore(this.props.Glid, detailsModal ? this.props.updatedFloorPlan : this.props.floorPlanDetails, this.state.formFields, storeData, listofAdmins).then(() => {
                        this.props.cancelModal()
                        this.setState({ formLoader: false })
                    })
                } else {

                    if (!this.validator.allValid()) {
                        this.validator.showMessages()
                    }

                    if (!this.materialInfoValidator.allValid()) {
                        this.materialInfoValidator.showMessages()
                    }
                }
            }
        }
        this.setState({ materialInfoList })




    }

    validatefunction = (check) => {
        let { formFields } = this.state

        this.setState({ showvalidationinformation: true })
        if (this.props.userDetails.role === 'Installer') {
            if (this.validator.allValid() && this.installationimagevalidation.allValid()) {
                this.setState({ imagevalidation: true })
                formFields.imagevalidationcheck = true
            } else {
                this.setState({ imagevalidation: false })
                formFields.imagevalidationcheck = false
                this.installationimagevalidation.showMessages()
                this.validator.showMessages()
            }

            if (this.materialInfoValidator.allValid()) {

                this.setState({ materialinfovalidation: true })
                formFields.materialinforvalidationcheck = true
            } else {

                this.setState({ materialinfovalidation: false })
                formFields.materialinforvalidationcheck = false
                this.materialInfoValidator.showMessages()
            }
        } else if (this.props.userDetails.role === 'Country Lead') {
            if (this.validator.allValid() && this.materialInfoValidator.allValid()) {
                this.setState({ materialinfovalidation: true })
                formFields.materialinforvalidationcheck = true
            } else {
                this.setState({ materialinfovalidation: false })
                formFields.materialinforvalidationcheck = false
                this.validator.showMessages()
                this.materialInfoValidator.showMessages()
            }
        } else if (this.props.userDetails.role === 'Fixture Manufacturer') {
            if (this.materialInfoValidator.allValid()) {
                this.setState({ materialinfovalidation: true })
                formFields.materialinforvalidationcheck = true
            } else {
                this.setState({ materialinfovalidation: false })
                formFields.materialinforvalidationcheck = false
                this.materialInfoValidator.showMessages()
            }
        }


        // if (validatecheck === 'validate') {
        // console.log('newcheck', this.props.storeDrpdwns.materialInfo.length)
        // console.log('newcheck', formFields.materialInfoList.length)
        this.setState({ loadingvalidation: false })
        this.checkingassetforvalidation(check)
        // console.log('this', formFields)
        // console.log('newcheck', va)
        //  }
        // this.checkAsset('', 0, 'validate');
        // this.fetchData();
        // console.log('mmmmmm', va)
        // if(validatingassetduplcate){
        // if(formFields.materialInfoList.length > 0){
        //     let val = []
        //     formFields.materialInfoList.map(item => {
        //         console.log('selviiiii',item)
        //         if(Object.keys(item).includes('assetDuplicate')){

        //             val.push(item.assetDuplicate)
        //             // if(item.assetDuplicate){
        //             //     this.setState({checkassetfunctionvalidationcheck: false})
        //             //     this.setState({vali: true})
        //             // } else {
        //             //      this.setState({vali: false})
        //             //      this.setState({checkassetfunctionvalidationcheck: true})
        //             // }

        //         }
        //     })
        //     if(val.includes(true)){
        //         this.setState({checkassetfunctionvalidationcheck: false})
        //     } else {
        //         this.setState({checkassetfunctionvalidationcheck: true})
        //     }
        //     // console.log('checkingifcondition')
        //     // this.setState({checkassetfunctionvalidationcheck: true})

        // } }
        // else {
        //     // this.setState({checkassetfunctionvalidationcheck: false})
        //     // console.log('checkingelsecondition')
        // }

        // let va = this.apicallfunction();
        // console.log('selvi',va)
        // console.log('assetduplicationvalidation', formFields.materialInfoList.filter(d => Object.keys(d).includes('assetDuplicate')))
        //         if(formFields.materialInfoList.filter(d => Object.keys(d).includes('assetDuplicate')).length > 0){
        // console.log('mnb', formFields.materialInfoList)
        // console.log('mnb', formFields.materialInfoList.every(d => d.assetDuplicate == false))

        // if(formFields.materialInfoList.every(d => d.assetDuplicate == false)){
        //   this.setState({assetduplicatevalidation: true})
        // } else {
        //     this.setState({assetduplicatevalidation: false})
        // }

        // if(this.props.storeDrpdwns.materialInfo.length < formFields.materialInfoList.length){
        //     formFields.materialInfoList.map((item, index) => {
        //         const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + item.assetTagId
        //         const res =  axios.get(url)

        //         if (res.data.message === "Assettagid already Exists") {
        //             this.setState({assetduplicatevalidation: false})

        //         }
        //     })

        //     } else {
        //         this.setState({assetduplicatevalidation: true})
        //     }

        // } else {
        //         this.setState({assetduplicatevalidation: false})

        // }

        // return true



    }

    ScannedAssetId = (data, idx) => {

        let { formFields } = this.state
        let materialInfoList = formFields.materialInfoList
        materialInfoList[idx]["assetTagId"] = data

        if (data.length > 8) {

            formFields.materialInfoList[idx].assetError = true
        }

        this.setState({ formFields })
    }
    clickfunction1() {
        let { formFields } = this.state
        const { formFields: { materialInfoList } } = this.state
        materialInfoList.map(res => {
            // console.log('hh', formFields.materialInfoList[formFields.idxtoupdate].model)
            // console.log('hh', res.model)
            if (formFields.materialInfoList[formFields.idxtoupdate].model === res.model) {
                // console.log('iii')

                res.installerName = formFields.materialInfoList[formFields.idxtoupdate].installerName
                res.installerContact = formFields.materialInfoList[formFields.idxtoupdate].installerContact
                res.installerPhone = formFields.materialInfoList[formFields.idxtoupdate].installerPhone

                res.actualInstallationDate = formFields.materialInfoList[formFields.idxtoupdate].actualInstallationDate
                res.status = formFields.materialInfoList[formFields.idxtoupdate].status


            }
        })

        this.setState({ formFields })
        this.setState({ dialogueboxforautofill: false })
        this.setState({ clickallfunctionlity: true })
    }

    clickfunction() {
        this.setState({ dialogueboxforautofill: true })

    }


    handleCancelfordialogue() {
        this.setState({ dialogueboxforautofill: false })
    }


    filtervaluesformodel(x, idx, modelvalues) {

        let { formFields } = this.state
        let materialInfoList = formFields.materialInfoList

        this.props.loadMaterialOptions("Model", modelvalues, '').then((res) => {

            materialInfoList[idx].fixtureOptions = res.data.fixture
            this.setState({ formFields })

        })
    }
    // resetfunctionformaterialinfo(){
    //     let {formFields} = this.state
    //     // formFields.materialInfoList.map(res => {
    //     //     res.installerName = formFields.materialInfoList[formFields.idxtoupdate].installerName
    //     // })
    //     console.log('click function', formFields.materialInfoList[formFields.idxtoupdate].installerName)
    //     // for
    //     this.setState({formFields})

    // }

    checkinggg(e) {
        if (this.state.formFields.fileNameduplicate === e.target.files.name) {

            this.handleUpload(e)
        }

    }

    // csvdownload(materailinfo){
    //     materailinfo.map(res => {
    //         res.assetTagId.split('T')
    //     })
    // }
    cancalwarningbox() {
        this.setState({ warningbox: false })
        this.setState({ fileNameduplicate: '' })
    }

    enableuploadfunction() {

        this.setState({ dialogueboxforbeforeupload: true })

    }

    Okaydialogueboxforbeforeupload() {
        this.setState({ uploadiconshow: false })
        this.setState({ dialogueboxforbeforeupload: false })
    }

    checkonclick() {
        console.log('jkjkjkjkjkjkj')
    }




    handleimportfunction(e, val) {
        const { formFields } = this.state
        if (val === 'Model') {
            formFields.modelimport = e
        } else {
            formFields.glidvalues = e
        }
        console.log('ghghghghhg', formFields)

        this.setState({ formFields })

        console.log('ghghghghhg', formFields)

    }


    copyfromanthoerglidid = async () => {

        const { formFields } = this.state
        this.state.formFields.copyformglid = true
        this.state.formFields.checkassetforupload = true
        const { formFields: { materialInfoList } } = this.state
        const { storeDrpdwns, userDetails } = this.props
        console.log('ssssss', this.state)
        const url = endPoints.deepDive.table_Data + '/MaterialInfoModelsData' + '?GLIDCode=' + formFields.glidvalues + '&Model=' + formFields.modelimport
        await axios.get(url).then(response => {
            console.log('sssssss', response.data)
            if (response.data.length > 0) {
                console.log('sssss', materialInfoList)

                response.data.map(res => {
                    // res.push({
                    //     assetDisable: true,
                    //     assetDuplicate: false,
                    //     assetExists: false,
                    //     assetError: false,
                    //     wayfinder: false,
                    //     fieldDisable: (userDetails.role === "Installer" || "Fixture Manufacturer") ? false : true,
                    //     modelOptions: storeDrpdwns.model ? storeDrpdwns.model : [],
                    //     fixtureOptions: storeDrpdwns.fixtures ? storeDrpdwns.fixtures : [],
                    //     fixtureDescOptions: storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : [],
                    //  })
                    materialInfoList.push({
                        model: res.model,
                        sku: res.sku,
                        fixtureDescription: res.fixtureDescription,
                        assetTagId: res.assetTagId,
                        assetDisable: true,
                        assetDuplicate: false,
                        assetExists: false,
                        assetError: false,
                        wayfinder: false,
                        previousAssetTag: res.previousAssetTag,
                        fixtureCost: res.fixtureCost,
                        status: res.status,
                        installerName: res.installerName,
                        installerContact: res.installerContact,
                        installerPhone: res.installerPhone,
                        actualInstallationDate: res.actualInstallationDate,
                        proposedInstallationDate: res.proposedInstallationDate,
                        deleteBtn: true,
                        clickallfunctionlity: true,
                        existingrecordforcopy: true,
                        existingrecord: false,
                        colorchange: true,
                        dialogueboxforautofill: false,
                        fieldDisable: (userDetails.role === "Installer" || "Fixture Manufacturer") ? false : true,
                        modelOptions: storeDrpdwns.model ? storeDrpdwns.model : [],
                        fixtureOptions: storeDrpdwns.fixtures ? storeDrpdwns.fixtures : [],
                        fixtureDescOptions: storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : [],
                    })
                })

                this.setState({copysuccessfullymessage: true})

              

            } else {
          this.setState({copyerrormessage: true})
          setTimeout(() => {
            // formFields.checkassetsuccessfulmessage = false
            return this.setState({
                copyerrormessage: false,
            });
        }, 2000);
            }
            
        }) 
        
       
        setTimeout(() => {
            return this.setState({formFields});
        }, 2000);
        // this.setState({formFields})
        this.setState({ materialInfoList })
        this.setState({showcopyinput: false})
        // const res =  axios.get(url)

    }

    copyfunction(){
        const {formFields} = this.state
        formFields.modelimport = ''
        formFields.glidvalues = ''
        this.setState({formFields})
     this.setState({showcopyinput: true})
    }
    Okaybuttonforimport(){
            return this.setState({
                copysuccessfullymessage: false,
            });
    }

    onSearch(val) {
        console.log('search:', val);
      }

      
    render() {

        const { formFields, formLoader, assetError, copysuccessfullymessage, copyerrormessage, showcopyinput, checkassetsuccessfulmessage, uploadiconshow, dialogueboxforbeforeupload, assetCheckLoader, showRemainChars, showsumbitbutton, imagevalidation, materialinfovalidation, showvalidationinformation, assetduplicatevalidation, showsubmitbuttonvalidation, checkassetfunctionvalidationcheck, loadingvalidation, vali, clickallfunctionlity, idxtoupdate, dialogueboxforautofill, warningbox, fileNameduplicate, table__loader } = this.state
        const { storeData } = this.props
        const { userDetails } = this.props
        const { installationImage } = this.props

        const { glidvalues } = this.props.storeDrpdwns


        const {  fixturedescriptionforexisting } = this.props.storeDrpdwns 
        console.log('fixturedescriptionforexisting', fixturedescriptionforexisting)

        
        console.log("materiallist", this.props)
        console.log("materiallist", this.props.storeDrpdwns)


        const handleChangevalue = (event) => {
            // setValue(event.target.value);

            let { formFields } = Object.assign({}, this.state);
            formFields[event.target.name] = event.target.value
            this.setState({ formFields })
        };

        
        // formFields.countlength = this.props.storeDrpdwns.materialInfo.length

        // this.setState({formFields})

    //    this.setState({countlength: this.props.storeDrpdwns.materialInfo.length})
       
        // let i = 0
        const { materialInfoList } = this.state.formFields
        
        materialInfoList.map((res, index) => {
            // if(res.model === 'MISX'){
            //     res.
            // }
            console.log('lengthhh', materialInfoList.length - 1)
            console.log('lengthhh', index)
            if(materialInfoList.length - 1 === index) {
                console.log('99999eee')
            }
            console.log('res.actualInstallationDate', res.proposedInstallationDate)
            if(res.actualInstallationDate && res.actualInstallationDate != '1900-01-01T00:00:00'){
            res.actualInstallationDate = moment(res.actualInstallationDate).format("YYYY-MM-DD")
            } else {
                res.actualInstallationDate = ''
            }
            if (res.proposedInstallationDate && res.proposedInstallationDate != '1900-01-01T00:00:00') {
                res.proposedInstallationDate = moment(res.proposedInstallationDate).format("YYYY-MM-DD")
            } else {
                res.proposedInstallationDate = ''
            }
        })

        // this.setState({materialInfoList})
        // for(let i = 0; i<fixturedescriptionforexisting.length; i++ ){
        //     materialInfoList[i].fixturedescriptionforexisting = fixturedescriptionforexisting[i]
        // }
        // fixturedescriptionforexisting.map(res =>
        //     {
                
        //     })


            console.log('fixturedescriptionforexisting', materialInfoList)

       
        console.log('materiallist', formFields)


        // console.log("listmaterial", formFields.materialInfoList[1].fixtureDescription)


        const handleChange = (event) => {

            let { formFields } = Object.assign({}, this.state);
            formFields[event.target.name] = event.target.value
            this.setState({ formFields })
        };








        // const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

        // const handleDateChange = (date) => {
        //   setSelectedDate(date);
        // };


        this.materialInfoValidator.purgeFields();

        // console.log('ddd', formFields.materialInfoList[0].previousAssetTag)

        return (
            <div className="pb-5">
                <div>

                {copysuccessfullymessage && <div>
                        <Dialog open={copysuccessfullymessage} aria-labelledby="form-dialog-title" className="widthfordialoguebox">
                            <DialogTitle id="form-dialog-title" className="mb-4"></DialogTitle>
                            {/* <DialogContent className="mb-4">
                                <h3>Successfully imported {formFields.modelimport} from {formFields.glidvalues} </h3>
                            </DialogContent> */}
                            <DialogContent className="mb-4 mt-4 d-flex">
                                    <span className="d-flex contentdesignindialoguebox">Successfully imported {formFields.modelimport} fixture from {formFields.glidvalues}. Imported records are in <p className="colororange ml-2">green.</p></span>
                                </DialogContent> 
                            <DialogActions className="fixedselection mb-4">
                            <div className="mb-2 add__asset">
                                    <Button onClick={() => this.Okaybuttonforimport()} color="primary">
                                        Okay
                                    </Button>
                                    </div>
                                </DialogActions>
                        </Dialog>
                    </div>}
                {copyerrormessage && <div>
                        <Dialog open={copyerrormessage} aria-labelledby="form-dialog-title" className="widthfordialoguebox">
                            <DialogTitle id="form-dialog-title" className="mb-4"></DialogTitle>
                            <DialogContent className="mb-5">
                                <h3>No record found</h3>
                            </DialogContent>
                            {/* <DialogActions className="fixedselection mb-4">
                                    <Button onClick={() => this.Okaydialogueboxforbeforeupload()} color="primary">
                                        Continue
                                    </Button>
                                </DialogActions> */}
                        </Dialog>
                    </div>}
                    {checkassetsuccessfulmessage && <div>
                        <Dialog open={checkassetsuccessfulmessage} aria-labelledby="form-dialog-title" className="widthfordialoguebox">
                            <DialogTitle id="form-dialog-title" className="mb-4"></DialogTitle>
                            <DialogContent className="mb-5">
                                <h3>Successfully Replaced</h3>
                            </DialogContent>
                            {/* <DialogActions className="fixedselection mb-4">
                                    <Button onClick={() => this.Okaydialogueboxforbeforeupload()} color="primary">
                                        Continue
                                    </Button>
                                </DialogActions> */}
                        </Dialog>
                    </div>}

                    {dialogueboxforbeforeupload &&
                        <div>
                            <Dialog open={dialogueboxforbeforeupload} aria-labelledby="form-dialog-title" className="widthfordialoguebox">
                                <div className="paading"><span className="headingfordialgoebox">Default date format </span></div>
                                <DialogContent className="mb-4 mt-4">
                                    <span className="contentdesignindialoguebox">Make sure the date fields are in YYYY-MM-DD or YYYY/MM/DD format</span>
                                </DialogContent>
                                <DialogActions className="fixedselection mb-4">
                                    <div className="mb-2 add__asset">
                                        <Button variant="contained" onClick={() => this.Okaydialogueboxforbeforeupload()} color="primary">
                                            Continue  <input type="file" className={fileNameduplicate ? "inputdesignforupload1 cursorpointer" : "inputdesignforupload cursorpointer"} Name="Upload" onChange={(e) => this.handleUpload(e)} onClick={(event) => {
                                        event.target.value = null
                                    }} style={{ display: "none" }}/>
                                        </Button>
                                    </div>
                                </DialogActions>
                            </Dialog>
                        </div>}
                    {warningbox &&
                        <div>
                            <Dialog open={warningbox} aria-labelledby="form-dialog-title " className="widthfordialoguebox">
                                <div className="paading"><span className="headingfordialgoebox">Date format issue </span></div>

                                {/* <DialogTitle id="form-dialog-title">Date format issue</DialogTitle> */}
                                <DialogContent className="mb-4 mt-4">
                                    <span className="contentdesignindialoguebox">Some of the date values are not in the required format(YYYY-MM-DD or YYYY/MM/DD). if  you choose to CONTINUE, These date values will not be loaded and you need to change theright dates in the tool. </span>
                                </DialogContent>
                                <DialogActions className="fixedselection mb-4">
                                    <div className="mb-2 add__asset">
                                        <Button className="mr-2" onClick={() => this.cancalwarningbox()} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => this.handleokayfordateformatdialoguebox()} color="primary">
                                            Continue
                                        </Button>
                                    </div>
                                </DialogActions>
                            </Dialog>
                        </div>}
                    {dialogueboxforautofill &&
                        <div>
                            <Dialog open={dialogueboxforautofill} aria-labelledby="form-dialog-title" className="widthfordialoguebox">
                                <div className="paading"><span className="headingfordialgoebox">Auto Fill </span></div>
                                {/* <DialogTitle id="form-dialog-title">Auto Fill</DialogTitle> */}
                                <DialogContent className="mb-4 mt-4">
                                    <span className="contentdesignindialoguebox">This action autofills Status, Installer, Installer Contact, Installer Name, Actual Installation Date for {formFields.materialInfoList[formFields.idxtoupdate].model}</span>
                                </DialogContent>
                                <DialogActions className="fixedselection mb-4">
                                    <div className="mb-2 add__asset">
                                        <Button className="mr-2" onClick={() => this.handleCancelfordialogue()} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => this.clickfunction1()} color="primary">
                                            Okay
                                        </Button>
                                    </div>
                                </DialogActions>
                            </Dialog>
                        </div>}
                    <div>

                    </div>
                    <div className="d-flex flex-column ">
                        <div className="col-lg-12 textalignend d-flex mt-2 ml-3">
                            { !showcopyinput ? 
                            <div className="d-flex col-lg-4 pl-0">
                            <div className="mb-2 add__asset">
                                            <Button onClick={() => this.copyfunction()} title="Copy from GLID" variant="contained" >Import</Button>
                                        </div>
                                        </div> :

                            <div className="d-flex col-lg-4 pl-0">
                            
                                <div className="margintop">Import</div>
                                <NormalSelect1 models = 'Model' options={formFields.materialInfoList && formFields.materialInfoList[0].modelOptions} handleimportfunction={(data) => this.handleimportfunction(data, "Model")} values={formFields.modelimport} onSearch={(data) => this.onSearch(data)} />
                                <div className="margintop">From</div>

                                {/* <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className="materialModal"
                                    onChange={(e) => this.handleimportfunction(e, 'model')}

                                    // title={formFields.materialInfoList[idx].model && formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                    // value={formFields.materialInfoList[idx].model && formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                    name="model"
                                // disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}
                                // onClick = {() => this.filtervaluesformodel('Model', formFields.materialInfoList[idx].model)}
                                // onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                >


                                    {formFields.materialInfoList && formFields.materialInfoList[0].modelOptions && formFields.materialInfoList[0].modelOptions.length > 0 && formFields.materialInfoList[0].modelOptions.map((data) => {
                                        return (
                                            <MenuItem value={data} title={data}>{data}</MenuItem>
                                        )
                                    })}
                                </Select> */}
                                <NormalSelect1 options={glidvalues && glidvalues} handleimportfunction={(data) => this.handleimportfunction(data, " ")} values={formFields.glidvalues} models = 'GLID'/>

                                {/* <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className="materialModal"
                                    onChange={(e) => this.handleimportfunction(e, '')}

                                    // title={formFields.materialInfoList[idx].model && formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                    // value={formFields.materialInfoList[idx].model && formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                    name="model"
                                // disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}
                                // onClick = {() => this.filtervaluesformodel('Model', formFields.materialInfoList[idx].model)}
                                // onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                >


                                    {glidvalues && glidvalues.length > 0 && glidvalues.map((data) => {
                                        return (
                                            <MenuItem value={data} title={data}>{data}</MenuItem>
                                        )
                                    })}
                                </Select> */}
                                {formFields.glidvalues && formFields.modelimport &&
                                <div className="mb-2 add__asset ml-4">
                                <Button variant="contained" className="replicatebutton2" onClick={() => this.copyfromanthoerglidid()}>Import</Button>
                                </div> }
                            </div>}

                            {!clickallfunctionlity ? <div className="col-lg-7  col-md-11 col-sm-12 pr-0 ">

                                <button className=" add__asset replicatebutton1 mb-2 mt-2" variant="contained" onClick={() => this.clickfunction()}> autofill </button></div> : <div className="col-lg-7  col-md-11 col-sm-12 pr-0 "></div>

                            }
                            {materialInfoList.length > 0 && <div className={!clickallfunctionlity ? "marginleftforico4" : "marginleftforico"}>
                                <CSVLink className="paddingrightfordownload" filename='data.csv' data={materialInfoList} headers={headerforcsv}>
                                    <AiOutlineDownload className="mr-4 ml-3 colorblack" title="Download as csv" size={27}></AiOutlineDownload>
                                    {/* <div className="mb-2 add__asset">
                                            <Button className="uploadbuttonfordownload" title="Download as csv" variant="contained" >Download</Button>
                                        </div> */}
                                </CSVLink>
                            </div>
                            }
                            <div className="">
                                {/* <AiOutlineDownload className="mr-5" onClick={() => this.checkonclick()} size={25}></AiOutlineDownload> */}
                                <HiDownload size={23} className="rotatecss cursorpointer" onClick={() => this.enableuploadfunction()}></HiDownload>
                            </div>
                        </div>
                        <div className="d-flex mt-3">
                            <div className={fileNameduplicate ? "ml-3 col-lg-6 d-flex align-items-center" : "ml-3 col-lg-9 d-flex align-items-center"}>
                                <label className="fw-600 text-nowrap mr-4">Material Info</label>
                                {materialInfoList.length > 0 &&
                                    <div className="d-flex fontweigntasset"><label>( Assets Count - </label>
                                        <span className="ml-2 fontweightforcount">{materialInfoList.length} )</span></div>}
                            </div>

                            {/* <p>(Note: For upload csv the date format should be in YYYY-MM-DD or YYYY/MM/DD)</p> */}

                            <div className={fileNameduplicate ? "col-lg-6 d-flex" : "col-lg-3 d-flex"}>
                                {/* {materialInfoList.length > 0 && <div className={fileNameduplicate ? "mr-3 col-lg-4 textalignend" : "mr-3 col-lg-6 textalignend"}>
                                    <CSVLink filename='data.csv' data={materialInfoList} headers={headerforcsv}>
                                        <div className="mb-2 add__asset">
                                            <Button className="uploadbuttonfordownload" title="Download as csv" variant="contained" >Download</Button>
                                        </div>
                                    </CSVLink>
                                </div>} */}
                                {/* {uploadiconshow && <div className={fileNameduplicate ? "col-lg-4 pr-2" : "col-lg-6 pr-2"}>
                                    <div className="mb-2 add__asset">
                                        <Button className="uploadbutton" variant="contained" onClick={() => this.enableuploadfunction()} >upload</Button>
                                    </div>
                                </div>} */}
                                {/* <AiOutlineUpload size={25} title="Upload" onClick={() => this.enableuploadfunction()}></AiOutlineUpload>} */}
                                {!uploadiconshow && <div className={fileNameduplicate && !clickallfunctionlity ? "col-lg-5 col-md-5 col-sm-6 pr-0 textalignend" : fileNameduplicate && clickallfunctionlity ? "col-lg-6 col-md-5 pr-0 textalignend " : "col-lg-12 pr-0 textalignend"}>
                                    <input type="file"   className={fileNameduplicate ? "inputdesignforupload1 cursorpointer" : "inputdesignforupload cursorpointer"} Name="Upload" onChange={(e) => this.handleUpload(e)} onClick={(event) => {
                                        event.target.value = null
                                    }} /></div>}
                                <div className={fileNameduplicate && !clickallfunctionlity ? "col-lg-6 col-md-7 col-sm-6 textaligncenter" : clickallfunctionlity ? "col-lg-6 col-md-7 textalignend pr-0 marginright " : ""}>
                                    {fileNameduplicate ? <div className="mb-2 add__asset">
                                        <Button variant="contained" className="replicatebutton2 " onClick={() => this.handlechangedforreplicate()} >Replace assets</Button></div> : ''}

                                    {/* <button className="replicatebutton2 mt-3" onClick={() => this.handlechangedforreplicate()} > REPLACE EXISTS DATA </button> : ''} */}
                                </div>


                                {/* <div className="mt-0 mb-1">
                        <UploadComponent name={"Excelfile"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true}  />
                        {formFields.excelfile && formFields.excelfile.length > 0 &&
                                                        <div className="mt-1 d-flex align-items-center">
                                                            <FilePreview name="Excelfiles" files={formFields.excelfile}/>
                                                        </div>
                                                    }            
                              </div> */}
                            </div>

                        </div>
                        {/* <div className="col-lg-12 textalignend">
                            {fileNameduplicate ? <div className="mb-2 add__asset">
                                <Button variant="contained" className="replicatebutton2 mt-3" onClick={() => this.handlechangedforreplicate()} >REPLACE EXISTing DATA</Button></div> : ''} */}

                        {/* <button className="replicatebutton2 mt-3" onClick={() => this.handlechangedforreplicate()} > REPLACE EXISTS DATA </button> : ''} */}
                        {/* </div> */}




                        {/* Table experiement */}
                        <div className="col-12 fixture__installer">
                            <CustomTable columns={columns} tableLength={materialInfoList.length} hideSortLable={false} loader={!table__loader} onSort={(data) => this.onSort(data)}  >
                                {materialInfoList.map((item, idx) => {

                                    // console.log("itemdata", item)
                                    return (
                                        <TableRow>
                                            <TableCell className="material__info--err">

                                                <FormControl className="material__info--err">
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        // className={formFields.materialInfoList[idx].colorchange ? "materialDesc4" : "materialDesc1"}
                                                        className={formFields.materialInfoList[idx].colorchange ? "materialModalcolorchange" : "materialModal"}
                                                        
                                                        title={formFields.materialInfoList[idx].model && formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                                        value={formFields.materialInfoList[idx].model && formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                                        name="model"
                                                        disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}
                                                        // onClick = {() => this.filtervaluesformodel('Model', formFields.materialInfoList[idx].model)}
                                                        onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                    >


                                                        {formFields.materialInfoList[idx].modelOptions && formFields.materialInfoList[idx].modelOptions.length > 0 && formFields.materialInfoList[idx].modelOptions.map((data) => {
                                                            return (
                                                                <MenuItem value={data} title={data}>{data}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>

                                                    {(userDetails.role === "Country Lead") && this.materialInfoValidator.message('model', formFields.materialInfoList[idx].model, 'requiredText')}

                                                </FormControl>


                                            </TableCell>

                                            <TableCell>


                                                <FormControl className="material__info--err">

                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        fullWidth
                                                        className={formFields.materialInfoList[idx].colorchange ? "materialDesc4" : "materialDesc"}
                                                        title={formFields.materialInfoList[idx].sku && formFields.materialInfoList[idx].sku ? formFields.materialInfoList[idx].sku : ""}
                                                        value={formFields.materialInfoList[idx].sku && formFields.materialInfoList[idx].sku ? formFields.materialInfoList[idx].sku : ""}
                                                        name="sku"
                                                        openOnFocus={false}
                                                        onLoad={() => this.filtervaluesformodel('sku', idx, formFields.materialInfoList[idx].model)}
                                                        onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                        disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}


                                                    >
                                                        {formFields.materialInfoList[idx].fixturesforexisting && formFields.materialInfoList[idx].fixturesforexisting.length > 0 ? <div> { formFields.materialInfoList[idx].fixtureOptions && formFields.materialInfoList[idx].fixtureOptions.length > 0 && formFields.materialInfoList[idx].fixturesforexisting.map((data) => {
                                                            return (
                                                                <MenuItem value={data}>{data}</MenuItem>
                                                            )
                                                        })}</div> : <div> { formFields.materialInfoList[idx].fixtureOptions && formFields.materialInfoList[idx].fixtureOptions.length > 0 && formFields.materialInfoList[idx].fixtureOptions.map((data) => {
                                                            return (
                                                                <MenuItem value={data}>{data}</MenuItem>
                                                            )
                                                        })}</div>}
                                                    </Select>

                                                    {(userDetails.role === "Country Lead") && this.materialInfoValidator.message('sku', formFields.materialInfoList[idx].sku, 'requiredText')}

                                                </FormControl>

                                            </TableCell>

                                            <TableCell className="material__info--err">

                                                <FormControl>

                                                    <Select
                                                        fullWidth
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        title={formFields.materialInfoList[idx].fixtureDescription && formFields.materialInfoList[idx].fixtureDescription !== "null" ? formFields.materialInfoList[idx].fixtureDescription : ""}

                                                        value={formFields.materialInfoList[idx].fixtureDescription && formFields.materialInfoList[idx].fixtureDescription !== "null" ? formFields.materialInfoList[idx].fixtureDescription : ""}
                                                        name="fixtureDescription"
                                                        onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                        disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}
                                                        // className="materialDesc1"
                                                        className={formFields.materialInfoList[idx].colorchange ? "materialDesc4" : "materialDesc1"}

                                                    >
                                                        {formFields.materialInfoList[idx].fixturedescriptionforexisting && formFields.materialInfoList[idx].fixtureDescOptions && formFields.materialInfoList[idx].fixtureDescOptions.length > 0 && formFields.materialInfoList[idx].fixturedescriptionforexisting.map((data) => {
                                                            return (
                                                                <MenuItem value={data}>{data}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>


                                                    {(userDetails.role === "Country Lead") && this.materialInfoValidator.message('fixtureDescription', formFields.materialInfoList[idx].fixtureDescription, 'requiredText')}

                                                </FormControl>


                                            </TableCell>

                                            <TableCell className=" material__infodate--err material__text">



                                                <TextField
                                                    id="standard-multiline-flexible"
                                                    fullWidth
                                                    multiline={false}
                                                    type="text"
                                                    name="assetTagId"
                                                    className={formFields.materialInfoList[idx].colorchange ? "materialassettag1" : "materialassettag"}
                                                    onBlur={() => this.checkAsset(formFields.materialInfoList[idx].assetTagId, idx, 'nonvalidate')}
                                                    title={formFields.materialInfoList[idx].assetTagId && formFields.materialInfoList[idx].assetTagId !== "null" ? formFields.materialInfoList[idx].assetTagId : ""}

                                                    value={formFields.materialInfoList[idx].assetTagId && formFields.materialInfoList[idx].assetTagId !== "null" ? formFields.materialInfoList[idx].assetTagId : ""}
                                                    onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                    disabled={(userDetails.role === "Store Planner" || (!formFields.materialInfoList[idx].assetDisable && formFields.materialInfoList[idx].assetTagId && userDetails.role !== "Admin") ? true : false)}


                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment disablePointerEvents={(userDetails.role === "Store Planner" || (!formFields.materialInfoList[idx].assetDisable && formFields.materialInfoList[idx].assetTagId && userDetails.role !== "Admin") ? true : false)} position="end">
                                                                <Scanner ScannedAssetId={this.ScannedAssetId} chosenIndex={idx} />
                                                            </InputAdornment>
                                                        )

                                                    }}
                                                />

                                                {formFields.materialInfoList[idx].assetDuplicate && <span className="error-message">AssetId already exists</span>}

                                                {!formFields.materialInfoList[idx].assetDuplicate && formFields.materialInfoList[idx].assetError && <span className="error-message">Invalid AssetTagId length</span>}

                                                <span style={{ display: "none" }}>
                                                    {formFields.materialInfoList[idx].assetError && this.materialInfoValidator.message('assetTagId', formFields.materialInfoList[idx].assetTagId, 'min:7|max:9')}
                                                </span>

                                                {/* {(userDetails.role === "Installer" && !formFields.materialInfoList[idx].wayfinder) && this.materialInfoValidator.message('assetTagId', formFields.materialInfoList[idx].assetTagId, 'requiredText|min:7|max:9')} */}

                                            </TableCell>

                                            {/* <TableCell className="material__info--err material__text">
                                                <TextField
                                                    id="standard-multiline-flexible"
                                                    fullWidth
                                                    multiline={false}
                                                    maxRows={4}
                                                    onmouseover={formFields.materialInfoList[idx].previousAssetTag && formFields.materialInfoList[idx].previousAssetTag !== "null" && formFields.materialInfoList[idx].previousAssetTag !== undefined ? formFields.materialInfoList[idx].previousAssetTag : ""}
                                                    name="previousAssetTag"
                                                    title={formFields.materialInfoList[idx].previousAssetTag && formFields.materialInfoList[idx].previousAssetTag !== "null" && formFields.materialInfoList[idx].previousAssetTag !== undefined ? formFields.materialInfoList[idx].previousAssetTag : ""}

                                                    value={formFields.materialInfoList[idx].previousAssetTag && formFields.materialInfoList[idx].previousAssetTag !== undefined && formFields.materialInfoList[idx].previousAssetTag !== "null"  ? formFields.materialInfoList[idx].previousAssetTag : ""}
                                                    onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                    disabled={(userDetails.role === "Store Planner" || formFields.materialInfoList[idx].status !== "Refreshed" ? true : false)}
                                                />

                                                {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.materialInfoValidator.message('previousAssetTag', formFields.materialInfoList[idx].previousAssetTag, 'max:8')}
                                            </TableCell> */}


                                            {/* <TableCell className="material__info--err material__text mr-2">

                                                <TextField
                                                    id="standard-multiline-flexible"
                                                    fullWidth
                                                    multiline={false}
                                                    title={formFields.materialInfoList[idx].fixtureCost !== "null" ? formFields.materialInfoList[idx].fixtureCost : ""}
                                                    name="fixtureCost"
                                                    value={formFields.materialInfoList[idx].fixtureDescription}
                                                    disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false}

                                                    onChange={(e) => this.handleMaterialInfoListValues(e, idx)}

                                                />

                                            </TableCell> */}


                                            <TableCell>
                                                <div className=" material__info--err mr-2">


                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        className={formFields.materialInfoList[idx].colorchange ? "materialDescforstatus1" : "materialDescforstatus"}
                                                        title={formFields.materialInfoList[idx].status && formFields.materialInfoList[idx].status !== "null" ? formFields.materialInfoList[idx].status : ""}

                                                        value={formFields.materialInfoList[idx].status && formFields.materialInfoList[idx].status !== "null" ? formFields.materialInfoList[idx].status : ""}
                                                        name="status"
                                                        onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                        disabled={userDetails.role === "Store Planner" ? true : false}
                                                    >
                                                        {/* {userDetails.role === "Country Lead" && <span className="field__required">*</span>} */}

                                                        {formFields.statusOptions && formFields.statusOptions.length > 0 && formFields.statusOptions.map((data) => {
                                                            return (
                                                                <MenuItem value={data}>{data}</MenuItem>
                                                            )
                                                        })}

                                                    </Select>

                                                    {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Country Lead") && this.materialInfoValidator.message('status', formFields.materialInfoList[idx].status, 'requiredText')}



                                                </div>
                                            </TableCell>

                                            <TableCell className="material__infodate--err material__text mr-2 mt-1">

                                                <TextField
                                                    id="standard-multiline-flexible"
                                                    fullWidth
                                                    multiline={false}
                                                    maxRows={4}
                                                    className={formFields.materialInfoList[idx].colorchange ? "materialDescforinstaller1" : "materialDescforinstaller"}


                                                    title={formFields.materialInfoList[idx].installerName && formFields.materialInfoList[idx].installerName !== "null" ? formFields.materialInfoList[idx].installerName : ""}
                                                    // onBlur={(e) => this.replicatefunction(e, idx)}

                                                    name="installerName"
                                                    value={formFields.materialInfoList[idx].installerName && formFields.materialInfoList[idx].installerName !== "null" ? formFields.materialInfoList[idx].installerName : ""}
                                                    disabled={userDetails.role === "Store Planner" ? true : false}

                                                    onChange={(e) => this.handleMaterialInfoListValues(e, idx)}


                                                />


                                                {(userDetails.role === "Installer") && this.materialInfoValidator.message('installerName', formFields.materialInfoList[idx].installerName, 'requiredText')}


                                            </TableCell>
                                            <TableCell className="material__infodate--err material__text">

                                                <TextField
                                                    id="standard-multiline-flexible"
                                                    fullWidth
                                                    multiline={false}
                                                    maxRows={4}
                                                    name="installerContact"
                                                    className={formFields.materialInfoList[idx].colorchange ? "materialDescforinstaller1" : "materialDescforinstaller"}

                                                    title={formFields.materialInfoList[idx].installerContact && formFields.materialInfoList[idx].installerContact !== "null" ? formFields.materialInfoList[idx].installerContact : ""}

                                                    value={formFields.materialInfoList[idx].installerContact && formFields.materialInfoList[idx].installerContact !== "null" ? formFields.materialInfoList[idx].installerContact : ""}
                                                    onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                    disabled={userDetails.role === "Store Planner" ? true : false}
                                                />



                                                {(userDetails.role === "Installer") && this.materialInfoValidator.message('installerContact', formFields.materialInfoList[idx].installerContact, 'requiredText')}


                                            </TableCell>

                                            <TableCell className="material__infodate--err material__text">

                                                <TextField
                                                    id="standard-multiline-flexible"
                                                    fullWidth
                                                    multiline={false}
                                                    maxRows={4}
                                                    name="installerPhone"
                                                    title={formFields.materialInfoList[idx].installerPhone && formFields.materialInfoList[idx].installerPhone !== "null" ? formFields.materialInfoList[idx].installerPhone : ""}
                                                    className={formFields.materialInfoList[idx].colorchange ? "materialDescforinstaller1" : "materialDescforinstaller"}

                                                    value={formFields.materialInfoList[idx].installerPhone && formFields.materialInfoList[idx].installerPhone !== "null" ? formFields.materialInfoList[idx].installerPhone : ""}
                                                    onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                    disabled={userDetails.role === "Store Planner" ? true : false}
                                                />



                                                {(userDetails.role === "Installer") && this.materialInfoValidator.message('installerPhone', formFields.materialInfoList[idx].installerPhone, 'requiredText')}


                                            </TableCell>

                                            <TableCell className="material__infodate--err">



                                                <DatePicker
                                                    format={"YYYY-MM-DD"}
                                                    disabled={userDetails.role === "Store Planner" ? true : false} name="actualInstallationDate"
                                                    title={formFields.materialInfoList[idx].actualInstallationDate && (formFields.materialInfoList[idx].actualInstallationDate !== "1900-01-01T00:00:00" && formFields.materialInfoList[idx].actualInstallationDate !== "" && formFields.materialInfoList[idx].actualInstallationDate !== null) ? moment(formFields.materialInfoList[idx].actualInstallationDate) : ""}
                                                    // className={formFields.materialInfoList[idx].colorchange ? "materialDescforinstaller1" : "materialDescforinstaller"}
                                                    className={formFields.materialInfoList[idx].colorchange ? "materialDescforproposeddate" : "materialDescforproposeddate1"}

                                                    value={formFields.materialInfoList[idx].actualInstallationDate && (formFields.materialInfoList[idx].actualInstallationDate !== "1900-01-01T00:00:00" && formFields.materialInfoList[idx].actualInstallationDate !== "" && formFields.materialInfoList[idx].actualInstallationDate !== null) ? moment(formFields.materialInfoList[idx].actualInstallationDate) : ""}
                                                    onChange={(data) => this.handleDate(data, "actualInstallationDate", idx)} />



                                                {(userDetails.role === "Installer") && this.materialInfoValidator.message('actualInstallationDate', formFields.materialInfoList[idx].actualInstallationDate, 'requiredText')}

                                            </TableCell>


                                            <TableCell className="material__infodate--err ">

                                                {/* {(userDetails.role === "Country Lead") && <span className="field__required">*</span>} */}

                                                <DatePicker
                                                    format={"YYYY-MM-DD"}
                                                    className={formFields.materialInfoList[idx].colorchange ? "materialDescforproposeddate" : "materialDescforproposeddate1"}

                                                    disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}
                                                    name="proposedInstallationDate"
                                                    value={formFields.materialInfoList[idx].proposedInstallationDate && (formFields.materialInfoList[idx].proposedInstallationDate !== "1900-01-01T00:00:00" && formFields.materialInfoList[idx].proposedInstallationDate !== "" && formFields.materialInfoList[idx].proposedInstallationDate !== null) ? moment(formFields.materialInfoList[idx].proposedInstallationDate) : ""}

                                                    onChange={(data) => this.handleDate(data, "proposedInstallationDate", idx)}
                                                />


                                                {userDetails.role === "Country Lead" && this.materialInfoValidator.message('proposedInstallationDate', formFields.materialInfoList[idx].proposedInstallationDate, 'requiredText')}


                                            </TableCell>

                                            <TableCell>
                                                <div className="d-flex align-items-center">
                                                    {(formFields.materialInfoList[idx].deleteBtn || userDetails.role === "Admin") ?
                                                        <IconButton color="secondary" onClick={() => this.handleMaterialInfoList(idx, "remove")}>
                                                            <DeleteOutline className="delete__icon" />
                                                        </IconButton>
                                                        : <IconButton>
                                                            <DeleteOutline className="hide-icon" />
                                                        </IconButton>
                                                    }



                                                    {/* {userDetails.role !== "Store Planner" && <IconButton className="cursor-pointer" onClick={() => this.handleMaterialInfoList(idx, "add")} color="primary">
                                                  
                                                    <AddCircleOutline className="add__icon" />
                                                </IconButton>} */}

                                                </div>
                                            </TableCell>

                                        </TableRow>
                                    )
                                })
                                }

                            </CustomTable>
                            <div className="d-flex justify-content-end">
                                {userDetails.role !== "Store Planner" &&
                                    <div className="mt-4 add__asset">
                                        <Button variant="contained" className={`${assetCheckLoader && "btn__disabled"}`} onClick={() => !assetCheckLoader && this.handleMaterialInfoList(0, "add")}>Add Asset</Button>
                                    </div>

                                }
                            </div>
                        </div>


                        {/*  */}



                        {/* <Paper className="col-12 material__container">
                        {materialInfoList.map((item, idx) => {

                            console.log("itemdata", item)
                            return (

                                <div className="d-flex mt-5">


                                    <div className="maxwidthformaterial material__info--err mr-2 mt-1">



                                        <FormControl fullWidth>

                                            <InputLabel id="demo-simple-select-label">
                                                Model
                                                {(userDetails.role === "Country Lead" || userDetails.role === "Admin") && <span className="field__required">*</span>}
                                            </InputLabel>

                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"

                                                value={formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                                name="model"
                                                disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false}
                                                onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                            >


                                                {formFields.materialInfoList[idx].modelOptions && formFields.materialInfoList[idx].modelOptions.length > 0 && formFields.materialInfoList[idx].modelOptions.map((data) => {
                                                    return (
                                                        <MenuItem value={data}>{data}</MenuItem>
                                                    )
                                                })}
                                            </Select>

                                            {(userDetails.role === "Country Lead" || userDetails.role === "Admin") && this.materialInfoValidator.message('model', formFields.materialInfoList[idx].model, 'required')}

                                        </FormControl>


                                    </div>

                                    <div className="maxwidthformaterial material__info--err  mr-2 mt-1">

                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">

                                                Fixture
                                                {(userDetails.role === "Country Lead" || userDetails.role === "Admin") && <span className="field__required">*</span>}

                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formFields.materialInfoList[idx].sku ? formFields.materialInfoList[idx].sku : ""}
                                                name="sku"
                                                onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false}
                                            >
                                                {formFields.materialInfoList[idx].fixtureOptions && formFields.materialInfoList[idx].fixtureOptions.length > 0 && formFields.materialInfoList[idx].fixtureOptions.map((data) => {
                                                    return (
                                                        <MenuItem value={data}>{data}</MenuItem>
                                                    )
                                                })}
                                            </Select>

                                            {(userDetails.role === "Country Lead" || userDetails.role === "Admin") && this.materialInfoValidator.message('sku', formFields.materialInfoList[idx].sku, 'required')}

                                        </FormControl>

                                    </div>


                                    <div className="maxwidthformaterialdesc material__info--err  mr-2 mt-1">

                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label w-50">FixtureDescription

                                                {(userDetails.role === "Country Lead" || userDetails.role === "Admin") && <span className="field__required">*</span>}

                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                fullWidth
                                                value={formFields.materialInfoList[idx].fixtureDescription !== "null" ? formFields.materialInfoList[idx].fixtureDescription : ""}
                                                name="fixtureDescription"
                                                onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false}
                                            >
                                                {formFields.materialInfoList[idx].fixtureDescOptions && formFields.materialInfoList[idx].fixtureDescOptions.length > 0 && formFields.materialInfoList[idx].fixtureDescOptions.map((data) => {
                                                    return (
                                                        <MenuItem value={data}>{data}</MenuItem>
                                                    )
                                                })}
                                            </Select>


                                            {(userDetails.role === "Country Lead" || userDetails.role === "Admin") && this.materialInfoValidator.message('fixtureDescription', formFields.materialInfoList[idx].fixtureDescription, 'required')}

                                        </FormControl>
                                    </div>

                                    <div className="maxwidthformaterial mr-2 mt-1 material__info--err">


                                        <TextField
                                            label="Asset ID"
                                            multiline={false}
                                            fullWidth
                                            name="assetTagId"
                                            value={formFields.materialInfoList[idx].assetTagId !== "null" ? formFields.materialInfoList[idx].assetTagId : ""}
                                            onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                            disabled={(userDetails.role === "Store Planner" || (!formFields.materialInfoList[idx].assetDisable && formFields.materialInfoList[idx].assetTagId) ? true : false)}
                                        />



                                        {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>}

                                        {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.materialInfoValidator.message('assetTagId', formFields.materialInfoList[idx].assetTagId, 'max:8')}

                                    </div>


                                    <div className="maxwidthformaterial prev__asset mr-2 mt-1 material__info--err">
                                        <TextField

                                            variant="filled"
                                            label="Previous Asset ID"
                                            multiline={false}
                                            maxRows={4}
                                            fullWidth
                                            name="previousAssetTag"
                                            value={formFields.materialInfoList[idx].previousAssetTag !== "null" ? formFields.materialInfoList[idx].previousAssetTag : ""}
                                            onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                            disabled={(userDetails.role === "Store Planner" || formFields.materialInfoList[idx].status !== "Refreshed" ? true : false)}
                                        />

                                        {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.materialInfoValidator.message('previousAssetTag', formFields.materialInfoList[idx].previousAssetTag, 'max:8')}

                                    </div>


                                    <div className="maxwidthformaterial material__info--err mr-2 mt-1" >
                                        <TextField

                                            variant="filled"
                                            fullWidth
                                            label="Cost"
                                            multiline={false}
                                            maxRows={4}
                                            name="fixtureCost"
                                            value={formFields.materialInfoList[idx].fixtureCost !== "null" ? formFields.materialInfoList[idx].fixtureCost : ""}
                                            disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false}

                                            onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                        />



                                    </div>

                                    <div className="maxwidthformaterial material__info--err mr-2 mt-1">
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label">
                                                Status
                                                {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>}
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formFields.materialInfoList[idx].status !== "null" ? formFields.materialInfoList[idx].status : ""}
                                                name="status"
                                                onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                disabled={userDetails.role === "Store Planner" ? true : false}
                                            >


                                                {formFields.statusOptions && formFields.statusOptions.length > 0 && formFields.statusOptions.map((data) => {
                                                    return (
                                                        <MenuItem value={data}>{data}</MenuItem>
                                                    )
                                                })}

                                            </Select>

                                            {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.materialInfoValidator.message('status', formFields.materialInfoList[idx].status, 'required')}

                                        </FormControl>

                                    </div>

                                    <div className="maxwidthformaterial mr-2 mt-1 material__info--err">


                                        <TextField

                                            fullWidth
                                            label="Installer"
                                            multiline={false}
                                            maxRows={4}
                                            name="installerName"
                                            value={formFields.materialInfoList[idx].installerName !== "null" ? formFields.materialInfoList[idx].installerName : ""}
                                            disabled={userDetails.role === "Store Planner" ? true : false}

                                            onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                        />



                                        {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>}

                                        {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.materialInfoValidator.message('installerName', formFields.materialInfoList[idx].installerName, 'required')}


                                    </div>

                                    <div className="maxwidthformaterial material__info--err mr-2 mt-1">
                                        <TextField
                                            variant="filled"
                                            fullWidth
                                            label={"Contact"}
                                            multiline={false}
                                            maxRows={4}
                                            name="installerContact"
                                            value={formFields.materialInfoList[idx].installerContact !== "null" ? formFields.materialInfoList[idx].installerContact : ""}
                                            onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                            disabled={userDetails.role === "Store Planner" ? true : false}
                                        />

                                        {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>}

                                        {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.materialInfoValidator.message('installerContact', formFields.materialInfoList[idx].installerContact, 'required')}

                                    </div>


                                    <div className="maxwidthformaterial mr-2">

                                        <div className="material__info-err">
                                            <label className="datepickerlabel">  {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>} Actual Installation Date</label>

                                            <DatePicker
                                                format={"YYYY-MM-DD"}
                                                disabledDate={this.disabledDate}
                                                disabled={userDetails.role === "Store Planner" ? true : false} name="actualInstallationDate"
                                                value={(formFields.materialInfoList[idx].actualInstallationDate !== "1900-01-01T00:00:00" && formFields.materialInfoList[idx].actualInstallationDate !== "" && formFields.materialInfoList[idx].actualInstallationDate !== null) ? moment(formFields.materialInfoList[idx].actualInstallationDate) : ""}
                                                onChange={(data) => this.handleDate(data, "actualInstallationDate", idx)} />



                                            {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.materialInfoValidator.message('actualInstallationDate', formFields.materialInfoList[idx].actualInstallationDate, 'required')}
                                        </div>

                                    </div>

                                    <div className="maxwidthformaterialdatepicker mr-2">

                                        <div className="material__info--err">

                                            <label className="datepickerlabel"> {(userDetails.role === "Country Lead" || userDetails.role === "Admin") && <span className="field__required">*</span>} Proposed Installation Date </label>

                                            <DatePicker
                                                format={"YYYY-MM-DD"}
                                                disabledDate={this.disabledDate}
                                                disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false} name="proposedInstallationDate" value={(formFields.materialInfoList[idx].proposedInstallationDate !== "1900-01-01T00:00:00" && formFields.materialInfoList[idx].proposedInstallationDate !== "") ? moment(formFields.materialInfoList[idx].proposedInstallationDate) : ""}

                                                onChange={(data) => this.handleDate(data, "proposedInstallationDate", idx)}
                                            />


                                            {(userDetails.role === "Country Lead" || userDetails.role === "Admin") && this.materialInfoValidator.message('proposedInstallationDate', formFields.materialInfoList[idx].proposedInstallationDate, 'required')}

                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        {formFields.materialInfoList[idx].deleteBtn ? <div className="cursor-pointer" onClick={() => this.handleMaterialInfoList(idx, "remove")}>
                                            <span><MdDelete className="delete__icon" /></span>
                                        </div> : <div>
                                            <span className="hide-icon">icon</span>
                                        </div>
                                        }

                                        {userDetails.role !== "Store Planner" && <div className="cursor-pointer" onClick={() => this.handleMaterialInfoList(idx, "add")}>
                                            <span>
                                                <AiOutlinePlusCircle className="add__icon" />
                                            </span>
                                        </div>}
                                    </div>

                                </div>
                            )
                        })
                        }
                    </Paper> */}


                    </div >


                    <div className="col-12 d-flex mt-5 d-flex flex-lg-row flex-md-row floorplan__form">
                        <div className="col-lg-2  col-sm-12 d-flex align-items-center">
                            <label className="fw-600 mt-3">Delivery  Address</label>
                            {userDetails.role === "Country Lead" && <span className="field__required">*</span>}
                        </div>
                        <div className="col-lg-4 col-xs-3 col-sm-12">
                            <NormalInput value={formFields.deliveryAddress} name="deliveryAddress" onChange={(data) => this.storeInput(data)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false} />


                            {userDetails.role === "Country Lead" && this.validator.message('deliveryAddress', formFields.deliveryAddress, 'required')}
                        </div>
                    </div>

                    <div className="col-12 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                        <div className="col-lg-2  col-sm-12 d-flex align-items-center">
                            <label className="fw-600 mt-3">Delivery city</label>
                            {userDetails.role === "Country Lead" && <span className="field__required">*</span>}
                        </div>
                        <div className="col-lg-4 col-xs-3 col-sm-12">
                            <NormalInput value={formFields.deliveryCity} name="deliveryCity" onChange={(data) => this.storeInput(data)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false} />
                            {userDetails.role === "Country Lead" && this.validator.message('deliveryCity', formFields.deliveryCity, 'required')}
                        </div>
                    </div>

                    <div className="col-12 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                        <div className="col-lg-2 col-sm-12 d-flex align-items-center">
                            <label className="fw-600 mt-3">Delivery State</label>
                            {userDetails.role === "Country Lead" && <span className="field__required">*</span>}
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <NormalInput value={formFields.deliveryState} name="deliveryState" onChange={(data) => this.storeInput(data)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false} />

                            {userDetails.role === "Country Lead" && this.validator.message('deliveryState', formFields.deliveryState, 'required')}
                        </div>
                    </div>


                    <div className="col-12 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                        <div className="col-lg-2 col-xs-9 col-sm-12 align-items-center">
                            <label className="fw-600 mt-3">Delivery Zip</label>
                            {userDetails.role === "Country Lead" && <span className="field__required">*</span>}
                        </div>
                        <div className="col-lg-4 col-xs-3 col-sm-12">
                            <NormalInput value={formFields.deliveryZip} name="deliveryZip" onChange={(data) => this.storeInput(data)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false} />
                            {userDetails.role === "Country Lead" && this.validator.message('deliveryZip', formFields.deliveryZip, 'required')}
                        </div>
                    </div>



                    <div className="col-12 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form image-upload-fixture">
                        <div className="col-lg-2 d-flex align-items-center">
                            <label className="fw-600 mt-3">Installation Images</label>
                            {(userDetails.role === "Installer") && <span className="field__required">*</span>}
                        </div>
                        {/* <div className="col-lg-2 d-flex align-items-center"> */}
                        <div className="col-lg-4 mt-4 add__asset">
                            {/* <Button variant="contained" onClick={() => this.setdialoguebox('true')} > Upload</Button> */}
                            <div>
                                <div className="add__asset d-flex">
                                    <Button variant="contained" onClick={() => this.setdialoguebox('true')}>upload</Button>
                                    {/* userDetails.role != 'Admin' ?
                                    ((formFields.Heroshotfiles && formFields.Heroshotfiles.length > 0) && (formFields.Mainfrontfiles && formFields.Mainfrontfiles.length > 0) && (formFields.Leftfrontfiles && formFields.Leftfrontfiles.length > 0) && (formFields.Rightfrontfiles && formFields.Rightfrontfiles.length > 0) && (formFields.Bestsidefiles && formFields.Mainrearfiles.length > 0) && (formFields.Mainrearfiles && formFields.Bestsidefiles.length > 0)) ?
                                        <div className="imagescontent">Images are available/uploaded</div> : (formFields.Heroshotfiles && formFields.Heroshotfiles.length > 0) || (formFields.Mainfrontfiles && formFields.Mainfrontfiles.length > 0) || (formFields.Leftfrontfiles && formFields.Leftfrontfiles.length > 0) || (formFields.Rightfrontfiles && formFields.Rightfrontfiles.length > 0) || (formFields.Bestsidefiles && formFields.Mainrearfiles.length > 0) || (formFields.Mainrearfiles && formFields.Bestsidefiles.length > 0) ? <div className="errormessage">Not all mandatory fields are uploaded</div> : ""
                                    :  */}
                                    {(formFields.Heroshotfiles && formFields.Heroshotfiles.length > 0) || (formFields.Mainfrontfiles && formFields.Mainfrontfiles.length > 0) || (formFields.Leftfrontfiles && formFields.Leftfrontfiles.length > 0) || (formFields.Rightfrontfiles && formFields.Rightfrontfiles.length > 0) || (formFields.Bestsidefiles && formFields.Mainrearfiles.length > 0) || (formFields.Mainrearfiles && formFields.Bestsidefiles.length > 0) ? <div className="imagescontent">Images are available/uploaded</div> : ""}
                                </div>
                                {this.state.formFields.dialogue &&
                                    <Dialog open={this.state.formFields.dialogue} onClose={this.handleCancel} className="commonforall" aria-labelledby="form-dialog-title">
                                        {/* <DialogTitle id="form-dialog-title">Add Execution Tier</DialogTitle> */}
                                        <DialogContent>
                                            <div className='d-flex col-lg-12 p-0'>

                                                <div className="mt-2 col-lg-4 p-0 headidngfordialoguebox headingfontsize">Installation Images</div>
                                                <div className="textalignend col-lg-8 p-0">
                                                    <GrFormClose size="30" className="icon__clr cursorpointer" onClick={() => this.setdialogueboxfor1(false)} />
                                                </div>
                                            </div>
                                            <div className='d-flex '>

                                                <div className="col-lg-2 p-0 mr-3 floorplan__form image-upload-fixture">

                                                    <div className="font-size align-items-center">
                                                        <label className="fw-600 mt-3">Hero Shot</label>
                                                        {(userDetails.role === "Installer") && <span className="field__required">*</span>}
                                                        {/* <span className="field__required">*</span> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>} */}
                                                    </div>
                                                    <div className="col-lg-2 d-flex align-items-center">
                                                        <UploadComponent name={"Heroshotfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />
                                                        {(userDetails.role === "Installer") && this.installationimagevalidation.message('Heroshotfiles', formFields.Heroshotfiles, 'required')}

                                                        {/* <Button variant="contained">upload</Button> */}
                                                        {/* <div className="add__asset mt-2">
    <Button variant="contained">upload</Button>
    </div> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.validator.message('Signature', formFields.Signature, 'required')} */}
                                                    </div>

                                                    {formFields.Heroshotfiles && formFields.Heroshotfiles.length > 0 &&
                                                        <div className="mt-1 d-flex align-items-center">
                                                            <FilePreview name="Heroshotfiles" files={formFields.Heroshotfiles} removeFile={(idx, name) => this.removeFile(idx, name)} isabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} deletecheck='installation' />
                                                        </div>
                                                    }
                                                </div>
                                                <div className=" col-lg-2 p-0 mr-3 floorplan__form image-upload-fixture">
                                                    <div className="font-size align-items-center">
                                                        <label className="fw-600 mt-3">Main Front</label>
                                                        {(userDetails.role === "Installer") && <span className="field__required">*</span>}
                                                        {/* <span className="field__required">*</span> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>} */}
                                                    </div>
                                                    <div className="col-lg-2 d-flex align-items-center">
                                                        <UploadComponent name={"Mainfrontfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />
                                                        {(userDetails.role === "Installer") && this.installationimagevalidation.message('Mainfrontfiles', formFields.Mainfrontfiles, 'required')}

                                                        {/* <div className="add__asset mt-2">
    <Button variant="contained">upload</Button>
    </div> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.validator.message('Signature', formFields.Signature, 'required')} */}
                                                    </div>
                                                    {/* formFields.Signature && formFields.Signature.length > 0 && */}
                                                    {formFields.Mainfrontfiles && formFields.Mainfrontfiles.length > 0 &&
                                                        <div className="mt-1 d-flex align-items-center">
                                                            {/* <FilePreview name="Signature" /> */}
                                                            <FilePreview name="Mainfrontfiles" files={formFields.Mainfrontfiles} removeFile={(idx, name) => this.removeFile(idx, name)} isabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} deletecheck='installation' />

                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-lg-2 p-0 mr-3 floorplan__form image-upload-fixture">
                                                    <div className="font-size align-items-center">
                                                        <label className="fw-600 mt-3">Left Front 3/4</label>
                                                        {(userDetails.role === "Installer") && <span className="field__required">*</span>}
                                                        {/* <span className="field__required">*</span> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>} */}
                                                    </div>
                                                    <div className="col-lg-2 d-flex align-items-center">
                                                        <UploadComponent name={"Leftfrontfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />
                                                        {(userDetails.role === "Installer") && this.installationimagevalidation.message('Leftfrontfiles', formFields.Leftfrontfiles, 'required')}

                                                        {/* <div className="add__asset mt-2">
    <Button variant="contained">upload</Button>
    </div> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.validator.message('Signature', formFields.Signature, 'required')} */}
                                                    </div>
                                                    {formFields.Leftfrontfiles && formFields.Leftfrontfiles.length > 0 &&
                                                        <div className="mt-1 d-flex align-items-center">
                                                            {/* <FilePreview name="Signature" /> */}
                                                            <FilePreview name="Leftfrontfiles" files={formFields.Leftfrontfiles} removeFile={(idx, name) => this.removeFile(idx, name)} isabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} deletecheck='installation' />

                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-lg-2 p-0 mr-3 floorplan__form image-upload-fixture">
                                                    <div className=" font-size align-items-center">
                                                        <label className="fw-600 mt-3">Right Front 3/4</label>
                                                        {(userDetails.role === "Installer") && <span className="field__required">*</span>}
                                                        {/* <span className="field__required">*</span> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>} */}
                                                    </div>
                                                    <div className="col-lg-2 d-flex align-items-center">
                                                        <UploadComponent name={"Rightfrontfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />
                                                        {(userDetails.role === "Installer") && this.installationimagevalidation.message('Rightfrontfiles', formFields.Rightfrontfiles, 'required')}

                                                        {/* <div className="add__asset mt-2">
    <Button variant="contained">upload</Button>
    </div> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.validator.message('Signature', formFields.Signature, 'required')} */}
                                                    </div>
                                                    {formFields.Rightfrontfiles && formFields.Rightfrontfiles.length > 0 &&
                                                        <div className="mt-1 d-flex align-items-center">
                                                            {/* <FilePreview name="Signature" /> */}
                                                            <FilePreview name="Rightfrontfiles" files={formFields.Rightfrontfiles} removeFile={(idx, name) => this.removeFile(idx, name)} isabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} deletecheck='installation' />

                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-lg-2 p-0 mr-3 floorplan__form image-upload-fixture">
                                                    <div className=" font-size align-items-center">
                                                        <label className="fw-600 mt-3">Main Rear</label>
                                                        {(userDetails.role === "Installer") && <span className="field__required">*</span>}
                                                        {/* <span className="field__required">*</span> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>} */}
                                                    </div>
                                                    <div className="col-lg-2 d-flex align-items-center">
                                                        <UploadComponent name={"Mainrearfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />
                                                        {(userDetails.role === "Installer") && this.installationimagevalidation.message('Mainrearfiles', formFields.Mainrearfiles, 'required')}

                                                        {/* <div className="add__asset mt-2">
    <Button variant="contained">upload</Button>
    </div> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.validator.message('Signature', formFields.Signature, 'required')} */}
                                                    </div>
                                                    {formFields.Mainrearfiles && formFields.Mainrearfiles.length > 0 &&
                                                        <div className="mt-1 d-flex align-items-center">
                                                            {/* <FilePreview name="Signature" /> */}
                                                            <FilePreview name="Mainrearfiles" files={formFields.Mainrearfiles} removeFile={(idx, name) => this.removeFile(idx, name)} isabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} deletecheck='installation' />

                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-lg-2 p-0 mr-3 floorplan__form image-upload-fixture">
                                                    <div className=" font-size align-items-center">
                                                        <label className="fw-600 mt-3">Best Side</label>
                                                        {(userDetails.role === "Installer") && <span className="field__required">*</span>}
                                                        {/* <span className="field__required">*</span> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>} */}
                                                    </div>
                                                    <div className="col-lg-2 d-flex align-items-center">
                                                        <UploadComponent name={"Bestsidefiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />

                                                        {(userDetails.role === "Installer") && this.installationimagevalidation.message('Bestsidefiles', formFields.Bestsidefiles, 'required')}

                                                        {/* <div className="add__asset mt-2">
    <Button variant="contained">upload</Button>
    </div> */}
                                                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.validator.message('Signature', formFields.Signature, 'required')} */}
                                                    </div>
                                                    {formFields.Bestsidefiles && formFields.Bestsidefiles.length > 0 &&
                                                        <div className="mt-1 d-flex align-items-center">
                                                            {/* <FilePreview name="Signature" /> */}
                                                            <FilePreview name="Bestsidefiles" files={formFields.Bestsidefiles} removeFile={(idx, name) => this.removeFile(idx, name)} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} deletecheck='installation' />

                                                        </div>
                                                    }
                                                </div>



                                            </div>
                                            <div className="add__asset_save mt-5 textalignend">
                                                <Button variant="contained" onClick={() => this.setdialogueboxfor1(true)}>save</Button>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>

                                        </DialogActions>
                                    </Dialog>}
                            </div>

                            {/* <UploadComponent name={"InstallationImage"} placeholder={"Choose Image"} multiple={true} storeFiles={(data, name) => this.storeFiles(data, name)} disabled={userDetails.role === "Store Planner" ? true : false} />

                        {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.validator.message('InstallationImage', formFields.InstallationImage, 'required')} */}
                        </div>
                        {/* {formFields.InstallationImage && formFields.InstallationImage.length > 0 && <div className=" col-lg-7 col-sm-12 d-flex align-items-center">
                        <FilePreview name="InstallationImage" files={formFields.InstallationImage} removeFile={(idx, name) => this.removeFile(idx, name)} disabled={userDetails.role === "Store Planner" ? true : false} />
                    </div>
                    } */}
                    </div>
                    <div className="col-12 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form image-upload-fixture">
                        <div className="col-lg-2 d-flex align-items-center">
                            <label className="fw-600 mt-3">Signature</label>
                            {(userDetails.role === "Installer") && <span className="field__required">*</span>}
                        </div>
                        <div className="col-lg-2 d-flex align-items-center">
                            <UploadComponent name={"Signature"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />

                            {(userDetails.role === "Installer") && this.validator.message('Signature', formFields.Signature, 'required')}
                        </div>
                        {formFields.Signature && formFields.Signature.length > 0 && <div className="col-lg-7 col-sm-12 d-flex align-items-center">
                            <FilePreview name="Signature" files={formFields.Signature} removeFile={(idx, name) => this.removeFile(idx, name)} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} deletecheck='singnature' />
                        </div>
                        }
                    </div>
                    {/*  */}
                    <div className="col-12 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                        <div className="col-lg-2 col-xs-9 col-sm-12 align-items-center">
                            <label className="fw-600 mt-3">Reason for change </label>

                        </div>
                        <div className="col-lg-4 col-xs-3 mt-3 col-sm-12 textarea__box">
                            <TextareaAutosize
                                name="Comments"
                                onChange={(data) => this.storeInput(data)}
                                // value={formFields.materialInfoList[0].Comments}
                                multiline
                                style={{ width: "100%" }}
                                minRows={3}
                                maxLength={this.state.maxLength}
                                onFocus={() => this.setState({ showRemainChars: true })}
                                onBlur={() => this.setState({ showRemainChars: false })}
                            />

                            {formFields.Comments && formFields.Comments !== "" && showRemainChars && <span className="text__remain"> {`${this.state.maxLength - formFields.Comments.length} characters remaining`} </span>}
                        </div>

                    </div>
                </div>
                {/*  */}
                {showvalidationinformation && <div className="col-lg-12">
                    {userDetails.role === 'Installer' && <div>
                        {loadingvalidation ? <div> {imagevalidation && materialinfovalidation && checkassetfunctionvalidationcheck ? <div className="validationSuccess mr-2 textalignend"><AiOutlineCheck size="20" className="successicon mr-1"></AiOutlineCheck> Validation Successful </div> : <div className="textalignend mr-2 validationFail"><ImCross size="12"></ImCross>Validation Unsuccessful</div>}</div> : <div className="textalignend col-lg-12">Loading....</div>}
                        {/* {imagevalidation && materialinfovalidation ? <div className="validationSuccess mr-2 textalignend"><AiOutlineCheck size="20" className="successicon mr-1"></AiOutlineCheck> Validation Successful </div> : <div className="textalignend mr-2 validationFail"><ImCross size="12"></ImCross>Validation Unsuccesful</div>} */}
                    </div>}
                    {(userDetails.role === 'Country Lead') && <div>

                        {loadingvalidation ? <div> {materialinfovalidation && checkassetfunctionvalidationcheck ? <div className="validationSuccess mr-2 textalignend"><AiOutlineCheck size="20" className="successicon"></AiOutlineCheck> Validation Successful</div> : <div className="textalignend mr-5 validationFail"><ImCross size="12"></ImCross> Validation Unsuccessful</div>}</div> : <div className="textalignend col-lg-12">Loading....</div>}
                    </div>}
                    {userDetails.role === 'Admin' && <div>
                        {loadingvalidation ? <div>
                            {checkassetfunctionvalidationcheck ? <div className="validationSuccess mr-2 textalignend"><AiOutlineCheck size="20" className="successicon"></AiOutlineCheck> Validation Successful</div> : <div className="textalignend mr-3 validationFail"><ImCross size="12"></ImCross> Validation Unsuccessful</div>}
                            {/* { !checkassetfunctionvalidationcheck && } */}
                        </div> : <div className="textalignend col-lg-12">Loading....</div>}</div>}

                    {userDetails.role === 'Fixture Manufacturer' && <div>{loadingvalidation ? <div>{materialinfovalidation && checkassetfunctionvalidationcheck ? <div className="validationSuccess mr-2 textalignend"><AiOutlineCheck size="20" className="successicon mr-1"></AiOutlineCheck> Validation Successful </div> : <div className="textalignend mr-2 validationFail"><ImCross size="12"></ImCross>Validation Unsuccessful</div>}</div> : <div className="textalignend col-lg-12">Loading....</div>}</div>}
                </div>}
                {/* <LoaderIcon className = "textalignend" size={30} /> */}
                {/* <div>
                    {(this.props.activity.result != '' || checkboolean) && ((new Date().toISOString().split('T')[1].split(':')[1] - valassign) < 3) && (new Date().toISOString().split('T')[1].split(':')[1] - valassign) >= 0 &&
                        <div className="countdowndesign"><Countdown date={val} renderer={this.renderer} /></div>} </div> */}
                <div className="col-lg-12">
                    {userDetails.role != "Store Planner" && <div>
                        {/* {showsumbitbutton ? */}
                        <div className="textalignend col-lg-12 mt-4 add__asset__validation">
                            <Button variant="contained" className="Cancelbuttondesign" onClick={() => this.validatefunction('validate')}>Validate</Button>
                        </div>
                        {/* : <div className="textalignend col-lg-12 mt-4 add__asset__validation">
                                <Button variant="contained" className=" disabled" >Validate</Button>
                            </div>} */}
                    </div>}
                </div>
                <div className="col-lg-12 d-flex btn_Con_Fixture_And_Inst">


                    <div className="col-lg-5 mt-4 flex-row btn_Fixture_And_Inst">
                        {/* <button onClick={() => this.props.cancelModal()} className="Cancelbuttondesign mr-2">
                            Cancel
                        </button> */}
                        <div className="mt-4 add__asset__cancel">
                            <Button variant="contained" onClick={() => this.cancelfunction()} className="Cancelbuttondesign mr-3" > Cancel</Button>
                        </div>
                        <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={() => this.changeTab()} className="previousbuttondesign d-flex mr-2" > Previous</Button>
                        </div>
                        {/* <button onClick={() => this.changeTab()} className="previousbuttondesign d-flex mr-2">
                            <GrFormPrevious className="icon_color_white" size="25" />  Previous
                        </button> */}
                        {userDetails.role === 'Store Planner' && <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={() => !formLoader && this.handleSubmit()} className={`Submitbuttondesign mr-2 ${formLoader && "btn__disabled"}`}> {formLoader ? "Submitting...." : "Submit"}</Button>
                        </div>}
                        {showsubmitbuttonvalidation && userDetails.role != 'Store Planner' &&
                            <div className="mt-4 add__asset">
                                <Button variant="contained" onClick={() => !formLoader && this.handleSubmit()} className={`Submitbuttondesign mr-2 ${formLoader && "btn__disabled"}`}> {formLoader ? "Submitting...." : "Submit"}</Button>
                            </div>}

                        {!showsubmitbuttonvalidation && userDetails.role != 'Store Planner' &&
                            <div className="mt-4 add__asset">
                                <Button className="disabled" variant="contained"> Submit</Button>
                            </div>}
                        {/* {!showsumbitbutton && !showsubmitbuttonvalidation && userDetails.role != 'Store Planner' &&
                            <div className="mt-4 add__asset">
                                <Button className="disabled" variant="contained"> Submit</Button>
                            </div>} */}
                        {/* { formFields.showsumbitbutton ?
                        <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={() => !formLoader && this.handleSubmit()} className={"Submitbuttondesign mr-2 btn__disabled"} >Submit</Button>
                        </div>
    : ''} */}
                        {/* <button onClick={() => !formLoader && this.handleSubmit()} className={`Submitbuttondesign mr-2 ${formLoader && "btn__disabled"}`}  >
                            {formLoader ? "Submitting...." : "Submit"}
                        </button> */}

                    </div>


                </div>

                {dialoguebox == 'true' && <div>pppppppppppppp</div>
                    // <Dialog open={dialoguebox} onClose={handleChange} aria-labelledby="form-dialog-title">
                    //     {/* <DialogTitle id="form-dialog-title">Add Execution Tier</DialogTitle> */}
                    //     <DialogContent>
                    //         <div>hiii</div>
                    //     </DialogContent>
                    //     <DialogActions>

                    //     </DialogActions>
                    // </Dialog>
                }


            </div >
        )
    }
}



const mapStateToProps = (state, userTrack) => {
    return {
        storeData: state.storeInfo.storeData.result,
        storeDrpdwns: state.storeInfo.storeData,
        floorPlanDetails: state.storeInfo.storeInfoDetails,
        userDetails: state.user.userDetails,
        Glid: state.storeInfo.Glid,
        fixtureInstallerDetails: state.storeInfo.storeFixtureDetails.fixtureInstaller,
        listofAdmins: state.user.listofAdmins,
        activity: state.storeInfo.activity,
        userActivity: state.userTrack.userActivity
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addStore,
        loadMaterialOptions,
        loadUserActivity,
        dispatch
    }, dispatch);
};

// const mapStateToProp_installation = ({  installation_ima: { installation_images } }) => {

//     return {

//         installation_images,

//     }
// }




export default connect(mapStateToProps, mapDispatchToProps)(FixtureInstaller)

