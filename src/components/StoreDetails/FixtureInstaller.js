import React, { useState } from "react"
import { NormalInput } from "../Common/NormalInput"
import { NormalSelect } from "../Common/NormalSelect"
import UploadComponent from "../Common/UploadComponent"
import { DatePicker, Input } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
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
import { AddAlertRounded, AddCircleOutline, AddOutlined, DeleteOutline, DeleteOutlineRounded } from "@material-ui/icons";
import Scanner from "../Common/Scanner";
import { endPoints } from "../../config/Api";
import axios from "axios";
import Dialoguebox from '../../components/Common/dialoguboxforupload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import './dialoguestyle.scss';
// import Button from "@material-ui/core/Button"
import { GrFormClose } from 'react-icons/gr';

// import TextFi    eld from '@material-ui/core/TextField';

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
    { id: 'Fixture Description', label: 'Fixture Description', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Asset Id', label: 'Asset Id', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Previous Asset Id', label: 'Previous Asset Id', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Cost', label: 'Cost', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Status', label: 'Status', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Installer', label: 'Installer', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Installer Contact', label: 'Installer Contact', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Installer Phone', label: 'Installer Phone', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Actual', label: 'Actual Installation Date', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Propesed', label: 'Proposed Installation Date', className: "text-c2 fw-700", required: false, width: "12%" },
    { id: 'Action', label: 'Action', className: "text-c2 fw-700", width: "3%" },

];


var dialoguebox = false;

class FixtureInstaller extends React.Component {


    // const [dialoguebox, setdialoguebox] = useState(false)
    // if(this.props.role === ''){}
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

