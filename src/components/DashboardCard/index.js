import React, { useState, useEffect } from "react";
import './style.scss'
import IconAssets from '../../assets/images/Icon-Assets.png';
import IconCountries from '../../assets/images/Icon-Countries.png'
import IconInstallers from '../../assets/images/Icon-Installers.png'
import IconRetailers from '../../assets/images/Icon-Retailers.png'
import IconStores from '../../assets/images/Icon-Stores.png'



const DashboardCard = (props) => {
    // if(Object.keys(props.data).length > 0){
    //     console.log('b', props.data)
    //     // this.handleMouseMove = this.handleMouseMove.bind(this);
    //     // testing2()
    // }
    // handleMouseMove(event) {
        
    //   }
    // const callthefunction = () => {
    //     testing2()
    // }
    // const testing2 = () => {
    //     // var url = []
    //     console.log(props.data.length)
    //     if(Object.keys(props.data).length === 0){
    //    const  url = endPoints.summary.table_Data_summary + `?Model=Surface&Region=EMEA&Country=All&Retailer=All&State=All&City=All&GLID=All&AssetTagID=All`
    //     axios.get(url).then(res => setTableDatafordashboard(res.data))    
    // } else {
    //    const url = endPoints.summary.table_Data_summary + `?Model=${props.data.Model}&Region=${props.data.Region}&Country=All&Retailer=All&State=All&City=All&GLID=All&AssetTagID=All`
    //     axios.get(url).then(res => setTableDatafordashboard(res.data))    
    // }
    //     // axios.get(url).then(res => setTableDatafordashboard(res.data))
    //     // console.log('cccc',{props.message})
    //     console.log('testingsummary', summaryData)
    // }
    
    
    // const testing1 = () => {
    //     const url = endPoints.summary.table_Data_summary + `?Model=${props.data.Model}&Region=${props.data.Region}&Country=All&Retailer=All&State=All&City=All&GLID=All&AssetTagID=All`
    //     axios.get(url).then(res => setTableDatafordashboard(res.data))
    //     // console.log('cccc',{props.message})
    //     console.log('testingsummary', summaryData)
    
    // const testing2 = () => {
    //     if (Object.keys(summaryData).length > 0) {
    //         localStorage.setItem('donutchartdata', JSON.stringify(summaryData.assetModelCounts))
    //     }

    // }


return (

    <div className="col-lg-12 col-md-12 col-sm-12 dashboard__card  d-flex justify-content-between flex-wrap">

        <div className="col-lg-3 col-md-3 col-sm-3 mb-md-4 carddesignfordashboard">
            <div className="d-flex">
                <div className="marginautoforlogoalignment">
                <img src={IconCountries} />
                    
                </div>
                <div className='mt-3 flex-column contentdesign'>
                    <div>Countries </div>
                <div className='numberdesign'>{Object.keys(props.data).length > 0 ? props.data.summaryCounts[0].country.toLocaleString() : 0}</div>

                    {/* {summaryData > 0 ? summaryData[0].country: summaryData[0].country} */}
                    {/* {summaryData[0].country} */}
                </div>
                {/* <div className="d-flex">
                <img className="mb-2" src={IconCountries} />

                    
                </div> */}

            </div>
        </div>


        <div className="col-lg-3 col-md-3 col-sm-3 mb-md-4 carddesignfordashboard">
            <div  className="ml-2 d-flex">
            <div className="marginautoforlogoalignment">
                <img src={IconRetailers} />
                
                    
                </div>
                <div className='mt-3 flex-column contentdesign'>
                    <div>Retailers</div>
                <div className='numberdesign'>{Object.keys(props.data).length > 0 ? props.data.summaryCounts[0].retailer.toLocaleString() : 0}</div> 

                    {/* {summaryData[0].retailer} */}
                </div>
                {/* <div className="d-flex">
                <img src={IconRetailers} />
                </div> */}

            </div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-3 mb-md-4 carddesignfordashboard">
            <div className="ml-2 d-flex">
            <div className="marginautoforlogoalignment">
                <img src={IconStores} />
                
                    
                </div>
                <div className='mt-3 flex-column contentdesign'>
                    <div>Stores</div>
                <div className='numberdesign'>{Object.keys(props.data).length > 0 ? props.data.summaryCounts[0].store_name.toLocaleString() : 0}</div>

                    {/* {summaryData[0].store_name} */}
                </div>
                {/* <div className="d-flex">
                <img src={IconStores} />
                </div> */}

            </div>
        </div>

        <div className="col-lg-3 col-md-3 mb-md-4 col-sm-3 carddesignfordashboard">
            <div className="ml-2 d-flex">
            <div className="marginautoforlogoalignment">
                <img src={IconAssets} />
                
                    
                </div>
                <div className='mt-3 flex-column contentdesign'>
                    <div>Assets</div>
                <div className='numberdesign'>{Object.keys(props.data).length > 0 ? props.data.summaryCounts[0].asset.toLocaleString() : 0}</div>

                    {/* {summaryData[0].assetTagID} */}
                </div>
                {/* <div className="d-flex">
                <img src={IconAssets} />

                </div> */}

            </div>
        </div>

        <div className="col-lg-3 col-md-3 mb-md-4 col-sm-3 carddesignfordashboard">
            <div className="ml-2 d-flex">
            <div className="marginautoforlogoalignment">
                <img src={IconInstallers} />
                
                    
                </div>
                <div className='mt-3 flex-column contentdesign'>
                    <div>Installers</div>
                    {/* {summaryData[0].installerName} */}
                <div className='numberdesign'>{Object.keys(props.data).length > 0 ? props.data.summaryCounts[0].installerName.toLocaleString() : 0}</div>

                </div>
                {/* <div className="d-flex">
                <img src={IconInstallers} />


                </div> */}
            </div>
        </div>
    </div>
);
}



export default DashboardCard;