import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const DataProductList = (props) => {
	const dpList = props.dpList
  const title = props.title
  const loading = props.loading
  const setActiveDPId = props.setActiveDPId
  const activeDPId = props.activeDPId


	const handleClick = (key) => () => {
    setActiveDPId(key)
	};
  
	const DPListItems = ( props ) => {
		const dpList = props.dpList
		return (
			<List className='items'>
				{
          dpList.map((item,index) =>{
            return(
            <ListItem className={activeDPId===item['id']?"itemactive":"item" } key={item['id']}>
              <ListItemButton  disableRipple className="dpcatlistbutton" role={undefined} onClick={handleClick(item['id'])} >
                <ListItemText sx={{paddingLeft:0}} primary={item['name']} />
              </ListItemButton>
            </ListItem>
            )
          })
				}
			</List>
		)
	};
	
	function renderList(loading){
    if (loading){ //if still loading return empty
      return(<></>)
    }
    if (dpList.length === 0){ 
      return(<>
        <h5 className="error" sx={{color:'red'}}>None found !!!</h5>	
      </>)
    }
		return(
			<DPListItems dpList={dpList}></DPListItems>
		)
  }
  
	return (
		<>
		<div className="dplist">			
			<h4 className="title"> {title}</h4>	
			{renderList(loading)}
		</div>
		</>
	);
};

export default DataProductList