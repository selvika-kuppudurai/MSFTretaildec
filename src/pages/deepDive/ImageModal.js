import React from "react";
import { Modal } from "antd"


const ImageModal = ({ modalVisible, title, cancel, imageUrl }) => {
    return (
        <div >
            <Modal visible={modalVisible} closable={false} title={title} footer={null} onCancel={cancel} centered={true} width="50%">
                <img className="d-block w-100" src={imageUrl} alt="image2" loading="lazy" />
            </Modal>
        </div >
    )
}

export default ImageModal;