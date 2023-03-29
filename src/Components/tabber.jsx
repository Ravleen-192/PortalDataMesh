import { Box } from "@mui/material";

import Typography from "@mui/material/Typography";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import  SimpleCard  from './SimpleCard'
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FingerprintTwoToneIcon from "@mui/icons-material/FingerprintTwoTone";
import BarChartTwoToneIcon from "@mui/icons-material/BarChartTwoTone";
import CreditCardOffTwoToneIcon from "@mui/icons-material/CreditCardOffTwoTone";
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PropTypes from "prop-types";
import DonutChart  from "./echarts/Doughnut"
import Pyramid from "./echarts/Pyramid"
import ComparisonChart from './echarts/ComparisonChart';
import ComparisonChart2 from './echarts/ComparisonChart2';
import LineChart from './echarts/LineChart';
import {styled } from '@mui/material';
import PieChart from "./echarts/PieChart";

const Container = styled("div")(({ theme }) => ({
  margin:"20px",
   marginBottom: "30px",
   }
 ));
const scoresAndText = {
  'compliance':{  title:'Compliance score',score:80, remaining:20,  centerText:'80%',color:["#558C12","#DA2F3A"]}
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab
            sx={{ width: "150px", color: '#0D9F98' }}
            icon={<SecurityIcon />}
            label="Security"
          />
          <Tab
            sx={{ width: "150px", color: '#0D9F98' }}
            icon={<VerifiedUserIcon />}
            label="Privacy"
          />
          <Tab
            sx={{ width: "150px", color: '#0D9F98' }}
            icon={<FingerprintTwoToneIcon />}
            label="Authentication and Access"
          />

          <Tab
            sx={{ width: "150px", color: '#0D9F98' }}
            icon={<CreditCardOffTwoToneIcon />}
            label="PII Compliance"
          />
           <Tab
            sx={{ width: "150px", color: '#0D9F98' }}
            icon={<LayersTwoToneIcon />}
            label="Data Semantics"
          />
          <Tab
            sx={{ width: "150px", color: '#0D9F98' }}
            icon={<BarChartTwoToneIcon />}
            label="Metrix"
          />
         
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="">
        <PieChart
          height="500px"
          
        />
      </SimpleCard>

      
    </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Privacy Compliance">
        <Pyramid
          height="500px"
          
        />
      </SimpleCard>

      
    </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Authorization & Access">
        <ComparisonChart2
          height="500px"
          
        />
      </SimpleCard>

      
    </Container>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="PII Compliance">
        <ComparisonChart
          height="500px"
          
        />
      </SimpleCard>

      
    </Container>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Data Semantics">
        <LineChart
          height="500px"
          
        />
      </SimpleCard>

      
    </Container>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Overall Compliance">
      <DonutChart height="500px"/>
      </SimpleCard>

      
    </Container>
          
     
     
      </TabPanel>
    </>
  );
}
