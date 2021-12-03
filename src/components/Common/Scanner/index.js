import React, { useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { IoMdQrScanner } from "react-icons/io"
import { Modal } from "antd";


const Scanner = ({ ScannedAssetId, chosenIndex }) => {
    const [data, setData] = React.useState("Not Found");
    const [stopStream, setStopStream] = React.useState(false);

    const [modalState, setModalState] = useState(false)

    console.log("chosenIndex", chosenIndex)

    const openScanner = () => {
        setModalState(true)
        setStopStream(true)
    }

    const closeScanner = () => {
        setStopStream(false)
        setModalState(false)
    }

   

    return (
        <>

            <div className="scanner__modal d-flex cursor-pointer align-items-center mt-3 pb-3" onClick={() => openScanner()}>
                <IoMdQrScanner size={15} ></IoMdQrScanner>
            </div>

            {stopStream && <Modal centered={true} visible={modalState} onCancel={() => closeScanner()} footer={null} >
                <div className="d-flex mt-5 justify-content-center align-items-center">
                <div>
        {/* <BarcodeReader
          onError={handleError}
          onScan={handleScan}
          width={500}
          height={200}
          stopStream={stopStream}
          /> */}
        {/* <p>{this.state.result}</p> */}
      </div>
      {/* <BarcodeScanner
        onBarCodeRead={barcodeReceived}
        showViewFinder={true}
        style={{ flex: 1 }}
        torchMode='off'
        cameraType='back'
      /> */}
                    <BarcodeScannerComponent
                        width={500}
                        height={200}
                        stopStream={stopStream}

                        onUpdate={(err, result) => {
                            if (result) {
                                ScannedAssetId(result.text, chosenIndex);
                                closeScanner()
                            } else {
                                setData("Not Found");
                            }
                        }}
                    />
                </div>
            </Modal>}
        </>
    );
}

export default Scanner;
