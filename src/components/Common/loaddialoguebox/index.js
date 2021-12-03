

import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './dialogueboxstyle.scss'
export class DialogueboxLoading extends Component {
  render() {
    const {
        opendialogue=true,
        handleCancel=false
        } = this.props;



    return (
     
<Dialog className="dialogueboxvalues" open={opendialogue} onClose={handleCancel} aria-labelledby="form-dialog-title">
                    {/* <DialogTitle id="form-dialog-title">Add Execution Tier</DialogTitle> */}
                    <DialogContent>
                      Fetching Data...
                    </DialogContent>
                    
                </Dialog>
               
    );
  }
}

