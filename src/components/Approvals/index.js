import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Pendingtab from '../../components/Common/pendingtab'
import Activitytab from '../../components/Common/Activity'
// import "react-tabs/style/react-tabs.css";

import './approvalsdesign.scss';

// tabs inside the approvals
export default function Approvals() {
  return (
    
    <div className="">
      <Tabs className="react-tabs col-lg-12 col-sm-12 mt-4 d-lg-flex d-sm-flex tab__style">

      
          <TabList className="react-tabs__tab-list react-tabs__tab-list__approvals d-lg-flex d-sm-flex col-lg-1 col-sm-2">
            <Tab>
              <p>Pending</p>
            </Tab>
            <Tab>
              <p>Activity</p>
            </Tab>
          </TabList>
      


        <div className="col-lg-11 col-sm-10 padding-none">
          <TabPanel>
            <div>
              <Pendingtab />
            </div>
          </TabPanel>

          <TabPanel>
            <div>
              <Activitytab />
            </div>

          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}


