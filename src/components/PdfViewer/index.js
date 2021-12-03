import React from "react";
import SinglePagePDFViewer from "./single-page";
import Skeleton from 'react-loading-skeleton';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import Button from "@material-ui/core/Button"


const PdfViewer = ({ title = "", images = [], changeExtensionView, loadPdf = false, carouselId, fileExtension = [], filesExist, carouselLoader }) => {

    const [pdfIndex, setPdfIndex] = useState(0)

    return (

        <div className='col-lg-4 col-md-4 col-sm-12 carddesign1 mt-4'>
            <div className="imagedesign">
                <div className='headerdesignimage h4'>
                    <h4>{title}</h4>
                </div>


                <>
                    {loadPdf ? images.length > 0 &&
                        <a href={images[pdfIndex] +"?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-12-30T22:59:50Z&st=2021-11-01T14:59:50Z&spr=https&sig=UUE3%2FUV1BF0s2sYhjbwZtPhJefFu9fc3dLkxkXPju78%3D"} download target="_blank" className="cursor-pointer" rel="noreferrer">
                            <SinglePagePDFViewer pdf={images.length > 0 && (images[pdfIndex] + '?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-12-30T22:59:50Z&st=2021-11-01T14:59:50Z&spr=https&sig=UUE3%2FUV1BF0s2sYhjbwZtPhJefFu9fc3dLkxkXPju78%3D')} />
                        </a> : "Checking"
                    }



                    {images.length > 1 && <div className="d-flex justify-content-between">
                    <div className="add__asset ">
                                <Button  variant="contained" className={`fs-30 mt-3 cursor-pointer  ${pdfIndex + 1 >= images.length ? "pdf__btns" : "pdf__btns--disable"}`} onClick={() => pdfIndex + 1 >= images.length && setPdfIndex(pdfIndex - 1)}> Previous Pdf</Button>
                            </div>
                        {/* <p className={`fs-30 mt-3 cursor-pointer  ${pdfIndex + 1 >= images.length ? "pdf__btns" : "pdf__btns--disable"}`} onClick={() => pdfIndex + 1 >= images.length && setPdfIndex(pdfIndex - 1)}>Previous Pdf</p> */}
                        <div className="add__asset ">
                                <Button  variant="contained" className={`fs-30 mt-3 cursor-pointer  ${pdfIndex + 1 < images.length ? "pdf__btns" : "pdf__btns--disable"}`} onClick={() => pdfIndex + 1 < images.length && setPdfIndex(pdfIndex + 1)}> next Pdf</Button>
                            </div>
                        {/* <p className={`fs-30 mt-3 cursor-pointer  ${pdfIndex + 1 < images.length ? "pdf__btns" : "pdf__btns--disable"}`} onClick={() => pdfIndex + 1 < images.length && setPdfIndex(pdfIndex + 1)}>Next Pdf</p> */}
                    </div>}
                </>

                {filesExist !== undefined && !filesExist && <div className="no__files">Not Available</div>}

                {carouselLoader && <Skeleton delay={1} height={300} />}

                {loadPdf && fileExtension.includes("jpg" || "png" || "jpeg") && <div onClick={() => changeExtensionView(carouselId)} className="cursor-pointer pdf__btns text-primary fs-24 d-flex mt-1 " >{"Click here to view image"}</div>}

            </div>
        </div>
    )
}

export default PdfViewer;