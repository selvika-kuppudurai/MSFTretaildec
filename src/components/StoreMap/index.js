import React, { useState, useEffect } from "react";
import { IoLocationSharp } from 'react-icons/io5'
// import BingMapsReact from "bingmaps-react";
// import ReactBingmaps from 'react-bingmaps';
import ReactBingMap, {
    Pushpin,
    Polyline,
    Layer,
    Infobox,
    ClusterLayer,

} from "@3acaga/react-bing-maps";

import { MAP_API_KEY } from "../../config/Api"

import { connect } from "react-redux";



class StoreMap extends React.Component {
    state = {
        show: false,
        markerId: null,
        data: ""
    }

    storeDetails = (id, data) => {
        this.setState({ show: !this.state.show, markerId: id, data })
    }


    render() {
        const { mapData = [] } = this.props

        const { data } = this.state


        return (
            <div className="store__map">

                <div className="store__map--title">
                    <IoLocationSharp size="30" className="icon__clr" />
                    <h3 className="mb-0 align-items-center mapdesignfonts">Store Location

                    </h3>
                    {window.innerWidth > 500  &&
                    <p className="ml-5 mt-2 d-flex fs-18 map__note col-lg-10">* Zoom-in on the numbers to point the location</p>}
             {/* <h4 className="ml-3 mt-2 d-flex align-items-center fs-18 fw-bold map__note">* Zoom-in on the numbers to point the location</h4> */}
                </div>


                <div className="col-12 mt-3 pb-5" id="mymap" style={{ height: 550, width: "100%" }}>

                    <ReactBingMap apiKey={MAP_API_KEY} zoom={1} center={{ "latitude": 40.525963, "longitude": -2.519652 }}>

                        {/* <Layer animationDuration={500}  >
                            <ClusterLayer layerOffset={500} gridSize={100}>
                                {this.state.show && <Infobox visible={true} title={"vaad seekiram"} children={"checkingdata"} location={{ latitude: 40.525963, longitude: 40.525963 }
                                } />}

                                <Pushpin onClick={() => this.setState({ show: !this.state.show })} location={{ latitude: 40.525963, longitude: 40.525963 }
                                } >

                                </Pushpin>
                            </ClusterLayer>
                        </Layer> */}


                        {mapData && mapData.length > 0 ?
                            <Layer animationDuration={500}>

                                <ClusterLayer layerOffset={500} gridSize={100}>

                                    {mapData && mapData.length > 0 && mapData.map((data, idx) => {



                                        // console.log("latvalues", data.glid, data.latitude, data.longitude, idx, data.latitude <= -90)

                                        if (data !== null && data.latitude !== null && (data.latitude > -90 && data.latitude < 90 ) && data.longitude !== null && (data.longitude > -180 && data.longitude < 180 )) {

                                            return (
                                                <>
                                                    {idx === this.state.markerId && this.state.show && <Infobox visible={this.state.show} title={data.store_name !== null ? `GLID: ${data.glid} - ${data.store_name}` : "Unknown Store"} description={data.retailer !== null ? `${data.retailer}, ${data.city}` : "Unknown Retailer"} location={{ latitude: data.latitude, longitude: data.longitude }
                                                    } />

                                                    }

                                                    <Pushpin
                                                        onClick={() => this.storeDetails(idx, data)}
                                                        location={{ latitude: data.latitude, longitude: data.longitude }
                                                        }
                                                    />



                                                </>
                                            )
                                        }
                                    }
                                    )}

                                </ClusterLayer>

                            </Layer> : <div>Loading.....</div>}
                    </ReactBingMap>
                    {window.innerWidth < 400  &&
                    <p className="ml-5 mt-2 d-flex fs-18 map__note col-lg-10">* Zoom-in on the numbers to point the location</p>}


                </div>

            </div >
        )
    }
}










// const StoreMap = ({ mapData }) => {

//     const [show, setShow] = useState(false)




//     return (

//         <div className="store__map">
//             {console.log("afshsdflagsdfhadsf", show)}
//             <div className="store__map--title">
//                 <IoLocationSharp size="30" className="icon__clr" />
//                 <h3 className="mb-0 align-items-center mapdesignfonts">Store Location

//                 </h3>
//                 <h4 className="ml-3 mt-2 d-flex align-items-center fs-18 fw-bold map__note">* Zoom-in on the numbers to point the location</h4>
//             </div>
//             <div className="col-12 mt-3 pb-5" id="mymap" style={{ height: 600, width: "100%" }}>

//                 <ReactBingMap apiKey={MAP_API_KEY} zoom={1} center={{ "latitude": 40.525963, "longitude": -2.519652 }}>
//                     <Layer animationDuration={500}  >
//                         <ClusterLayer layerOffset={500} gridSize={100}>
//                             {show && <Infobox className="" children={"checkingdata"} location={{ latitude: 40.525963, longitude: 40.525963 }
//                             }>
//                             </Infobox>}

//                             <Pushpin onClick={() => setShow(!show)} location={{ latitude: 40.525963, longitude: 40.525963 }
//                             } >

//                             </Pushpin>



//                         </ClusterLayer>

//                     </Layer>
//                     {/* {mapData && mapData.length > 0 ?
//                         <Layer animationDuration={500}>

//                             <ClusterLayer layerOffset={500} gridSize={100}  >

//                                 {mapData && mapData.length > 0 && mapData.map((data) => {

//                                     if (data !== null && data.latitude !== null && data.longitude !== null) {
//                                         return (
//                                             <>
//                                                 <Pushpin
//                                                     onClick={() => setShow(!show)}
//                                                     location={{ latitude: data.latitude, longitude: data.longitude }
//                                                     }
//                                                 />

//                                                 {show && <Infobox visible={show} className="info__box" location={{ latitude: 40.525963, longitude: -2.519652 }
//                                                 }>
//                                                     <div style={{ backgroundColor: 'red', height: "200px", width: '200px' }}>Checking</div>
//                                                 </Infobox>}

//                                             </>
//                                         )
//                                     }
//                                 }
//                                 )}

//                             </ClusterLayer>

//                         </Layer> : <div>Loading.....</div>} */}
//                 </ReactBingMap>



//             </div>

//         </div >
//     )
// }

const mapStateToProps = (state) => {
    return {
        mapData: state.map.mapDetails
    }
}

export default connect(mapStateToProps)(StoreMap)