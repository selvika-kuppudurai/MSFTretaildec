import React, { Component, useEffect, useState } from "react";
import './style.scss';

import { Select } from 'antd';

const { Option } = Select;




export class NormalSelect extends Component {

  constructor() {
    super();
    this.state = {
      selectValue: ''
    };



  }



  render() {

    let {

      options = [],

      handleChange,
      disabled = false,
      mode = "multiple",
      values = []
    } = this.props;





    return (
      <div>
        <Select
          mode={mode}
          placeholder="Please select"
          onChange={handleChange}
          maxTagCount={0}
          style={{ width: '100%' }}
          allowClear={true}
          // value={values.length > 0 ? values.map(v => v) : []}
          value={values}
          disabled={disabled}
        >

          {options.length > 0 && options.map((option, index) => (
            <option
              value={option}
              key={`${option}_${index}`}
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
