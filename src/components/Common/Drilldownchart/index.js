import React, { Component } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './style.scss'
import { endPoints } from "../../../config/Api";
import axios from "axios"
class Dualbarchart extends Component {

    // componentDidMount() {
    //     const script = document.createElement("script");    script.async = true;    script.src = "http://blacklabel.github.io/grouped_categories/grouped-categories.js";    this.div.appendChild(script);  }
    constructor(props) {
        super(props)
        this.state = {
            'finalanswer': []
        }
        this.state.finalanswer = [
            // chart: {
            //     type: 'bar'
            // },
            // credits: {
            //     enabled: false
            // },
            // title: {
            //     text: ''
            // },
            // xAxis: {
            //     categories: ['Table Top', 'Pinball', 'Pinball+ 2 extension', 'Endcap - Duo', 'Inline', 'NL609-6G', '65Fx-16', '10Fx-16', 'NL509-6G', 'D1X17-16G',
            //         'Willow1', 'Willow2', 'Willow3', 'Willow4', 'Willow5'
            //     ],
            // },

            // series: {
            //     type: 'bar',
            //     data: [{ y: 4810, color: 'rgb(0, 143, 251)', value: 'Surface', }, { y: 411, color: 'rgb(0, 143, 251)', value: 'Surface' }, { y: 732, color: 'rgb(0, 143, 251)', value: 'Surface' }, { y: 494, color: 'rgb(0, 143, 251)', value: 'Surface' }, { y: 409, color: 'rgb(0, 143, 251)', value: 'Surface' }, { y: 2522, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 1168, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 1051, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 904, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 600, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 1988, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' }, { y: 1237, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' }, { y: 893, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' }, { y: 654, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' }, { y: 411, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' },
            //     ]
            // },
            //         chart: {
            //             type: 'bar'
            //         },
            //         title: {
            //             text: 'School results'
            //         },
            //         tooltip: {
            //             formatter: function () {
            //                 return this.x.parent.name;
            //             }
            //         },
            //         xAxis: {
            //             categories: [{
            //     name: "Ahlafors Fria skola (Ale)",
            //     categories: ["2014", "2013", "2011", "2010", "2009", "2008", "2007"]
            // }, {
            //     name: "Almers skola 7-9 och grundsärskolan äldre elever (Varberg)",
            //     categories: ["2014"]
            // }, {
            //     name: "Himlaskolan 4-9 (Ale)",
            //     categories: ["2014"]
            // }],
            //             min: 0,
            //             max: 8,
            //             title: {
            //                 text: null
            //             },
            //             labels: {
            //                 x: -6, //correction for 4.x
            //                 y: 5 // 11px font size 
            //             }
            //         },
            //         yAxis: {
            //             min: -5,
            //             max: 5
            //         },
            //         plotOptions: {
            //             bar: {
            //                 grouping: false,
            //                 pointPadding: 0.3,
            //                 negativeColor: '#FF0000',
            //                 color: '#0000FF',
            //                 dataLabels: {
            //                     enabled: true,
            //                 }
            //             }
            //         },
            //         credits: {
            //             enabled: false
            //         },
            //         series: [{
            //     name: "2014",
            //     data: [
            //         [0, -3.0],
            //         [0, 3.0],
            //         [7, 2.0],
            //         [8, -2.0]
            //     ]
            // }, {
            //     name: "2013",
            //     data: [
            //         [1, 4.0]
            //     ]
            // }, {
            //     name: "2011",
            //     data: [
            //         [2, 1.0]
            //     ]
            // }, {
            //     name: "2010",
            //     data: [
            //         [3, -2.0]
            //     ]
            // }, {
            //     name: "2009",
            //     data: [
            //         [4, -1.0]
            //     ]
            // }, {
            //     name: "2008",
            //     data: [
            //         [5, -2.0]
            //     ]
            // }, {
            //     name: "2007",
            //     data: [
            //         [6, .0]
            //     ]
            // }]
            {
                chart: {
                    type: 'bar',
                    height: 300,
                },
                title: {
                    text: 'Fixtures -- Surface',
                    style: {
                        color: 'rgb(0, 143, 251)',
                        fontSize: '14px',
                        fontFamily: 'Segoe UI,SegoeUI,"Helvetica Neue",Helvetica,Arial,sans-serif'

                    }
                },
                xAxis: {
                    categories: ['Table Top', 'Pinball', 'Pinball+ 2 extension', 'Endcap - Duo', 'Inline',
                    ],
                    title: {
                        text: 'Surface'
                    }
                },
                yAxis: {
                    visible: false
                },
                credits: {
                    enabled: false
                },
                series: [
                    {
                        showInLegend: false,
                        data: [{ y: 4810, color: 'rgb(0, 143, 251)', name: 'Surface', }, { y: 411, color: 'rgb(0, 143, 251)', name: 'Surface' }, { y: 732, color: 'rgb(0, 143, 251)', name: 'Surface' }, { y: 494, color: 'rgb(0, 143, 251)', name: 'Surface' }, { y: 409, color: 'rgb(0, 143, 251)', name: 'Surface' },]
                    }]

            },
            {
                chart: {
                    type: 'bar',
                    height: 300,
                    width: 350
                },
                title: {
                    text: 'Fixtures -- MRR 1.0',
                    style: {
                        color: 'rgb(33, 56, 108)',
                        fontSize: '14px',
                        fontFamily: 'Segoe UI,SegoeUI,"Helvetica Neue",Helvetica,Arial,sans-serif'

                    }
                },
                xAxis: {
                    categories: ['NL609-6G', '65Fx-16', '10Fx-16', 'NL509-6G', 'D1X17-16G',
                    ],
                    title: {
                        text: 'MRR 1.0'
                    }
                },
                yAxis: {
                    visible: false
                },
                credits: {
                    enabled: false
                },
                series: [
                    {
                        showInLegend: false,
                        data: [{ y: 2522, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 1168, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 1051, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 904, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }, { y: 600, color: 'rgb(33, 56, 108)', value: 'MRR 1.0' }]
                    }]
            }, {
                chart: {
                    type: 'bar',
                    height: 300,
                    width: 350
                },
                title: {
                    text: 'Fixtures -- MRR 2.0',
                    style: {
                        color: 'rgb(84, 110, 122)',
                        fontSize: '14px',
                        fontFamily: 'Segoe UI,SegoeUI,"Helvetica Neue",Helvetica,Arial,sans-serif'

                    }
                },
                xAxis: {
                    categories: ['Willow1', 'Willow2', 'Willow3', 'Willow4', 'Willow5'
                    ],
                    title: {
                        text: 'MRR 2.0'
                    }
                },
                yAxis: {
                    visible: false
                },

                credits: {
                    enabled: false
                },
                series: [

                    {
                        showInLegend: false,
                        data: [{ y: 1988, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' }, { y: 1237, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' }, { y: 893, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' }, { y: 654, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' }, { y: 411, color: 'rgb(84, 110, 122)', value: 'MRR 2.0' },
                        ]
                    }]
            }]
    }
    setData(vall) {

        let finalanswer = []
        let vall1 = []
        let vall2 = []
        let sku = []
        var cc = {
            chart: {
                type: 'bar',
                height: 300,
            },
            title: {
                text: '',
                style: {
                    color: 'rgb(0, 143, 251)',
                    fontSize: '14px',
                    fontFamily: 'Segoe UI,SegoeUI,"Helvetica Neue",Helvetica,Arial,sans-serif'

                }
            },
           
            //  dataLabels: {
            //             enabled: true,
            //             formatter: function (val, opts) {
            //                 return opts.w.config.series[opts.seriesIndex]
            //             },
            //         },
            xAxis: {
                categories: [],
                title: {
                    text: 'Surface'
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
        if (Object.keys(vall).includes('assetTypeCounts')) {
            vall.assetTypeCounts.map(data => {
                vall1 = data.model
                vall2 = data.assetTagIDCount.split(',').map(i => Number(i))
                sku = data.sku.split(',')
                cc = {
                    chart: {
                        type: 'bar',
                        height: 300,
                    },
                    title: {
                        text: `Fixtures -- ${vall1}`,
                        style: {
                            color: 'rgb(0, 143, 251)',
                            fontSize: '14px',
                            fontFamily: 'Segoe UI,SegoeUI,"Helvetica Neue",Helvetica,Arial,sans-serif'

                        }
                    },
                    yAxis: {
                        visible: false
                    },
                   
                            dataLabels: {
                                enabled: false,
                                formatter: function (val, opts) {
                                  
                                    return opts.w.config.series[opts.seriesIndex]
                                },
                            
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        categories: sku,
                        title: {
                            text: vall1
                        }
                    },
                    series: [

                        {
                            showInLegend: false,
                            data: vall2,
                            color: 'rgb(0, 143, 251)'

                        }]
                }


                finalanswer.push(cc)

            })

            this.setState({ finalanswer })

            // this.setState({options:{labels: vall1}})

        }
    }

    
    render() {
        return (

            <div className="app">

                <div className="col-12">
                    <div className="col multiplechartdesign mixed-chart">

                        <div>
                            {this.props.message.map((state, i) =>
                                <HighchartsReact highcharts={Highcharts} options={state} />)}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { Dualbarchart };


// import React, { Component } from "react";
// // Import Highcharts
// import { render } from "react-dom";
// import Highcharts from "highcharts";
// import drilldown from "highcharts/modules/drilldown.js";
// import HighchartsReact from "highcharts-react-official";

// // drilldown(Highcharts);

// export class Dualbarchart extends Component {
//   constructor(props) {
//     drilldown(Highcharts);
//     super(props);
//     // this.allowChartUpdate = true;
//     this.state = {
//       options: {
//         chart: {
//           type: "bar",
//         //   events: {
//         //     drilldown: function(e) {
//         //       console.log("Drilldown" + e.point.name);
//         //       console.log("Drilldown" + e.seriesOptions )
//         //       if (!e.seriesOptions) {
//         //         var chart = this;
//         //         if (e.point.name === "NAMR") {
//         //           chart.addSingleSeriesAsDrilldown(e.point, {
//         //             name: "New",
//         //             color: "green",
//         //             data: [["Mary", 34], ["Peter", 22]]
//         //           });
//         //           chart.addSingleSeriesAsDrilldown(e.point, {
//         //             name: "In Progress",
//         //             color: "blue",
//         //             data: [["Mary", 4], ["Peter", 12]]
//         //           });
//         //         }
//         //         chart.applyDrilldown();
//         //       }
//         //     }
//         //   }
//         },

//         title: {
//           text: "Testing Chart",
//           style: {
//             fontSize: "15px",
//             fontWeight: "bold",
//             color: "#123E69"
//           }
//         },
//         subtitle: {
//           text: "Click the columns to drilldown to each region"
//         },

//         xAxis: {
//           // categories: ['Chrome', 'Firefox']
//           type: "category"
//         },
//         yAxis: [{
//           min: 0, // Lowest value to show on the yAxis
//           title: {
//             text: "Counts" // Title for the yAxis
//           }
//         }],
//         legend: {
//           enabled: true // Enable/Disable the legend
//         },

//         tooltip: {
//           shared: true // If you have multiple series then all points in each category will show up on one tooltip
//         },

//         series: [
//           {
//             name: "New",
//             data: [
//               {
//                 name: "NAMR",
//                 y: 34,
//                 drilldown: true
//               }
//             ]
//           },
//           {
//             name: "In Progress",
//             data: [
//               {
//                 name: "NAMR",
//                 y: 66,
//                 drilldown: true
//               }
//             ]
//           }
//         ]
//       }
//     };
//   }

  // componentDidMount() {
  //   // const chart = this.refs.chartComponent.chart;
  // }

  // categoryClicked() {
  //   this.allowChartUpdate = true;

  // }

//   render() {
//     return (
//       <HighchartsReact
//         // allowChartUpdate={this.allowChartUpdate}
//         // ref={'chartComponent'}
//         highcharts={Highcharts}
//         options={this.state.options}
//       />
//     );
//   }
// }
// render(<Dualbarchart />, document.getElementById("root"));


// import React, { Component } from "react";

// import React, { Component } from "react";
// // Import Highcharts
// import { render } from "react-dom";
// import Highcharts from "highcharts";
// import drilldown from "highcharts/modules/drilldown.js";
// import HighchartsReact from "highcharts-react-official";


// chartOptions: Highcharts.Chart;
// chartOptionsCloned: any;
// chartOptionsForBar: any;
// seriesArray: any;
// export class Dualbarchart extends Component {
//     constructor(props) {

//         this.chartOptionsCloned = JSON.stringify(this.chartOptions);
//         this.state = {

//         }
//             chartOptionsForBar = JSON.parse(this.chartOptionsCloned);

//             querydimension = [];

//             metrics = ['revenue'];

//             coluname = ['surface, MRR1.0, MRR2.0'];
//             firstvalue = ['selkd', 'jasdhasd', 'adsghdasd', 'dasghgdjajds', 'asdahsadas', 'asdgagsahasfa', 'gff', 'hyyer','gasdfa'];
//             secondvalue = [400, 430, 448, 470, 690, 1100, 1200, 1380];

//             chartOptionsForBar.xAxis = []
//             chartOptionsForBar.xAxis.push({
//                 categories: coluname,
//                 // title: { text: querydimension[0] }
//               });
//               metrics.map((metric, index) => {
//                 const tempSeriesObject = {
//                   name: metric,
//                   type: 'bar',
//                   data: (index === 0) ? firstvalue : secondvalue
//                 };

//                 const tempYAxisObject = {
//                   title: {
//                     text: metric
//                   }
//                 };

//                 const yAxisPosition = 'yAxis';
//                 const opposite = 'opposite';
//                 if (index === 0) {
//                   tempSeriesObject[yAxisPosition] = 1;
//                 }
//                 if (index === 1) {
//                   tempYAxisObject[opposite] = true;
//                 }
//                 seriesArray.push(tempSeriesObject);
//                 chartYAxis.push(tempYAxisObject);
//               });
//               chartOptionsForBar.yAxis = chartYAxis;

//     }  

//     render(){
//         return (

//         )
//     }






// }
