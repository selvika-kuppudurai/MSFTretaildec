import { Components } from "antd/lib/date-picker/generatePicker";
import React, { Component, useState, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


// donut chart
class Chartscomponent1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    if(window.innerWidth > 11)
    this.colors = ['#008ffb', '#21386c', '#546E7A']
    
    if (this.props.message != undefined) {
      this.state = {
        chart: {
          type: 'column',
          height: 260,
        },
        title: {
          text: null
        },
        
        plotOptions: {
          series: {
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
          categories: this.props.message[1][0],
        },
        yAxis: {
          visible: false
        },

        credits: {
          enabled: false
        },
        series: this.props.message[0]
      }
    } else {
      this.state = {
        chart: {
          type: 'column',
          height: 260,
        },
        title: {
          text: null
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          visible: false
        },

        credits: {
          enabled: false
        },
        series: []
      }
    }
    return (
      <div className="app">

        <div className="col-12">
          <div className="col mixed-chart">

            <div>
              <HighchartsReact highcharts={Highcharts} options={this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// column chart
class Chartscomponent3 extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    this.colors = ['#008ffb', '#21386c', '#546E7A']
    
      if (this.props.message != undefined) {
        this.state = {
          chart: {
            type: 'column',
            height: 260,
          },
          title: {
            text: null
          },
          plotOptions: {
            series: {
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
            categories: this.props.message[1][0],
          },
          yAxis: {
            visible: false
          },
  
          credits: {
            enabled: false
          },
          series: this.props.message[0]
        }
      } else {
        this.state = {
          chart: {
            type: 'column',
            height: 260,
          },
          title: {
            text: null
          },
          xAxis: {
            categories: [],
          },
          yAxis: {
            visible: false
          },
  
          credits: {
            enabled: false
          },
          series: []
  
        }
      }
    return (
      <div className="app">

        <div className="col-12">
          <div className="col mixed-chart">

            <div>
              <HighchartsReact highcharts={Highcharts} options={this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// multiple column chart
class Chartscomponent extends Component {
  constructor(props) {
    super(props);
  }


  

  
  render() {
    Highcharts.setOptions({
      lang: {
          thousandsSep: ','
      }
  });
    this.colors = ['#c8c8c8', '#71afe5','#21386c', '#106ebe','#546E7A','#546E7A']
   
    
      this.state = {
        chart: {
          height: 260,
         
        },
        credits: {
          enabled: false
        },
        title: {
          style: {
              fontSize:'100%'
          },
          text: '',
        },
        tooltip: {
          pointFormat: '{point.percentage:.1f}%'
        },
        plotOptions: {
          pie: {
              
              size:'100%',
              dataLabels: {
                distance: -45,
                  enabled: true,
                  align: 'left',
                  format: '{point.name}<br>{point.y: ,.f}<br>{point.percentage:.1f} %',
              }
          }
        },
        series: [{
          type: 'pie',
          innerSize: '60%',
         data: this.props.message
        }]
       

      }
    
    
    return (
     
      <div className="app">

        <div className="col-lg-12">
          <div className="mixed-chart">

            <div>
              <HighchartsReact highcharts={Highcharts} options={this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// donut chart for status
class Chartscomponent4 extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    this.colors = ['#c8c8c8', '#71afe5','#21386c', '#106ebe','#546E7A','#546E7A']
    
    
      this.state = {
        chart: {
          height: 250,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          style: {
              fontSize:'100%'
          },
          text: '',
          align: 'center',
          verticalAlign: 'middle',
          y: 6,
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{point.percentage:.1f}%'
        },
        plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              innerSize: '40%',
              dataLabels: {
                
                  enabled: true,
                  format: '{point.name}<br>{point.y: ,.f}<br>{point.percentage:.1f} %',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
              }
          }
        },
        series: [{
          type: 'pie',
          innerSize: '50%',
          outerWidth:'50%',
          data: this.props.message
        }]
      

      }
    
    
    return (
    
      <div className="app">

        <div className="col-12">
          <div className="col mixed-chart">

            <div>
              <HighchartsReact highcharts={Highcharts} options={this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Chartscomponent, Chartscomponent1, Chartscomponent3, Chartscomponent4 };

// export default Chats;
