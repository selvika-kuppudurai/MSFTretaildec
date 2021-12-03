import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './navigationformanagestyle.scss';
import Dropdowntabs from '../../components/dropdowntabs';
import Usermanage from '../../pages/usermanage';
import Approvals from '../../components/Approvals'
import Responsivetabs from '../../components/responsiveapprovals'
import Responsivetabsfordropdown from '../responsivedropdowntab';
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
    marginTop: '10px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Navigationformanage() {
  console.log(window.innerWidth)

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs className="tabdesign"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          // orientation="vertical"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab  label="Approvals" {...a11yProps(0)} />
          <Tab  label="Dropdowns" {...a11yProps(1)} />
          <Tab  label="Manage User" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {window.innerWidth > 400 ? <Approvals/> :<Responsivetabs/>}
     
      </TabPanel>
      <TabPanel value={value} index={1}>
      {window.innerWidth > 400 ? <Dropdowntabs/> :<Responsivetabsfordropdown/>}
      
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Usermanage/>
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