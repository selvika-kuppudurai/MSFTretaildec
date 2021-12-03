import React from "react"
import { connect } from "react-redux"
import { NormalInput } from "../Common/NormalInput"
import { NormalSelect } from "../Common/NormalSelect"
import UploadComponent from "../Common/UploadComponent"
import SimpleReactValidator from "../../helpers/plugins"
import './floorplan.scss'
import FilePreview from "../Common/FilePreview"
import { GrFormNext } from 'react-icons/gr'
import Button from "@material-ui/core/Button"

const dummyImages = [

    "https://images.unsplash.com/photo-1624059729855-4296e3f5c640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyNjY4OTA0Mg&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1624059729855-4296e3f5c640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyNjY4OTA0Mg&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1624059729855-4296e3f5c640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyNjY4OTA0Mg&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1624059729855-4296e3f5c640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyNjY4OTA0Mg&ixlib=rb-1.2.1&q=80&w=1080",

]

// PicturesofSpace: ['https://mrrinstoredl.blob.core.windows.net/images/Quad Report/104014chart45.PNG', 'https://mrrinstoredl.blob.core.windows.net/images/Quad Report/104014charts.PNG']

class FloorPlan extends React.Component {

    state = {
        formFields: {
            executionResultOptions: [],
            fixedSelectionOptions: [],
            languageOptions: [],
            executionResult: "",
            subpm: "",
            fixedSelection: "",
            BackwallCustomSpecifications: "",
            SpecialRequests: "",
            GraphicsLanguage: "",

            PicturesofSpace: [],

            PicturesofSpaceFiles: [],
            _2dPlanFiles: [],
            _3dPlanFiles: [],
            QuadPlanFiles: [],
            FloorPlanFiles: [],


            _2dlink: [],
            _3dRlink: [],
            Quadlink: [],
            Floorplanlink: [],
            Picofspacelink: []

        }
    }

    storeFormFields = (data, name) => {
        let { formFields } = Object.assign({}, this.state);

        formFields[name] = data
        this.setState({ formFields }, () => console.log("asfdgasdkhfgashdf", this.state.formFields))
    }

    storeInput = ({ target: { value, name } }) => {

        let { formFields } = Object.assign({}, this.state);
        formFields[name] = value
        this.setState({ formFields })
    }



    // storeFiles = (data, name) => {

    //     console.log("asdfkjasdfhhasdf", data.target.files[0])
    //     let { formFields } = Object.assign({}, this.state);
    //     formFields[name] = data.target.files[0]

    //     this.setState({ formFields })
    // }

