import React, { Component, useEffect, useState } from "react";
import './style.scss';

import { Select } from 'antd';

const { Option } = Select;




export class NormalSelect1 extends Component {

  constructor() {
    super();
    this.state = {
      selectValue: ''
    };





  }




  render() {

    let {

      options = [],

      handleimportfunction,
      onSearch,
      disabled = false,
      mode = "single",
      values = '',
      models = ''
    } = this.props;
console.log('ssss', handleimportfunction)
console.log('ssss', values)



    return (
      <div>
        <Select
        models = {models}
         placeholder={models}
        className="widthfordropdown ml-2"
        showSearch
        optionFilterProp="children"
        onSearch={onSearch}
        filterOption={(input, option) =>  
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 
          || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
       
          onChange={handleimportfunction}
          maxTagCount={0}
          
          allowClear={true}
      
          // value={values.length > 0 ? values.map(v => v) : []}
          value={values === '' ? undefined : values}
          disabled={disabled}
        >

          {options.length > 0 && options.map((option, index) => (
            <option
              value={option}
           
            //   key={`${option}_${index}`}
            >
           {option}
            </option>
          ))}

        </Select>
        <p>{this.state.selectValue}</p>
      </div>
    )
  }
}