                    modelOptions: [],
                    fixtureOptions: [],
                    fixtureDescOptions: []
                }
            ],


            dialogue: false,
            InstallationFiles: [],
            Hero_shot: [],
            Main_front: [],
            Left_front: [],
            Right_front: [],
            Main_rear: [],
            Best_side: [],
            SignatureFiles: [],


            Installationimagelink: [],
            Hero_shotLink: [],
            Main_frontLink: [],
            Left_frontLink: [],
            Right_frontLink: [],
            Main_rearLink: [],
            Best_sideLink: [],
            siganturelink: []
        },

        assetCheckLoader: false,
        formLoader: false,
        showRemainChars: false,
        maxLength: 200
    }

    // formFields.Comments = ''
    handleCancel = () => {
        console.log('g')
        this.setdialogueboxfor1(false)
    }



    setdialogueboxfor1 = () => {
        let { formFields } = this.state
        formFields['dialogue'] = false;
        this.setState({ formFields })
    }

    addMaterialRow = () => {
        const { formFields: { materialInfoList } } = this.state

        const { storeDrpdwns, userDetails } = this.props

        materialInfoList.push({
            model: "",
            sku: "",
            fixtureDescription: "",
            assetTagId: "",
            assetDisable: true,
            assetDuplicate: false,
            assetExists: false,
            assetError: false,
            previousAssetTag: "",
            fixtureCost: "",
            status: "",
            installerName: "",
            installerContact: "",
            installerPhone: "",
            actualInstallationDate: "",
            proposedInstallationDate: "",
            deleteBtn: true,
            fieldDisable: (userDetails.role === "Installer" || "Fixture Manufacturer") ? false : true,
            modelOptions: storeDrpdwns.model ? storeDrpdwns.model : [],
            fixtureOptions: storeDrpdwns.fixtures ? storeDrpdwns.fixtures : [],
            fixtureDescOptions: storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : [],
        })

        this.setState({ materialInfoList })

    }
    setdialoguebox = (val) => {

        this.state.formFields.materialInfoList.dialoguebox = val
        dialoguebox = val
        console.log(this.state.formFields.materialInfoList.dialoguebox)
    }
    handleMaterialInfoList = async (index, type) => {

        const { formFields: { materialInfoList } } = this.state



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
            if (materialInfoList.length >= 2) {
                materialInfoList.splice(index, 1)
            }
        }

        this.setState({ materialInfoList })
    }


    checkAsset = async (value, idx) => {

        const { formFields: { materialInfoList } } = this.state

        console.log("assettag",value)
        if(materialInfoList.length < idx) {
        if (value !== "") {
            this.setState({ assetCheckLoader: true })
            const url = endPoints.storeInfo.checkAssetId + "?Assettagid=" + value
            const res = await axios.get(url)

            if (res.data.message === "Assettagid already Exists") {
                materialInfoList[idx].assetDuplicate = true
            } else {
                materialInfoList[idx].assetDuplicate = false
            }
        } } else {
            materialInfoList[idx].assetDuplicate = false
        }

        for (let i = 0; i < materialInfoList.length; i++) {
            console.log(i)
            console.log(idx)
            if (i !== idx) {
                if (materialInfoList[i].assetTagId === materialInfoList[idx].assetTagId) {
                    materialInfoList[idx].assetDuplicate = true
                }
            }

            // if(i < idx){
            //     this.setState({ assetCheckLoader: false })
            //     materialInfoList[idx].assetExists = false
            // } else {
            //     materialInfoList[idx].assetExists = true
                
            // }
        }

        console.log(materialInfoList[idx].assetExists)


        this.setState({ materialInfoList, assetCheckLoader: false })

    }


    storeInput = ({ target: { value, name } }) => {

        let { formFields } = Object.assign({}, this.state);
        formFields[name] = value
        this.setState({ formFields })
    }


    splitUrlFiles = (name) => {

        const { formFields } = this.state;


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

        console.log(formFields, "asdjkfhjkasdhjksfhjksdfsdf")
    }

    storeFiles = (data, name) => {

        let { formFields } = Object.assign({}, this.state);

        var arr = [];
        for (var i = 0; i < data.target.files.length; i++) {
            console.log("checkfiles", data.target.files[i])
            arr.push(data.target.files[i]);
        }

        console.log("asdfhhagsdkfhgashdf", arr)

        if (formFields[name] && formFields[name].length > 0) {

            for (let i = 0; i < data.target.files.length; i++) {
                console.log("checkfiles", data.target.files[i])
                formFields[name].push(data.target.files[i])
            }

        } else {
            formFields[name] = arr
        }

        // formFields[name] = arr


        console.log('ffff', formFields)
        this.setState({ formFields }, () => this.splitUrlFiles(name))
    }

    onSort = (sortKey) => {


    }

    handleSubmit = () => {
        // console.log(installation_images);


        const { formFields } = this.state;

        console.log("asdfjasdfgasdffasd", this.props)
        const { detailsModal, storeData, listofAdmins } = this.props


        console.log("floorplandata", this.props.updatedFloorPlan)

        if (this.validator.allValid() && this.materialInfoValidator.allValid() && formFields.materialInfoList.every(d => !d.assetDuplicate)) {

            console.log(this.state.formFields)
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
    }

    getOptions = () => {
        const { storeData, storeDrpdwns } = this.props

        const { formFields } = this.state;

        console.log("asdfkjahsdfjalhsdjfasf", formFields.materialInfoList)

        formFields.statusOptions = storeDrpdwns.status ? storeDrpdwns.status : []

        // formFields.materialInfoList.modelOptions = storeDrpdwns.model ? storeDrpdwns.model : []
        // formFields.fixtureOptions = storeDrpdwns.fixtures ? storeDrpdwns.fixtures : []
        // formFields.fixtureDescOptions = storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : []



        this.setState({ formFields })
    }

    getFormDetails = () => {


        console.log("asdfkjashdfljhasjdfadsf", this.props)

        const { storeData, storeDrpdwns } = this.props

        let { formFields } = Object.assign({}, this.state);


        if (storeDrpdwns.materialInfo) {

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

            updatedList.map((d) => {
                d.modelOptions = storeDrpdwns.model ? storeDrpdwns.model : []
                d.fixtureOptions = storeDrpdwns.fixtures ? storeDrpdwns.fixtures : []
                d.fixtureDescOptions = storeDrpdwns.fixtureDescription ? storeDrpdwns.fixtureDescription : []
            })


            formFields.materialInfoList = updatedList


            console.log("asdfhalsjdfhasdf", updatedList)

        } else {

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
        console.log('vv',storeData.assetTagId)
        if(storeData.assetTagId === "null"){
            console.log('if')
            formFields.assetId = ""
        } else {
            console.log('else')
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
        console.log('cccccc', formFields)
        this.setState({ formFields })
    }

    getDatafromStore = () => {
        console.log('jj', this.props)
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
console.log('selvi', formFields)
        this.setState({ formFields })
    }


    componentDidMount() {
        // console.log('cc', this.props)

        const { userDetails } = this.props
        this.getOptions()

        if (this.props.fixtureInstallerDetails) {
            this.getDatafromStore()
        } else {
            // console.log('jj')
            this.getFormDetails()
        }




        columns[0].required = (userDetails.role === "Country Lead")

        columns[1].required = (userDetails.role === "Country Lead")

        columns[2].required = (userDetails.role === "Country Lead")

        columns[3].required = (userDetails.role === "Installer")

        columns[4].required = false

        columns[5].required = false

        columns[6].required = (userDetails.role === "Country Lead" || userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer")

        columns[7].required = (userDetails.role === "Installer")

        columns[8].required = (userDetails.role === "Installer")

        columns[9].required = (userDetails.role === "Installer")
        columns[10].required = (userDetails.role === "Installer")
        columns[11].required = userDetails.role === "Country Lead"

        console.log("sfjasdhfjhasdfsadf", columns)


    }

    removeFile = (idx, name) => {
        console.log("Details", this.state.formFields[name])
        const { formFields } = this.state;

        let removedFiles = formFields[name].filter((d, index) => index !== idx)
        console.log("Details", removedFiles)
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
        console.log("propsdispatch", this.props)
        this.props.dispatch({ type: "STORE_FIXTURE_DETAILS", payload: formFields })
        this.props.tabChange("2")

    }


    handleDate = (data, name, idx) => {
        let { formFields } = this.state
        let materialInfoList = formFields.materialInfoList

        materialInfoList[idx][name] = data
        this.setState({ formFields })
    }

    handleMaterialInfoListValues = (event, idx) => {
        console.log("sdfalshfahsfjkasf", event.target.name)
        let { formFields } = this.state
        let materialInfoList = formFields.materialInfoList

        console.log('length', event.target.value.length)
        console.log('length', event.target.value)
        console.log( 'vv',materialInfoList[idx]["assetTagId"].length)


        if (event.target.name === "status") {
            // console.log("materrialcheck", this.props)
            // console.log('zz', this.props.storeDrpdwns)
            
            // console.log('g',this.props.storeDrpdwns.materialInfo[idx])
            // console.log(idx)
            // console.log(this.props.storeDrpdwns.materialInfo)
            if(materialInfoList.editaddset === true && (Object.keys(this.props.storeDrpdwns).includes('materialInfo')) && this.props.storeDrpdwns.materialInfo[idx] === undefined){
                if (event.target.value === 'Refreshed') {
                    console.log('ghghg')
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
                            console.log('ghghg')
                            materialInfoList[idx]["previousAssetTag"] = materialInfoList[idx]["assetTagId"]
                            materialInfoList[idx]["assetTagId"] = ""
    
                        } else {
                            console.log('else correct', materialInfoList[idx]["previousAssetTag"])
                            if (materialInfoList[idx]["previousAssetTag"] !== "") {
                                materialInfoList[idx]["assetTagId"] = materialInfoList[idx]["previousAssetTag"]
                            }
    
                            materialInfoList[idx]["previousAssetTag"] = ""
    
                        }
                    }
                } else {
                    if (event.target.value === 'Refreshed') {
                        console.log('ghghg')
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

        if (event.target.name === "assetTagId" && event.target.value.length < 7 && event.target.value.length !== 0 ) {
            if(Object.keys(this.props.storeDrpdwns).includes('materialInfo')) {
            if(this.props.storeDrpdwns.materialInfo.length > idx && event.target.value === this.props.storeDrpdwns.materialInfo[idx].assetTagId){
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
        } else if (event.target.name === "assetTagId" &&  event.target.value.length > 9) {
            // formFields.materialInfoList[idx].assetError = true
            if(Object.keys(this.props.storeDrpdwns).includes('materialInfo')) {
            if(this.props.storeDrpdwns.materialInfo.length > idx && event.target.value === this.props.storeDrpdwns.materialInfo[idx].assetTagId){
                // formFields.materialInfoList[idx].assetDuplicate = false
                formFields.materialInfoList[idx].assetError = false
            } else {
            // formFields.materialInfoList[idx].assetDuplicate = false
            formFields.materialInfoList[idx].assetError = true
            }
        } else {
            formFields.materialInfoList[idx].assetError = true
        }
        } else {
            formFields.materialInfoList[idx].assetError = false
            // formFields.materialInfoList[idx].assetDuplicate = false
        }



        if (event.target.name === "model") {

            this.props.loadMaterialOptions("Model", event.target.value, '').then((res) => {
                console.log("myres", res.data)

                materialInfoList[idx].fixtureOptions = res.data.fixture
                materialInfoList[idx].fixtureDescOptions = res.data.fixtureDesription



                materialInfoList[idx].sku = ""



                materialInfoList[idx].fixtureDescription = ""

                this.setState({ formFields })

            })
        }

        if (event.target.name === "sku") {
            console.log('qq', event.target.name)
            console.log('zzzzz',event.target.value)
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


        materialInfoList[idx][event.target.name] = event.target.value
        console.log('form', formFields)
        this.setState({ formFields })

    }

    ScannedAssetId = (data, idx) => {
        console.log("scanneddata", data, idx)
        let { formFields } = this.state
        let materialInfoList = formFields.materialInfoList
        materialInfoList[idx]["assetTagId"] = data

        if (data.length > 8) {

            formFields.materialInfoList[idx].assetError = true
        }

        this.setState({ formFields })
    }

    render() {

        const { formFields, formLoader, assetError, assetCheckLoader, showRemainChars } = this.state
        const { storeData } = this.props
        const { userDetails } = this.props
        const { installationImage } = this.props


        console.log("materiallist", userDetails)


        const handleChangevalue = (event) => {
            // setValue(event.target.value);

            let { formFields } = Object.assign({}, this.state);
            formFields[event.target.name] = event.target.value
            this.setState({ formFields })
        };


        const { materialInfoList } = this.state.formFields

        console.log("listmaterial", materialInfoList)


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
        console.log(formFields.Comments)
        console.log('ddd', formFields.materialInfoList[0].previousAssetTag)

        return (
            <div className="pb-5">

                <div className="d-flex flex-column ">
                    <div className="ml-3 col-2 d-flex align-items-center">
                        <label className="fw-600 text-nowrap">Material Info</label>
                    </div>



                    {/* Table experiement */}
                    <div className="col-12 fixture__installer">
                        <CustomTable columns={columns} tableLength={materialInfoList.length} hideSortLable={false} onSort={(data) => this.onSort(data)} >
                            {materialInfoList.map((item, idx) => {

                                console.log("itemdata", item)
                                return (
                                    <TableRow>
                                        <TableCell className="material__info--err">

                                            <FormControl>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    className="materialModal"
                                                    title={formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                                    value={formFields.materialInfoList[idx].model ? formFields.materialInfoList[idx].model : ""}
                                                    name="model"
                                                    disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}
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
                                                    className="materialDesc"
                                                    title={formFields.materialInfoList[idx].sku ? formFields.materialInfoList[idx].sku : ""}
                                                    value={formFields.materialInfoList[idx].sku ? formFields.materialInfoList[idx].sku : ""}
                                                    name="sku"
                                                    onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                    disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}


                                                >
                                                    {formFields.materialInfoList[idx].fixtureOptions && formFields.materialInfoList[idx].fixtureOptions.length > 0 && formFields.materialInfoList[idx].fixtureOptions.map((data) => {
                                                        return (
                                                            <MenuItem value={data}>{data}</MenuItem>
                                                        )
                                                    })}
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
                                                    title={formFields.materialInfoList[idx].fixtureDescription !== "null" ? formFields.materialInfoList[idx].fixtureDescription : ""}

                                                    value={formFields.materialInfoList[idx].fixtureDescription !== "null" ? formFields.materialInfoList[idx].fixtureDescription : ""}
                                                    name="fixtureDescription"
                                                    onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                    disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false}
                                                    className="materialDesc"
                                                >
                                                    {formFields.materialInfoList[idx].fixtureDescOptions && formFields.materialInfoList[idx].fixtureDescOptions.length > 0 && formFields.materialInfoList[idx].fixtureDescOptions.map((data) => {
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
                                                onBlur={() => this.checkAsset(formFields.materialInfoList[idx].assetTagId, idx)}
                                                title={formFields.materialInfoList[idx].assetTagId !== "null" ? formFields.materialInfoList[idx].assetTagId : ""}

                                                value={formFields.materialInfoList[idx].assetTagId !== "null" ? formFields.materialInfoList[idx].assetTagId : ""}
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
                                             
                                            { formFields.materialInfoList[idx].length > 0 && formFields.materialInfoList[idx].assetDuplicate && <span className="error-message">AssetId already exists</span>}

                                            {!formFields.materialInfoList[idx].assetDuplicate && formFields.materialInfoList[idx].assetError && <span className="error-message">Invalid AssetTagId length</span>}

                                            <span style={{ display: "none" }}>
                                                {formFields.materialInfoList[idx].assetError && this.materialInfoValidator.message('assetTagId', formFields.materialInfoList[idx].assetTagId, 'min:7|max:9')}
                                            </span>

                                            {(userDetails.role === "Installer") && this.materialInfoValidator.message('assetTagId', formFields.materialInfoList[idx].assetTagId, 'requiredText|min:7|max:9')}

                                        </TableCell>

                                        <TableCell className="material__info--err material__text">
                                            <TextField
                                                id="standard-multiline-flexible"
                                                fullWidth
                                                multiline={false}
                                                maxRows={4}
                                                onmouseover={formFields.materialInfoList[idx].previousAssetTag !== "null" ? formFields.materialInfoList[idx].previousAssetTag : ""}
                                                name="previousAssetTag"
                                                title={formFields.materialInfoList[idx].previousAssetTag !== "null" ? formFields.materialInfoList[idx].previousAssetTag : ""}

                                                value={formFields.materialInfoList[idx].previousAssetTag !== "null" ? formFields.materialInfoList[idx].previousAssetTag : ""}
                                                onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                disabled={(userDetails.role === "Store Planner" || formFields.materialInfoList[idx].status !== "Refreshed" ? true : false)}
                                            />

                                            {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.materialInfoValidator.message('previousAssetTag', formFields.materialInfoList[idx].previousAssetTag, 'max:8')}
                                        </TableCell>


                                        <TableCell className="material__info--err material__text mr-2">

                                            <TextField
                                                id="standard-multiline-flexible"
                                                fullWidth
                                                multiline={false}
                                                title={formFields.materialInfoList[idx].fixtureCost !== "null" ? formFields.materialInfoList[idx].fixtureCost : ""}
                                                name="fixtureCost"
                                                value={formFields.materialInfoList[idx].fixtureCost !== "null" ? formFields.materialInfoList[idx].fixtureCost : ""}
                                                disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner" ? true : false}

                                                onChange={(e) => this.handleMaterialInfoListValues(e, idx)}

                                            />

                                        </TableCell>


                                        <TableCell>
                                            <div className=" material__info--err mr-2">


                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    className="materialDesc"
                                                    title={formFields.materialInfoList[idx].status !== "null" ? formFields.materialInfoList[idx].status : ""}

                                                    value={formFields.materialInfoList[idx].status !== "null" ? formFields.materialInfoList[idx].status : ""}
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
                                                title={formFields.materialInfoList[idx].installerName !== "null" ? formFields.materialInfoList[idx].installerName : ""}

                                                name="installerName"
                                                value={formFields.materialInfoList[idx].installerName !== "null" ? formFields.materialInfoList[idx].installerName : ""}
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
                                                title={formFields.materialInfoList[idx].installerContact !== "null" ? formFields.materialInfoList[idx].installerContact : ""}

                                                value={formFields.materialInfoList[idx].installerContact !== "null" ? formFields.materialInfoList[idx].installerContact : ""}
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
                                                title={formFields.materialInfoList[idx].installerPhone !== "null" ? formFields.materialInfoList[idx].installerPhone : ""}

                                                value={formFields.materialInfoList[idx].installerPhone !== "null" ? formFields.materialInfoList[idx].installerPhone : ""}
                                                onChange={(e) => this.handleMaterialInfoListValues(e, idx)}
                                                disabled={userDetails.role === "Store Planner" ? true : false}
                                            />



                                            {(userDetails.role === "Installer") && this.materialInfoValidator.message('installerPhone', formFields.materialInfoList[idx].installerPhone, 'requiredText')}


                                        </TableCell>

                                        <TableCell className="material__infodate--err">



                                            <DatePicker
                                                format={"YYYY-MM-DD"}
                                                disabled={userDetails.role === "Store Planner" ? true : false} name="actualInstallationDate"
                                                title={(formFields.materialInfoList[idx].actualInstallationDate !== "1900-01-01T00:00:00" && formFields.materialInfoList[idx].actualInstallationDate !== "" && formFields.materialInfoList[idx].actualInstallationDate !== null) ? moment(formFields.materialInfoList[idx].actualInstallationDate) : ""}

                                                value={(formFields.materialInfoList[idx].actualInstallationDate !== "1900-01-01T00:00:00" && formFields.materialInfoList[idx].actualInstallationDate !== "" && formFields.materialInfoList[idx].actualInstallationDate !== null) ? moment(formFields.materialInfoList[idx].actualInstallationDate) : ""}
                                                onChange={(data) => this.handleDate(data, "actualInstallationDate", idx)} />



                                            {(userDetails.role === "Installer") && this.materialInfoValidator.message('actualInstallationDate', formFields.materialInfoList[idx].actualInstallationDate, 'requiredText')}

                                        </TableCell>


                                        <TableCell className="material__infodate--err ">

                                            {/* {(userDetails.role === "Country Lead") && <span className="field__required">*</span>} */}

                                            <DatePicker
                                                format={"YYYY-MM-DD"}

                                                disabled={(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" || userDetails.role === "Store Planner") && formFields.materialInfoList[idx].fieldDisable ? true : false} name="proposedInstallationDate" value={(formFields.materialInfoList[idx].proposedInstallationDate !== "1900-01-01T00:00:00" && formFields.materialInfoList[idx].proposedInstallationDate !== "" && formFields.materialInfoList[idx].proposedInstallationDate !== null) ? moment(formFields.materialInfoList[idx].proposedInstallationDate) : ""}

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
                                {(formFields.Heroshotfiles && formFields.Heroshotfiles.length > 0) || (formFields.Mainfrontfiles && formFields.Mainfrontfiles.length > 0) || (formFields.Leftfrontfiles && formFields.Leftfrontfiles.length > 0) || (formFields.Rightfrontfiles && formFields.Rightfrontfiles.length > 0) || (formFields.Bestsidefiles && formFields.Mainrearfiles.length > 0) || (formFields.Mainrearfiles  && formFields.Bestsidefiles.length > 0) ?
                                <div className="imagescontent">Images are available/uploaded</div>: ''}
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
                                                <div className="align-items-center">
                                                    <UploadComponent name={"Heroshotfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false}/>
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
                                                <div className="align-items-center">
                                                    <UploadComponent name={"Mainfrontfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false}/>
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
                                                <div className="align-items-center">
                                                    <UploadComponent name={"Leftfrontfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false}/>
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
                                                <div className="align-items-center">
                                                    <UploadComponent name={"Rightfrontfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false}/>
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
                                                <div className=" align-items-center">
                                                    <UploadComponent name={"Mainrearfiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />
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
                                                <div className="align-items-center">
                                                    <UploadComponent name={"Bestsidefiles"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true} disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" ? true : false} />
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
                                            <Button variant="contained" onClick={() => this.setdialogueboxfor1(false)}>save</Button>
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
                            value={formFields.materialInfoList[0].Comments}
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

                {/*  */}




                <div className="col-lg-12 d-flex btn_Con_Fixture_And_Inst">


                    <div className="col-lg-5 mt-4 flex-row btn_Fixture_And_Inst">
                        {/* <button onClick={() => this.props.cancelModal()} className="Cancelbuttondesign mr-2">
                            Cancel
                        </button> */}
                        <div className="mt-4 add__asset__cancel">
                            <Button variant="contained" onClick={() => this.props.cancelModal()} className="Cancelbuttondesign mr-3" > Cancel</Button>
                        </div>
                        <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={() => this.changeTab()} className="previousbuttondesign d-flex mr-2" > Previous</Button>
                        </div>
                        {/* <button onClick={() => this.changeTab()} className="previousbuttondesign d-flex mr-2">
                            <GrFormPrevious className="icon_color_white" size="25" />  Previous
                        </button> */}
                        <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={() => !formLoader && this.handleSubmit()} className={`Submitbuttondesign mr-2 ${formLoader && "btn__disabled"}`} > {formLoader ? "Submitting...." : "Submit"}</Button>
                        </div>
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



const mapStateToProps = (state) => {
    return {
        storeData: state.storeInfo.storeData.result,
        storeDrpdwns: state.storeInfo.storeData,
        floorPlanDetails: state.storeInfo.storeInfoDetails,
        userDetails: state.user.userDetails,
        Glid: state.storeInfo.Glid,
        fixtureInstallerDetails: state.storeInfo.storeFixtureDetails.fixtureInstaller,
        listofAdmins: state.user.listofAdmins
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addStore,
        loadMaterialOptions,
        dispatch
    }, dispatch);
};

// const mapStateToProp_installation = ({  installation_ima: { installation_images } }) => {

//     return {

//         installation_images,

//     }
// }




export default connect(mapStateToProps, mapDispatchToProps)(FixtureInstaller)

