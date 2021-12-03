import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FixtureManage from '../fixturesManage';
import StatusManage from '../StatusManage';
import LanguageManage from '../LanguageManage';
import ExcutionTierManage from '../ExecutiontierManage';
import FixedselectionManage from '../Fixedselection';
// import "react-tabs/style/react-tabs.css";

import './style.scss';

export default function Dropdowntabs() {
  return (
    <div className="App">
      <Tabs className="react-tabs d-lg-flex d-sm-flex col-lg-12 col-sm-12 mt-4 tab__style">
        <TabList className="react-tabs__tab-list d-lg-flex d-sm-flex col-lg-2 col-sm-4">
          <Tab>
            <p>Fixture</p>
          </Tab>
          <Tab>
            <p>Status</p>
          </Tab>
          <Tab>
            <p>Graphics Language</p>
          </Tab>
          <Tab>
            <p>Execution Tier</p>
          </Tab>
          {/* <Tab>
          
import FcCheckmark from 'react-icons'
            <p>Fixed Selection</p>
          </Tab> */}
        </TabList>
        {/* <div className="react-tabs__tab-panel react-tabs__tab-panel--selected col-10"></div> */}
        <div className="col-sm-8 col-lg-10 padding-none">
        <TabPanel >
          <div className="panel-content">
            <FixtureManage />
          </div>
        </TabPanel>
        <TabPanel >
          <div className="panel-content">
            <StatusManage />
          </div>
        </TabPanel>
        <TabPanel >
          <div className="panel-content">
            <LanguageManage />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <ExcutionTierManage />
          </div>
        </TabPanel>
        </div>
        {/* <TabPanel>
          <div className="panel-content">
          <FixedselectionManage/>
          </div>
        </TabPanel> */}
     
      </Tabs>
    </div>
  );
}


