import React, { Component } from 'react';
import './style.scss'
import { IoAddCircleOutline } from 'react-icons/io5'
export class NormalButton extends Component {
  render() {
    const {
      className = '',
      label = '',
      title ='',
      onClick,
      id,
      disabled = false,
      leftIcon = false,
      rightIcon = '',
    } = this.props;



    return (
      <button
        type="button"
        id={id}
        title={title}
        className={`btn ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {leftIcon && <IoAddCircleOutline className='mr-3' size='20'></IoAddCircleOutline>}

        {/* {leftIcon !== '' ? <span className={`btn-left-icon d-flex align-item-center`}>
          <img src={leftIcon} />
        </span> : ''} */}
        {label}
        {rightIcon !== '' ? <span className={`btn-right-icon ${rightIcon}`}></span> : ''}
      </button>

    );
  }
}
