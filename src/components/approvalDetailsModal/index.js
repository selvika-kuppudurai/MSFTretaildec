import React from "react";

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import { ImCancelCircle } from 'react-icons/im'
import MaterialInfoTable from "../MaterialInfoTable";
import Loader from "react-loader-spinner";
import { GrFormClose } from 'react-icons/gr';



const ApprovalDetailsModal = ({ modal, modalCancel, storeDetails }) => {
    console.log("sdfsjdhfjsadf", storeDetails)
    return (
        <Dialog open={modal} handleCancel={modalCancel} aria-labelledby="form-dialog-title" onBackdropClick={modalCancel} maxWidth="md">


            {storeDetails.length > 0 ? <DialogContent className="approval__modal">
                <div className="approval__modal--close">
                <GrFormClose size="30" className="icon__clr cursorpointer" onClick={() => modalCancel()} />
                    {/* <ImCancelCircle className="cursor-pointer" onClick={() => modalCancel()} /> */}
                </div>
                <div className="d-flex mt-4 mb-1    alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive"> GLID </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].glid}</div>

                </div>

                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive"> Retailer </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].retailer}</div>

                </div>

                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive"> Store Name </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].storeName}</div>

                </div>



                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive"> Execution Tier </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].executionTier}</div>
                </div>

                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive"> Sub PM Name </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].subPMName}</div>
                </div>

                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive"> Backwall Custom Specifications </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].backwallCustomSpecifications}</div>
                </div>

                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive">Special Requests </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].specialRequests}</div>
                </div>

                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive">Graphics Language </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].graphicsLanguage}</div>
                </div>

                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive">Delivery Address </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].deliveryAddress}</div>
                </div>

                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive">Delivery city </div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].deliveryCity}</div>
                </div>


                <div className="d-flex mb-1 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive">Delivery State</div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].deliveryState}</div>
                </div>

                <div className="d-flex mb-4 alignmentdesign">
                    <div className="col-1"></div>
                    <div className="col-3 columncolorfordeepdive">Delivery Zip</div>
                    <div className="col-1">:</div>
                    <div className="ml-5 col-6">{storeDetails[0].deliveryZip}</div>
                </div>

                {/* material info table */}

                <MaterialInfoTable materialInfoDetails={storeDetails} table__loader={storeDetails.length < 0 ? true : false} />


            </DialogContent> : <div className="table__center">
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={50}
                    width={50}
                />
            </div>}
        </Dialog>
    )
}

export default ApprovalDetailsModal;