import '../Stylecss.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from "react";
import { getCategories, getArcheTypeIcon } from '../Data/ReadTableData';
import DPCard from './DPCard'

const CreateCard = (props) => {
  const cardInfo = props.cardInfo
  const activeDp = props.activeDp
  const setActiveDp = props.setActiveDp
	const activeView = props.activeView
  const setActiveView = props.setActiveView
  console.log("CreateCard cardInfo",cardInfo )
  console.log("CreateCard activeDp",activeDp )
  console.log("CreateCard activeView",activeView )

  return (
    <Grid item lg={3} md={4} sm={6 }xs={12} key={cardInfo["Id"]}>
      <div className="dpcard"> 
        <DPCard 
          image={cardInfo["Icon"]} 
          description={cardInfo["Name"]} 
          id={cardInfo["Id"]}
          rating={cardInfo["Rating"]}
          activeDp={activeDp} setActiveDp={setActiveDp}
          activeView={activeView} setActiveView={setActiveView}>
        </DPCard>
      </div>
    </Grid>
  )     
}

const DPCardsView = (props) => {
	const checked = props.checked;
	const dpList = props.dpList
  //////////
  const dpSearchList = props.dpSearchList
  const setDpSearchList = props.setDpSearchList  
  /////////////////
  const activeDp = props.activeDp
  const setActiveDp = props.setActiveDp
	const activeView = props.activeView
  const setActiveView = props.setActiveView
  ///////////////////
  const [cardsInfoList, setCardsInfoList] = useState([])
  //////////////////
	const [dpCardsInfoList, setDpCardsInfoList] = useState([])

  const CreateCards = ( props ) => { 
    console.log("CreateCards dpCardsInfoList",dpCardsInfoList )
    if (dpCardsInfoList){
      console.log("CreateCards Could not come hee???????")
		return(
		Object.keys(dpCardsInfoList).map((archetype, list) =>{
      console.log("CreateCards archetype",archetype )
			return dpCardsInfoList[archetype].map((cardInfo) =>(
				<CreateCard cardInfo = {cardInfo} activeDp={activeDp} setActiveDp={setActiveDp}
        activeView={activeView} setActiveView={setActiveView} key={cardInfo['Id']}/>
			))
		})
		)
  }
   
  
  };
  
  function makeGroupedCardList(){
    var cardInfoList = []
    const catagories = getCategories()
    console.log("makeGroupedCardList   dpSearchList",dpSearchList)
    dpSearchList?.forEach(dp =>{ 
      console.log("makeGroupedCardList   dp",dp)
     
      var cardInfo = {
                      "Id":dp["Id"],
                      "Icon":getArcheTypeIcon(dp["Archetype"],dp["Subtype"]), 
                      "Name":dp['Name'],
                      "Id":dp['Id'],
                      "Rating":0
                    }
                    if(cardInfoList[dp["Archetype"]]){ //if the key exists push to append
                      cardInfoList[dp["Archetype"]].push(cardInfo)
              
                    } else{ //else assign
                      cardInfoList[dp["Archetype"]] = [cardInfo]
                    }
                    //cardInfoList.push(cardInfo)
    })
    dpList?.forEach(dp =>{ 
      const index = catagories.findIndex( cat => cat['Archetype'] === dp["Archetype"])
      //check if this category is on in UI else don't create card
      if ( checked.findIndex( check => check == index) == -1){
        return
      }
     
      var cardInfo = {
                      "Id":dp["Id"],
                      "Icon":getArcheTypeIcon(dp["Archetype"],dp["Subtype"]), 
                      "Name":dp['Name'],
                      "Id":dp['Id'],
                      "Rating":0
                    }
      if(cardInfoList[dp["Archetype"]]){ //if the key exists push to append
        cardInfoList[dp["Archetype"]].push(cardInfo)

      } else{ //else assign
        cardInfoList[dp["Archetype"]] = [cardInfo]
      }
    })
    console.log("makeGroupedCardList cardInfoList", cardInfoList)
		setDpCardsInfoList(cardInfoList)
  }
  useEffect(() => {
    
    makeGroupedCardList()
  }, [checked]);

  function makeCardList(){
    var cardsInfoList = []
    dpSearchList.forEach(dp =>{ 
      var cardInfo = {
                      "Id":dp["Id"],
                      "Icon":getArcheTypeIcon(dp["Archetype"],dp["Subtype"]), 
                      "Name":dp['Name'],
                      "Id":dp['Id'],
                      "Rating":0
                    }
                    cardsInfoList.push(cardInfo)
    })
    console.log("makeCardList cardsInfoList",cardsInfoList )
    
		setCardsInfoList(cardsInfoList)
  }
  useEffect(() => {
    console.log("useeffect dpSearchList",dpSearchList )
    makeGroupedCardList()
  }, [dpSearchList]);
	//useEffect(() => {
  //}, [dpCards]);

  return (
    <>
      <div className="dpgridview">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {CreateCards()}
          </Grid>
        </Box>
      </div>
    </>    
  );
};



export {DPCardsView};


