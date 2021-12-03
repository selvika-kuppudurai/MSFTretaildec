import { Chartscomponent, Chartscomponent1, Chartscomponent3, Chartscomponent4 } from "../Common/Chartscomponent"
import { Dualbarchart } from '../Common/Drilldownchart/index'
import React, { useState } from "react";
import './style.scss'
import Highcharts from 'highcharts';
import { MdSettingsInputAntenna } from "react-icons/md";


const ChartsComponent = (props) => {

    let colorsfordonut = ['#c8c8c8', '#71afe5', '#21386c', '#106ebe', '#546E7A', '#546E7A']
    var colors = ['#008ffb', '#21386c', '#c8c8c8']
    // const setData = () => {
    let xaxisvaluefordonut = []
    let seriesvaluefordonut = []
    let finalanswerfordonut = []

        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });

// donut chart
    if (Object.keys(props.data).includes('assetModelCounts')) {
        // var colors = ['#008ffb', '#21386c', '#546E7A']
        // console.log('x',props.data.assetModelCounts)
        console.log(props.data.assetModelCounts.length)
        props.data.assetModelCounts.map((data, index) => {
            if (data.model && data.model != null) {
                xaxisvaluefordonut = data.model
                seriesvaluefordonut = data.asset
            }
            if (data.model != null) {
                const v = {
                    'name': xaxisvaluefordonut,
                    'y': seriesvaluefordonut,
                    'color': colors[index]
                }
                finalanswerfordonut.push(v)
                console.log(finalanswerfordonut)
            }
        })
    }

    // column chart
    if (Object.keys(props.data).length > 0 && Object.keys(props.data).includes('assetAgeCounts')) {
        var xaxisforcolumnchart = []
        var modelvaluesforcolumnchart = []
        var seriesvaluesforcolumnchart = []
        var finalanswerforcolumnchart = []
        var finalanswerforcolumnchartxaxis = []
        var check = []
        var seriesvalues = {
            name: '',
            type: '',
            color: '',
            data: ''
        }
        props.data.assetAgeCounts.map((data, index) => {
            if (data.model) {
                modelvaluesforcolumnchart.push(data.model)
                seriesvaluesforcolumnchart.push(data.assetTagIDCount.split(',').map(i => Number(i)))
                xaxisforcolumnchart.push(data.asset_Age_Classification.split(','))
            }
        })
        modelvaluesforcolumnchart.map((data1, index) => {
            seriesvalues = {
                name: data1, type: 'column', color: colors[index], data: seriesvaluesforcolumnchart[index]
            }
            finalanswerforcolumnchart.push(seriesvalues)
            finalanswerforcolumnchartxaxis.push(xaxisforcolumnchart[xaxisforcolumnchart.length - 1])

        })
        check.push(finalanswerforcolumnchart)
        check.push(finalanswerforcolumnchartxaxis)

    }
    
    // var colors = ['#008ffb', '#21386c', '#546E7A']
    let finalanswer = []
    let vall1 = []
    let vall2 = []
    let sku = []
    var cc = {
        chart: {
            type: 'bar',
        },
        title: {
            text: '',
            style: {
                color: 'rgb(0, 143, 251)',
                fontSize: '14px',
                fontFamily: 'Segoe UI,SegoeUI,"Helvetica Neue",Helvetica,Arial,sans-serif'

            }
        },
        xAxis: {
            categories: [],
            title: {
                text: 'Surface'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    // formatter:function() {
                    //     return Highcharts.numberFormat(this.value, 0, '', ',');
                    //   },
                    style: {
                        fontSize: '11px',
                        color: '#666666',
                        fill: '#666666',
                        fontWeight: 400
                    }
                }
            }
        },
        yAxis: {
            visible: false
        },
        credits: {
            enabled: false
        },
        series: []
    }

    // multiple column chart
    if (Object.keys(props.data).includes('assetTypeCounts')) {
        props.data.assetTypeCounts.map((data, index) => {
            vall1 = data.model
            vall2 = data.assetTagIDCount.split(',').map(i => Number(i))
            sku = data.sku.split(',')
            let heightsample = Number
            let barwidth = Number
            if (sku.length < 5) {
                heightsample = 250
                barwidth = 10
            } else {
                heightsample = (9 * (sku.length) * 4)
                barwidth = 10
            }
            cc = {
                chart: {
                    type: 'bar',
                    height: heightsample
                },
                title: {
                    text: `Fixtures -- ${vall1}`,
                    style: {
                        color: colors[index],
                        fontSize: '14px',
                        fontFamily: 'Segoe UI,SegoeUI,"Helvetica Neue",Helvetica,Arial,sans-serif'

                    }
                },
                yAxis: {
                    visible: false
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        pointPadding: 0.3,
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontSize: '11px',
                                color: '#666666',
                                fill: '#666666',
                                fontWeight: 400
                            }
                        }
                    }
                },
                xAxis: {
                    categories: sku,
                    title: {
                        text: vall1
                    }
                },
                series: [{
                    name: vall1,
                    data: vall2,
                    color: colors[index],
                    pointWidth: barwidth,


                }]
            }


            finalanswer.push(cc)

        })
    }
    let donutchartforassetinprogress = []
    let objectvaluesfordonutchart = {
        name: '',
        y: '',
        color: ''
    }
    let totalsum = []
    let sum = Number
    if (Object.keys(props.data).includes('assetinprogress')) {
        console.log('d', props.data.assetinprogress)
        props.data.assetinprogress.map((data, index) => {
            objectvaluesfordonutchart = {
                name: data.bucket,
                y: data.assettagID,
                color: colorsfordonut[index]
            }
            totalsum.push(data.assettagID)
            donutchartforassetinprogress.push(objectvaluesfordonutchart)
            console.log(donutchartforassetinprogress)
        })
        if (totalsum.length > 0) {
            sum = totalsum.reduce((a, b) => a + b)
        }
    }
    //donut start for status
    if (Object.keys(props.data).includes('assetStatus')) {
        var xaxisforcolumnchartstatus = []
        var modelvaluesforcolumnchartstatus = []
        var seriesvaluesforcolumnchartstatus = []
        var finalanswerforcolumnchartstatus = []
        var finalanswerforcolumnchartxaxisstatus = []
        var checkstatus = []
       
        var seriesvaluesstatus = {
            name: '',
            type: '',
            color: '',
            data: ''
        }

        props.data.assetStatus.map((data, index) => {
            if (data.model) {
                modelvaluesforcolumnchartstatus.push(data.model)
                seriesvaluesforcolumnchartstatus.push(data.assetTagID.split(',').map(i => Number(i)))
                xaxisforcolumnchartstatus.push(data.status.split(','))
            }
        })
        modelvaluesforcolumnchartstatus.map((data1, index) => {
            seriesvaluesstatus = {
                name: data1, type: 'column', color: colors[index], data: seriesvaluesforcolumnchartstatus[index]
            }
            finalanswerforcolumnchartstatus.push(seriesvaluesstatus)
            finalanswerforcolumnchartxaxisstatus.push(xaxisforcolumnchartstatus[xaxisforcolumnchartstatus.length - 1])

        })
        checkstatus.push(finalanswerforcolumnchartstatus)
        checkstatus.push(finalanswerforcolumnchartxaxisstatus)
    }

    return (
        <div>
            <div className='col-12 borderdesign d-md-flex d-lg-flex flex-sm-column flex-md-row justify-content-between'>
                <div className="col-lg-8 col-md-6 paddingnone">
                    <div className="d-lg-flex">
                    <div className='col-md-12  mb-md-2  col-lg-6 col-sm-12 mb-sm-4 carddesignforchart widthforcharts-49 paddingnone'>
                        <div className='headerdesignforchart'>
                            <p># Assets by Model</p>
                        </div>
                        <Chartscomponent message={finalanswerfordonut} />
                    </div>
                    <div className='col-md-12  mb-md-2  col-lg-6 col-sm-12 ml-md-3 widthforcharts-49 carddesignforchart'>
                        <div className='headerdesignforchart'>
                            <p>Distribution of Fixtures by Age</p>
                        </div>
                        <Chartscomponent1 message={check} />
                    </div>
                    </div>
                    <div className="d-lg-flex">
                    <div className='col-md-12  mb-md-2  col-lg-6 col-sm-12 widthforcharts-49 carddesignforchart'>
                    <div className='headerdesignforchart'>
                        <p>Distribution of Fixtures by status</p>
                    </div>
                    <Chartscomponent3 message={checkstatus} />
                </div>


                <div className='col-md-12  mb-md-2  col-lg-6 col-sm-12 ml-md-3 widthforcharts-49 carddesignforchart'>
                   
                        <div className='headerdesignforchart'>
                            <p>Days Due for the assets in progress</p>
                            {props.data.assetinprogress && props.data.assetinprogress.length > 0 ? <p>Total: {sum}</p> : <p></p>}
                        </div>
                        {props.data.assetinprogress && props.data.assetinprogress.length > 0 ?
  <div>
                        <Chartscomponent4 message={donutchartforassetinprogress} />
                    </div> : <div className="no__files">No data available</div>}
                </div>
                </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12 ml-md-1 carddesignforchart1'>

                    <div className='headerdesignforchart'>
                        <p>Distribution of Fixtures by Asset Type</p>
                    </div>
                    <Dualbarchart message={finalanswer} />
                </div>
            </div>
          



        </div>


    )
}
export default ChartsComponent;