    splitUrlFiles = (name) => {

        const { formFields } = this.state;

        console.log(formFields.PicturesofSpace.map(d => d.name), "asdjkfhjkasdhjksfhjksdfsdf")

        if (name === "PicturesofSpace") {

            let picFiles = formFields[name]

            formFields["Picofspacelink"] = picFiles.filter(d => d.name === undefined)

            formFields["PicturesofSpaceFiles"] = picFiles.filter(d => d.name !== undefined)

        }

        if (name === "FloorPlan") {

            let floorFiles = formFields[name]

            formFields["Floorplanlink"] = floorFiles.filter(d => d.name === undefined)

            formFields["FloorPlanFiles"] = floorFiles.filter(d => d.name !== undefined)

        }

        if (name === "_2dPlan") {

            let _2DPlan = formFields[name]

            formFields["_2dlink"] = _2DPlan.filter(d => d.name === undefined)

            formFields["_2dPlanFiles"] = _2DPlan.filter(d => d.name !== undefined)

        }

        if (name === "_3dRender") {

            let _3DPlan = formFields[name]

            formFields["_3dRlink"] = _3DPlan.filter(d => d.name === undefined)

            formFields["_3dPlanFiles"] = _3DPlan.filter(d => d.name !== undefined)

        }

        if (name === "Quad") {

            let quadPlan = formFields[name]

            formFields["Quadlink"] = quadPlan.filter(d => d.name === undefined)

            formFields["QuadPlanFiles"] = quadPlan.filter(d => d.name !== undefined)

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



        this.setState({ formFields }, () => this.splitUrlFiles(name))
    }

    changeTab = () => {

        const { formFields } = this.state

        // this.props.dispatch({ type: "STORE_INFO_DETAILS", payload: formFields })
        // this.props.changeDisable(false)
        // this.props.tabChange("3")

        if (this.validator.allValid()) {
            this.props.dispatch({ type: "STORE_INFO_DETAILS", payload: formFields })
            this.props.changeDisable(false)
            this.props.tabChange("3")
        } else {
            this.props.changeDisable(true)
            this.validator.showMessages()
        }
    }

    UNSAFE_componentWillMount() {
        this.validator = new SimpleReactValidator({
            element: (message) => <span className="error-message font-md">{message}</span>,
            autoForceUpdate: this,
        });
    }

    removeFile = (idx, name) => {
        console.log("Details", this.state.formFields[name])
        const { formFields } = this.state;

        let removedFiles = formFields[name].filter((d, index) => index !== idx)

        formFields[name] = removedFiles

        if (name === "PicturesofSpace") {

            let removeFiles = formFields["PicturesofSpaceFiles"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Picofspacelink"].filter(item => formFields[name].includes(item))

            formFields["PicturesofSpaceFiles"] = removeFiles

            formFields["Picofspacelink"] = removeLinks
        }

        if (name === "FloorPlan") {

            let removeFiles = formFields["FloorPlanFiles"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Floorplanlink"].filter(item => formFields[name].includes(item))

            formFields["FloorPlanFiles"] = removeFiles

            formFields["Floorplanlink"] = removeLinks
        }

        if (name === "_2dPlan") {

            let removeFiles = formFields["_2dPlanFiles"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["_2dlink"].filter(item => formFields[name].includes(item))

            formFields["_2dPlanFiles"] = removeFiles

            formFields["_2dlink"] = removeLinks
        }

        if (name === "_3dRender") {

            let removeFiles = formFields["_3dPlanFiles"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["_3dRlink"].filter(item => formFields[name].includes(item))

            formFields["_3dPlanFiles"] = removeFiles

            formFields["_3dRlink"] = removeLinks
        }


        if (name === "Quad") {

            let removeFiles = formFields["QuadPlanFiles"].filter(item => formFields[name].includes(item))

            let removeLinks = formFields["Quadlink"].filter(item => formFields[name].includes(item))

            formFields["QuadPlanFiles"] = removeFiles

            formFields["Quadlink"] = removeLinks
        }



        this.setState({ formFields }, () => console.log("latestfields", formFields))
    }


    getFormDetails = () => {



        const { storeData } = this.props

        const { formFields } = this.state;




        formFields.executionResult = storeData.result.executionTier ? storeData.result.executionTier : ""
        formFields.subpm = storeData.result.subPmname ? storeData.result.subPmname : ""
        formFields.fixedSelection = storeData.result.fixedSelection ? storeData.result.fixedSelection : ""
        formFields.BackwallCustomSpecifications = storeData.result.backwallCustomSpecifications ? storeData.result.backwallCustomSpecifications : ""
        formFields.SpecialRequests = storeData.result.specialRequests ? storeData.result.specialRequests : ""
        formFields.GraphicsLanguage = storeData.result.graphicsLanguage ? storeData.result.graphicsLanguage : ""

        // image links
        formFields.Picofspacelink = storeData.result.picturesofSpace ? storeData.result.picturesofSpace.split(",") : []

        formFields.Floorplanlink = storeData.result.floorplan ? storeData.result.floorplan.split(",") : []

        formFields._2dlink = storeData.result._2dPlan ? storeData.result._2dPlan.split(",") : []

        formFields._3dRlink = storeData.result._3dRender ? storeData.result._3dRender.split(",") : []

        formFields.Quadlink = storeData.result.quad ? storeData.result.quad.split(",") : []
        // image links

        formFields.PicturesofSpace = storeData.result.picturesofSpace ? storeData.result.picturesofSpace.split(",") : []

        formFields.FloorPlan = storeData.result.floorplan ? storeData.result.floorplan.split(",") : []

        formFields._2dPlan = storeData.result._2dPlan ? storeData.result._2dPlan.split(",") : []

        formFields._3dRender = storeData.result._3dRender ? storeData.result._3dRender.split(",") : []

        formFields.Quad = storeData.result.quad ? storeData.result.quad.split(",") : []

        this.setState({ formFields })
    }

    getDatafromStore = () => {

        const { storeData, floorPlanDetails } = this.props

        const { formFields } = this.state;


        formFields.executionResult = floorPlanDetails.executionResult ? floorPlanDetails.executionResult : ""
        formFields.subpm = floorPlanDetails.subpm ? floorPlanDetails.subpm : ""
        formFields.fixedSelection = floorPlanDetails.subpm ? floorPlanDetails.subpm : ""
        formFields.BackwallCustomSpecifications = floorPlanDetails.BackwallCustomSpecifications ? floorPlanDetails.BackwallCustomSpecifications : ""
        formFields.SpecialRequests = floorPlanDetails.SpecialRequests ? floorPlanDetails.SpecialRequests : ""
        formFields.GraphicsLanguage = floorPlanDetails.GraphicsLanguage ? floorPlanDetails.GraphicsLanguage : ""

        formFields.PicturesofSpace = floorPlanDetails.PicturesofSpace ? floorPlanDetails.PicturesofSpace : []

        formFields.FloorPlan = floorPlanDetails.FloorPlan ? floorPlanDetails.FloorPlan : []

        formFields._2dPlan = floorPlanDetails._2dPlan ? floorPlanDetails._2dPlan : []

        formFields._3dRender = floorPlanDetails._3dRender ? floorPlanDetails._3dRender : []

        formFields.Quad = floorPlanDetails.Quad ? floorPlanDetails.Quad : []

        this.setState({ formFields })
    }


    getOptions = () => {
        const { storeData } = this.props

        const { formFields } = this.state;

        formFields.executionResultOptions = storeData.executionResult ? storeData.executionResult : []
        formFields.fixedSelectionOptions = storeData.fixedSelection ? storeData.fixedSelection : []
        formFields.languageOptions = storeData.graphicsLanguage ? storeData.graphicsLanguage : []

        this.setState({ formFields })
    }

    componentDidMount() {

        console.log("mountprops", this.props)

        this.getOptions()

        if (this.props.floorPlanDetails) {
            this.getDatafromStore()
        } else {
            this.getFormDetails()
        }

    }

    componentDidUpdate(prevProps) {

        if (prevProps.storeData !== this.props.storeData) {

            this.getOptions()
            this.getFormDetails()
        }
    }




    render() {

        const { formFields } = this.state
        const { userDetails } = this.props

        console.log("adfkagdfghdsfadsf", formFields)


        return (
            <div className="mt-4 pb-5 floor__plan">

                <div className="col-lg-10 col-sm-12 d-flex flex-lg-row flex-md-row floorplan__form">

                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">Execution Tier</label>
                        {(userDetails.role === "Country Lead" || userDetails.role === "Store Planner") && <span className="field__required">*</span>}
                    </div>

                    <div className="col-lg-5 col-sm-12">
                        <NormalSelect options={formFields.executionResultOptions} handleChange={(data) => this.storeFormFields(data, "executionResult")} values={formFields.executionResult} mode="single" disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />

                        {(userDetails.role === "Country Lead" || userDetails.role === "Store Planner") && this.validator.message('executionResult', formFields.executionResult, 'required')}
                    </div>

                </div >

                <div className="col-10 d-flex mt-4 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3 ">Sub PM Name</label>
                        {userDetails.role === "Country Lead" && <span className="field__required">*</span>}

                    </div>
                    <div className="col-lg-5 col-sm-12">

                        <NormalInput name="subpm" value={formFields.subpm} onChange={(data) => this.storeInput(data)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />
                        {userDetails.role === "Country Lead" && this.validator.message('subpm', formFields.subpm, 'required')}
                    </div>
                </div>

                {/* <div className="col-10 d-flex mt-4">
                    <div className="col-5 d-flex align-items-center">
                        <label className="fw-600 mt-3">Fixed Selection</label>
                    </div>
                    <div className="col-lg-5 col-sm-12">
                        <NormalSelect options={formFields.fixedSelectionOptions} handleChange={(data) => this.storeFormFields(data, "fixedSelection")} values={formFields.fixedSelection} mode="single" disabled={userDetails.role === "Store Planner" || userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />
                    </div>
                </div> */}

                <div className="col-10 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">Backwall Custom Specifications</label>
                    </div>
                    <div className="col-lg-5 col-sm-12">
                        <NormalInput name="BackwallCustomSpecifications" value={formFields.BackwallCustomSpecifications} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} onChange={(data) => this.storeInput(data)} />
                    </div>
                </div>

                <div className="col-10 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">Special Requests</label>
                    </div>
                    <div className="col-lg-5 col-sm-12">
                        <NormalInput name="SpecialRequests" value={formFields.SpecialRequests} onChange={(data) => this.storeInput(data)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />
                    </div>
                </div>


                <div className="col-10 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">Graphics Language</label>
                        {userDetails.role === "Country Lead" && <span className="field__required">*</span>}
                    </div>
                    <div className="col-lg-5 col-sm-12 mt-3">
                        <NormalSelect options={formFields.languageOptions} handleChange={(data) => this.storeFormFields(data, "GraphicsLanguage")} values={formFields.GraphicsLanguage} mode="single" disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />

                        {userDetails.role === "Country Lead" && this.validator.message('GraphicsLanguage', formFields.GraphicsLanguage, 'required')}
                    </div>
                </div>

                <div className="col-10 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">Pictures of Space</label>
                    </div>
                    <div className="col-lg-2 col-sm-12 d-flex align-items-center">
                        <UploadComponent name="PicturesofSpace" placeholder={"Choose Image"} multiple={true}
                            storeFiles={(data, name) => this.storeFiles(data, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />
                    </div>

                    {formFields.PicturesofSpace && formFields.PicturesofSpace.length > 0 && <div className="col-lg-7 col-sm-12 col-sm-mt-5 d-flex align-items-center">
                        <FilePreview name="PicturesofSpace" files={formFields.PicturesofSpace} removeFile={(idx, name) => this.removeFile(idx, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} deletecheck='picturesofspace'/>
                    </div>
                    }

                    {/* <div>
                    <img src="https://images.unsplash.com/photo-1624059729855-4296e3f5c640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyNjY4OTA0Mg&ixlib=rb-1.2.1&q=80&w=1080" alt="dummy" style={{ height: "50px", width: "50px" }} />
                </div> */}
                </div>

                <div className="col-10 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">Floor Plan</label>
                        {/* {userDetails.role === "Store Planner" && <span className="field__required">*</span>} */}
                    </div>
                    <div className="col-lg-2 col-sm-12 d-flex align-items-center">
                        <UploadComponent name="FloorPlan" placeholder={"Choose Image"} multiple={true} storeFiles={(data, name) => this.storeFiles(data, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />
                        {/* {userDetails.role === "Store Planner" && this.validator.message('FloorPlan', formFields.FloorPlan, 'required')} */}
                    </div>

                    {formFields.FloorPlan && formFields.FloorPlan.length > 0 && <div className="col-lg-7 col-sm-12 col-sm-mt-5 d-flex align-items-center">
                        <FilePreview files={formFields.FloorPlan} name="FloorPlan" removeFile={(idx, name) => this.removeFile(idx, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} deletecheck='floorplan'/>
                    </div>
                    }
                </div>

                <div className="col-10 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">2D</label>
                        {/* {userDetails.role === "Store Planner" && <span className="field__required">*</span>} */}
                    </div>
                    <div className="col-lg-2 col-sm-12 d-flex align-items-center">
                        <UploadComponent name="_2dPlan" placeholder={"Choose Image"} multiple={true} storeFiles={(data, name) => this.storeFiles(data, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />
                        {/* {userDetails.role === "Store Planner" && this.validator.message('_2dPlan', formFields._2dPlan, 'required')} */}
                    </div>

                    {formFields._2dPlan && formFields._2dPlan.length > 0 && <div className="col-lg-7 col-sm-12 col-sm-mt-5 d-flex align-items-center">
                        <FilePreview files={formFields._2dPlan} name="_2dPlan" removeFile={(idx, name) => this.removeFile(idx, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} deletecheck='2dlink'/>
                    </div>
                    }

                </div>

                <div className="col-10 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">3D</label>
                        {/* {userDetails.role === "Store Planner" && <span className="field__required">*</span>} */}
                    </div>
                    <div className="col-lg-2 col-sm-12 d-flex align-items-center">
                        <UploadComponent name="_3dRender" placeholder={"Choose Image"} multiple={true} storeFiles={(data, name) => this.storeFiles(data, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />
                        {/* {userDetails.role === "Store Planner" && this.validator.message('_3dRender', formFields._3dRender, 'required')} */}
                    </div>

                    {formFields._3dRender && formFields._3dRender.length > 0 && <div className="col-lg-7 col-sm-12 col-sm-mt-5 d-flex align-items-center">
                        <FilePreview files={formFields._3dRender} name="_3dRender" removeFile={(idx, name) => this.removeFile(idx, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} deletecheck='3dlink'/>
                    </div>
                    }
                </div>

                <div className="col-10 d-flex mt-3 d-flex flex-lg-row flex-md-row floorplan__form">
                    <div className="col-lg-5 col-sm-12 d-flex align-items-center">
                        <label className="fw-600 mt-3">Quad</label>
                        {userDetails.role === "Country Lead" && <span className="field__required">*</span>}
                    </div>
                    <div className="col-lg-2 col-sm-12 d-flex align-items-center">
                        <UploadComponent name="Quad" placeholder={"Choose Image"} multiple={true} storeFiles={(data, name) => this.storeFiles(data, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} />
                        {userDetails.role === "Country Lead" && this.validator.message('Quad', formFields.Quad, 'required')}
                    </div>


                    {formFields.Quad && formFields.Quad.length > 0 && <div className="col-lg-7 col-sm-12 col-sm-mt-5 d-flex align-items-center">
                        <FilePreview files={formFields.Quad} name="Quad" removeFile={(idx, name) => this.removeFile(idx, name)} disabled={userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer" ? true : false} deletecheck='Quad'/>
                    </div>
                    }
                </div>


                <div className="col-12 d-flex btn_Con_Fixture_And_Inst">


                    <div className="d-flex">
                        {/* <button onClick={() => this.props.cancelModal()} className="Cancelbuttondesign mr-2">
                            Cancel
                        </button> */}
                        <div className="mt-4 add__asset__cancel">
                            <Button variant="contained" className="Cancelbuttondesign mr-2" onClick={() => this.props.cancelModal()} > Cancel</Button>
                        </div>
                        {/* <button className="previousbuttondesign mr-2">
                            Previous
                        </button> */}
                        <div className="mt-4 add__asset">
                            <Button variant="contained" onClick={() => this.changeTab()} > Next</Button>
                        </div>
                        {/* <button onClick={() => this.changeTab()} className="nextbuttondesign mr-2" >
                            Next <GrFormNext className="icon_color_white" size="25" />
                        </button> */}

                    </div>

                </div>

            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        storeData: state.storeInfo.storeData,
        userDetails: state.user.userDetails,
        floorPlanDetails: state.storeInfo.storeInfoDetails.floorPlan
    }
}

export default connect(mapStateToProps)(FloorPlan)