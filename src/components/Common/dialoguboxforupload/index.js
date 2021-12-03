import React, { useState } from "react";
import UploadComponent from "../../Common/UploadComponent"
import FilePreview from "../../Common/FilePreview";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import './dialoguestyle.scss';
import Button from "@material-ui/core/Button"
import { GrFormClose } from 'react-icons/gr';
import { connect } from "react-redux"
class  Dialoguebox extends React.Component {
    Opendialogue = false;
    state = {
        formFields: {
            dialogue: false,
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
//   const [dialogue, setdialogue] = useState([])
//     const [Opendialogue, setdialogueboxfor1] = useState(false)
     handleCancel = () => {
        console.log('g')
        this.setdialogueboxfor1(false)
    }
    setdialoguebox = () => {
        console.log('ddf')
        this.setdialogueboxfor1(true)
    }
    splitUrlFiles = (name) => {

        const { formFields } = this.state;

        if (name === "Hero_shot") {

            let Hero_shot_files = formFields[name]

            formFields["Hero_shotLink"].push(Hero_shot_files.filter(d => d.name === undefined))

            formFields["Hero_shotfiles"].push(Hero_shot_files.filter(d => d.name !== undefined))

        }

        if (name === "Main_front") {

            let Main_front_files = formFields[name]

            formFields["Main_frontLink"].push(Main_front_files.filter(d => d.name === undefined))

            formFields["Main_frontfiles"].push(Main_front_files.filter(d => d.name !== undefined))

        }
        if (name === "left_front") {

            let left_front_files = formFields[name]

            formFields["left_frontLink"].push(left_front_files.filter(d => d.name === undefined))

            formFields["left_frontfiles"].push(left_front_files.filter(d => d.name !== undefined))

        }
        if (name === "Right_front") {

            let Right_front_files = formFields[name]

            formFields["Right_fronttLink"].push(Right_front_files.filter(d => d.name === undefined))

            formFields["Right_frontfiles"].push(Right_front_files.filter(d => d.name !== undefined))

        }
        if (name === "main_rear") {

            let main_rear_files = formFields[name]

            formFields["main_rearLink"] = main_rear_files.filter(d => d.name === undefined)

            formFields["main_rearfiles"] = main_rear_files.filter(d => d.name !== undefined)

        }
        if (name === "Best_side") {

            let Best_side_files = formFields[name]

            formFields["Best_sideLink"] = Best_side_files.filter(d => d.name === undefined)

            formFields["Best_sidefiles"] = Best_side_files.filter(d => d.name !== undefined)

        }

        // if (name === "Signature") {

        //     let signatureFiles = formFields[name]

        //     formFields["siganturelink"] = signatureFiles.filter(d => d.name === undefined)

        //     formFields["SignatureFiles"] = signatureFiles.filter(d => d.name !== undefined)

        // }

        return formFields;

        // this.setState({ formFields })

        // console.log(formFields, "asdjkfhjkasdhjksfhjksdfsdf")
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

console.log(formFields)
sessionStorage.setItem('hero_shot', JSON.stringify(formFields))

        this.setState({ formFields }, () => this.splitUrlFiles(name))
    }
    handlesubmit  = () => {
        // console.log(dialogue)
       
        // dispatch({ type: "installation_image", payload: dialogue })
    }
    setdialoguebox = () => {
        let {formFields} = this.state
        formFields['dialogue'] = true;
        this.setState({formFields})
    }
    setdialogueboxfor1 = () => {
        let {formFields} = this.state
        formFields['dialogue'] = true;
        this.setState({formFields})
    } 
    render() {
    return (
        <div>
            <div className="add__asset">
    <Button variant="contained" onClick={() => this.setdialoguebox('true')}>upload</Button>
    </div>
{this.state.formFields.dialogue && 
    <Dialog open={this.state.formFields.dialogue} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
        {/* <DialogTitle id="form-dialog-title">Add Execution Tier</DialogTitle> */}
        <DialogContent>
            <div className='d-flex col-lg-12 p-0'>
        
        <div className="mt-2 col-lg-4 p-0 headidngfordialoguebox">Installation Images</div>
        <div className="textalignend col-lg-8 p-0"> 
                    <GrFormClose size="30" className="icon__clr cursorpointer" onClick={() => this.setdialogueboxfor1(false)} />
</div>
        </div>
            <div className='d-flex'>
               
        <div className=" mr-4 floorplan__form image-upload-fixture">

                    <div className="font-size align-items-center">
                        <label className="fw-600 mt-3">Hero shot</label>
                        <span className="field__required">*</span>
                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && <span className="field__required">*</span>} */}
                    </div>
                    <div className="align-items-center">
                        <UploadComponent name={"Hero_shot"} placeholder={"Choose Image"} storeFiles={(data, name) => this.storeFiles(data, name)} multiple={true}  />
                        {/* <Button variant="contained">upload</Button> */}
                        {/* <div className="add__asset mt-2">
    <Button variant="contained">upload</Button>
    </div> */}
                        {/* {(userDetails.role === "Fixture Manufacturer" || userDetails.role === "Installer") && this.validator.message('Signature', formFields.Signature, 'required')} */}
                    </div>

                    {/* formFields.Signature && formFields.Signature.length > 0 && */}
                    { <div className=" d-flex align-items-center">
                    {/* <FilePreview name="Hero_shot" files={formFields.Hero_shot} removeFile={(idx, name) => this.removeFile(idx, name)} /> */}
                    </div>
                    }
                </div>
                
               
               
        </div>
        <div className="add__asset_save mt-4 textalignend">
    <Button variant="contained" onClick={() => this.handlesubmit()}>save</Button>
    </div>
        </DialogContent>
        <DialogActions>

        </DialogActions>
    </Dialog>}
    </div>)
    }
}


export default connect(null)(Dialoguebox);