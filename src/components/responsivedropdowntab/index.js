import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './responsivedropdowntan.scss';

import FixtureManage from '../fixturesManage';
import StatusManage from '../StatusManage';
import LanguageManage from '../LanguageManage';
import ExcutionTierManage from '../ExecutiontierManage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Responsivetabsfordropdown() {
  
//   const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="tabdesignfordropdown">
      <AppBar position="static" color="default">
        <Tabs className="tabdesignforapprovals mt-4"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          // orientation="vertical"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab  label="Fixture" {...a11yProps(0)} />
          <Tab  label="Status" {...a11yProps(1)} />
          <Tab  label="Language" {...a11yProps(2)} />
          <Tab  label="Execution Tier" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <FixtureManage/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <StatusManage/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <LanguageManage/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <ExcutionTierManage/>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
      <FixturesManage data={val}></FixturesManage>
      </TabPanel> */}
      {/* <TabPanel value={value} index={2}>
      <StatusManage data={valforstatusmanage}></StatusManage>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <ExcutionTierManage data={valforstatusmanage}></ExcutionTierManage>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <LanguageManage data={valforstatusmanage}></LanguageManage>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <FixedselectionManage data={valforstatusmanage}></FixedselectionManage>
      </TabPanel> */}
    </div>
  );
}