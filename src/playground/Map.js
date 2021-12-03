import React from "react";
import ReactBingMap, {
    Pushpin,
    Polyline,
    Layer,
    Infobox,
    ClusterLayer,

} from "@3acaga/react-bing-maps";

import { MAP_API_KEY } from "../config/Api"

class MapInfo extends React.Component {

    state = {
        show: false
    }

    render() {
        return (
            <div className="col-12 mt-3 pb-5" id="mymap" style={{ height: 600, width: "100%" }}>

                <ReactBingMap apiKey={MAP_API_KEY} zoom={1} center={{ "latitude": 40.525963, "longitude": -2.519652 }}>
                    <Layer animationDuration={500}  >
                        <ClusterLayer layerOffset={500} gridSize={100}>
                            {this.state.show && <Infobox className="" children={"checkingdata"} location={{ latitude: 40.525963, longitude: 40.525963 }
                            }>
                            </Infobox>}

                            <Pushpin onClick={() => this.setState({ show: !this.state.show })} location={{ latitude: 40.525963, longitude: 40.525963 }
                            } >

                            </Pushpin>



                        </ClusterLayer>

                    </Layer>
                </ReactBingMap>
            </div>
        )
    }
}

export default MapInfo;