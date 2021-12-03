import React, { useState } from "react";
import { Carousel } from 'react-responsive-carousel'
import Skeleton from 'react-loading-skeleton';


// import { Carousel}
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageModal from "../../pages/deepDive/ImageModal";
import UrlImageDownloader from 'react-url-image-downloader'
import {FiDownload }  from 'react-icons/fi'




const Carosuel = ({ title = "", images = [], fileExtension = [], loadImage = true, changeExtensionView, loadPdf = false, carouselId, carouselLoader, filesExist }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [imageUrl, setImageUrl] = useState()

    const closeModal = () => setModalVisible(false)


    const modalState = (image) => {
        setModalVisible(true)
        setImageUrl(image)
    }
const state = {
        imageUrl: "",
        imageArray: [
        ]
    }
  
    // for(var i = 0; i < )
   

      const fileDownloadHandler = async (pictures, title) => {
        for (var i = 0; i< pictures.length; i++) {
        // console.log(pictureUrl)
        const response = await fetch(pictures[i] +'?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-12-30T22:59:50Z&st=2021-11-01T14:59:50Z&spr=https&sig=UUE3%2FUV1BF0s2sYhjbwZtPhJefFu9fc3dLkxkXPju78%3D');
        console.log(response)
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `${title}.jpeg`;
            a.click();
        });
      }
    }
  
    console.log(images)

    return (

        <div className='col-lg-4 col-md-4 col-sm-12 carddesign1 mt-4 equalwidth' >
           
           {/* <div className="App"> */}
          
      {/* <a
        href={images[0] + "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-10-30T14:15:13Z&st=2021-10-01T06:15:13Z&spr=https&sig=%2BOqOBgmsHLr6lIY4tLpQb2hNz7WW1KYuJZ6u%2FemCzfc%3D"}
        download target="_blank" rel="noreferrer"
        // onClick={e => download(e)}
      >
        <i className="fa fa-download" />
        download
      </a> */}
      {/* <img 
      src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress?cs=tinysrgb?   h=350"
      alt="new"
      >download</img> */}
      {/* <UrlImageDownloader imageUrl="https://i.postimg.cc/9MFvz25j/movingtogether-primary-804744d5605a360dc6a2faca9183c51f.jpg" >download</UrlImageDownloader> */}
    {/* </div> */}
  
            <div className="imagedesign">
                <div className="d-flex col-lg-12">
                <div className='col-lg-6 pl-0 headerdesignimage h4'>
                    <h4>{title}</h4>
                </div>
                {images.length > 0 && 
                <div className="col-lg-6 pr-0 textalign-end">
            <FiDownload size="20" className="cursor-pointer" onClick={()=>fileDownloadHandler(images,title)}></FiDownload>
            </div>
            }
                </div>
                {<Carousel autoPlay>
                    {images.length > 0 && images != '' && images.map((image) => {
                        
                        console.log('ccccc',images)

                        return (
                            <>
                                {loadImage && image != '' &&
                                
                                    <div className="cursor-pointer" onClick={() => modalState(image + '?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-12-30T22:59:50Z&st=2021-11-01T14:59:50Z&spr=https&sig=UUE3%2FUV1BF0s2sYhjbwZtPhJefFu9fc3dLkxkXPju78%3D')}>
                                        <img className="d-block w-100" src={image + '?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-12-30T22:59:50Z&st=2021-11-01T14:59:50Z&spr=https&sig=UUE3%2FUV1BF0s2sYhjbwZtPhJefFu9fc3dLkxkXPju78%3D'} alt="image2" loading="lazy" />
                                    </div>
                                }

                            </>
                        )
                    })}

                </Carousel>
                }



                {filesExist !== undefined && !filesExist && <div className="no__files">Not Available</div>}

                {carouselLoader && <Skeleton delay={1} height={300} />}


                {fileExtension.includes("pdf") && <div onClick={() => changeExtensionView(carouselId)} className="cursor-pointer text-primary fs-24 pdf__btns d-flex mt-1" >{"Click here to view pdf"}</div>}

                {modalVisible && <ImageModal modalVisible={modalVisible} cancel={closeModal} imageUrl={imageUrl} />}


            </div>
        </div>
    )
}

export default Carosuel;