import React, { Component } from 'react';
import {BsSearch} from 'react-icons/bs'
import './style.scss'

export class NormalInput extends Component {
  render() {
    let {
      id = '',
      className = 'form-control',
      placeholder = '',
      onChange,
      value = '',
      defaultValue = '',
      name,
      disabled = false,
      type = 'text',
      iconname = '',
      max = '',
      min = '',
      labelRight = false,
      validator,
      blurValidation = false,
      validatorName,
      readonly = false,
    } = this.props;

    return (
      <div className="form-group">
       <i className="far fa-search input-icon"></i>
        {/* className={`${iconname} input-icon`} */}
        <input
          id={id}

          // readOnly={readonly}
          className={`${className} ${iconname !== '' ? 'pr-5' : ''}`}
          name={name}
          type={type}
          value={value}
          // defaultValue={defaultValue}
          minLength={min}
          maxLength={max}
          placeholder={placeholder}
          disabled={disabled}
          onChange={e => {
            let body = {};

            body = {
              target: {
                name: e.target.name,
                value: e.target.value,
              },
            };

            onChange && onChange(body);
          }}
          onBlur={e => {
            if (blurValidation) {
              validator.showMessageFor(validatorName);
            }
          }}
        />
        {labelRight ? <span className="labelRight">{labelRight}</span> : ''}
      </div>
    );
  }
}
