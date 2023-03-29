import {Avatar, Card, Fab, Grid,Input, Icon,IconButton,Tooltip, lighten, styled, useTheme,Button, ButtonBase,Select, MenuItem } from '@mui/material';
import {  useState } from 'react';
import { h6 } from './Typography';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import PriceChangeTwoToneIcon from '@mui/icons-material/PriceChangeTwoTone';
import {ReactComponent as ProducerIcon} from '../resources/producer.svg'
import {ReactComponent as ConsumerIcon} from '../resources/consumer.svg'
import {ReactComponent as PIIIcon } from '../resources/pii.svg'
import {ReactComponent as QualityIcon } from '../resources/quality.svg'

const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '4px !important',
  height:'30px',
  verticalAlign:'center',
  alignContent:'center',
  justifyContent: 'space-between',
 
}));
const FilterInput = styled('input')(({ theme }) => ({
  width: '100%',
  border: '0',
  outline: 'none',
  fontSize: '1rem',
  paddingLeft: '20px',
  marginBottom: '2px',
  alignItems:'left',
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&::placeholder': { color: theme.palette.text.primary },
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontSize:'24px',
  fontWeight: '500',
  marginLeft: '12px',
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));

const StatCards2 = (props) => {
  const [publishData,setPublishData] = useState(props.publishData)
  const setquery = props.setquery;
  const setFilter = props.setFilter;
  console.log("publishData",)
  console.log("STATCARDS",props)
  
  const { palette } = useTheme();
  const textError = palette.error.main;
  const textColor = palette.text.primary;
  const bgError = lighten(palette.error.main, 0.85);
  const handleSearch = (event) =>{
    let value = event.target.value.toLowerCase();
    setquery(value);
    setFilter('');
    console.log("Handle search",value);   
  }
  const handleClick = (event) =>{
   
  }
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox >
          <BackupTableOutlinedIcon />
          <Span textcolor={'grey'}> <h6 color='gray' >{props.Title}</h6>
          </Span>
          </ContentBox>
        </Card>
      </Grid>
      {/*<Grid item xs={12} md={3}>
        <Card elevation={3}  sx={{ p: 2 }}>
          <ContentBox>
          <ButtonBase sx={{ height:50,  marginLeft: '15px' }}>
         <Icon sx={{ color: textColor }}>search</Icon>
        <FilterInput type="text" placeholder="Search" autoFocus onChange={(event) =>handleSearch(event)}/>
        <Tooltip title="View Details" placement="top">
              <IconButton onClick={handleClick}>
                <Icon>close</Icon>
              </IconButton>
            </Tooltip>
        </ButtonBase>
          </ContentBox>
         
        </Card>
  </Grid>*/}
      <Grid item xs={12} md={9}>
        <Card elevation={3}  sx={{ p: 2 }}>
          <ContentBox>
          <ButtonBase sx={{ width:'30%',fontSize:'16px',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}>
         <SearchOutlinedIcon sx={{ color: '#0D9F98' }}/>
        <FilterInput type="text" placeholder="Search for Data Source" autoFocus onChange={(event) =>handleSearch(event)}/>
        
        </ButtonBase>
         
 
        {/*  <Input type="text" sx={{ width:'30%',fontSize:'16px',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} maxlength="256" data-search="true" name="search-2" data-name="Search 2" placeholder="Search data source connectors" id="search-2" />
        <Select xs={12} md={4} sx={{ width:'30%', fontSize:'16px', boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="DataSource">
        <MenuItem value="DataSource"><h6>DataSource</h6></MenuItem>
          <MenuItem value="Dest1"><Avatar src='/assets/images/awsicons/redshift1.png' /><h6>Redshift</h6></MenuItem>
          <MenuItem value="Dest2"><Avatar src='/assets/images/awsicons/Curated1.jpg' /><h6>S3</h6></MenuItem>
</Select>*/}
        <Select xs={12} md={4} onChange={(e) => {
      setFilter(e.target.value); setquery("");
       }} sx={{ width:'30%',fontSize:'16px',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="UseCase">
       <MenuItem value="UseCase"><h6>UseCase</h6></MenuItem>
           <MenuItem color = 'green' value="marketing"><StorefrontTwoToneIcon /><h6>Marketing</h6></MenuItem>
          <MenuItem color = 'red' value="finance"><PriceChangeTwoToneIcon /><h6>Finance</h6></MenuItem>
        </Select>
        
        <Select xs={12} md={4}  onChange={(e) => {
      setFilter(e.target.value);setquery("");
       }} sx={{ width:'30%',fontSize:'16px',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="View:All">
          <MenuItem value="View:All"><h6>View:All</h6></MenuItem>
          <MenuItem value="new"><h6>Recently Added</h6></MenuItem>
          <MenuItem value="soon"><h6>Coming Soon</h6></MenuItem>
        </Select>
          </ContentBox>
        </Card>
      </Grid>
    
     
    </Grid>
  );
};

export default StatCards2;
