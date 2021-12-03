import React from "react";
import { Modal } from "antd"
import { NormalButton } from "../NormalButton";
import Button from "@material-ui/core/Button"

const ConfirmationModal = ({ modalVisible, title, cancel, removeFile, fileData }) => {


    const deleteFile = () => {
        removeFile(fileData.index, fileData.file)
        cancel()
    }
    return (
        <Modal visible={modalVisible} closable={false} title={title} footer={null} onCancel={cancel} centered={true} className="delete__modal" >
            <h3>Are you sure want to remove this file?</h3>
            <div className="mt-5">
                <Button variant="contained" onClick={deleteFile} className="px-5 store__modal--btns-cancel mr-5 " >yes </Button>

                <Button variant="contained" onClick={cancel} className="px-5 store__modal--btns-edit mr-5 " > No</Button>
            </div>
        </Modal>
    )
}

export default ConfirmationModal;