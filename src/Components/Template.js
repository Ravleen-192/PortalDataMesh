import React, {useState} from "react";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { DataAttrList } from "../Data/DataAttrList";
import TemplateItem from "./TemplateItem";
import "../Template.css";
import StatCards from '../Components/StatCards';
const CssTextField = styled(TextField)({
  '& label': {
    color: '#5C504D',
  },
  '& label.Mui-focused': {
    color: '#5C504D',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#5C504D',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'darkgray',
    },
    '&:hover fieldset': {
      borderColor: '#5C504D',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5C504D',
    },
  },
});
function Template(props) {
  const [publishData,setPublishData] = useState(props.publishData)
  const[query,setquery] =useState('');
  const [filter, setFilter] = useState();
  const filtered = DataAttrList.filter(function(obj, index){
    return obj[filter]=='true';
  });
  console.log("filtered",filtered);
  
  return (
    <div className="template">
       <div className="form">        
        <div className="fields">
        
      <h1 className="templateTitle">{props.Title}</h1>
      <CssTextField  value={publishData['Template Name']} className='field' size='small' label="Name" />
      <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description" />                  
 
      <StatCards filter = {filter} setFilter = {setFilter} query = {query} setquery={setquery}  publishData={publishData} setPublishData={setPublishData} Title={publishData['Title']}/>
      <div className="templateList">  
        {query?DataAttrList.filter(DataSource=>DataSource.name.toLowerCase().includes(query)).map((templateItem, key) => {
          console.log("templateItem",)
          return (
            <TemplateItem
              key={key}
              image={templateItem.image}
              name={templateItem.name}
              
            />
          );
        }):filter?DataAttrList.filter(a => a[filter] === true).map((templateItem, key) => {
          console.log("templateItem",templateItem)
          return (
            <TemplateItem
              key={key}
              image={templateItem.image}
              name={templateItem.name}
              price={templateItem.price}
            />
          );
        }):DataAttrList.map((templateItem, key) => {
          console.log("templateItem",)
          return (
            <TemplateItem
              key={key}
              image={templateItem.image}
              name={templateItem.name}
              price={templateItem.price}
            />
          );
        })}
      </div>
    
      </div>
      </div>
      </div>
  );
}

export default Template;
