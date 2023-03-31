import ChurnImg from '../resources/churn.png';
import PreSalesImg from '../resources/presales.png';
import  SalesImg from '../resources/sales.png';
import  ServiceDeliveryImg from '../resources/service-delivery.png';
import  ServiceAssuranceImg from '../resources/service-assurance.png';
import  CustomerAccountsImg from '../resources/customer-accounts.png';
import  IVRUsageImg from '../resources/ivr.png';
import  CallCenterUsageImg from '../resources/callcenter.jpg';
import  WebUsageImg from '../resources/webusage.jpg';
import  MobileUsageImg from '../resources/mobileuse.png';
import  SocialMediaImg from '../resources/social.png';
import  TelemetryImg from '../resources/telemetry.jpg';
import  ChatImg from '../resources/chat.png';
import  StoreTransactionImg from '../resources/storetran.png';
import  BroadbandAdoptionImg from '../resources/broadband.png';
import  InfrastructureImg from '../resources/infra_small.png';

const DPCategories11 = [
      {"Archetype":"Customer Retention & Churn",
        "Subtypes":[{"Subtype":"Churn Analysis","Icon":ChurnImg}]
      },
      {"Archetype":"Pre Sales",
        "Subtypes":[{"Subtype":"Pre Sales","Icon":PreSalesImg}]
      },
      {"Archetype":"Sales",
        "Subtypes":[{"Subtype":"Sales","Icon":SalesImg}]
      },
      {"Archetype":"Service Delivery",
        "Subtypes":[{"Subtype":"Service Delivery","Icon":ServiceDeliveryImg}]
      },
      {"Archetype":"Service Assurance",
        "Subtypes":[{"Subtype":"Service Assurances","Icon":ServiceAssuranceImg}]
      },
      {"Archetype":"Customers",
        "Subtypes":[{"Subtype":"Customer Accounts","Icon":CustomerAccountsImg}]
      },
      {"Archetype":"Customer Service",
        "Subtypes":[{"Subtype":"IVR Usage","Icon":IVRUsageImg},
                    {"Subtype":"Call Center Usage","Icon":CallCenterUsageImg}]
      },
      {"Archetype":"Digital",
        "Subtypes":[{"Subtype":"Web Usage","Icon":WebUsageImg},
                    {"Subtype":"Mobile Usage","Icon":MobileUsageImg},
                    {"Subtype":"Social Media","Icon":SocialMediaImg},
                    {"Subtype":"Telemetry Data","Icon":TelemetryImg},
                    {"Subtype":"Chat","Icon":ChatImg}]
      },
      {"Archetype":"Store",
        "Subtypes":[{"Subtype":"Store Transactions","Icon":StoreTransactionImg}]
      },
      {"Archetype":"Third Party",
        "Subtypes":[{"Subtype":"Broadband Adoption","Icon":BroadbandAdoptionImg},
                    {"Subtype":"Infrastructure","Icon":InfrastructureImg}]
      }
]

const DPCategories = [
  {
    "Archetype": "Customer 360",
    "children": [
      {
        "id":0,
        "Archetype":"Customer Retention & Churn",
        "Subtypes":[{"Subtype":"Churn Analysis","Icon":ChurnImg}]
      },
      {
        "id":1,
        "Archetype":"Pre Sales",
        "Subtypes":[{"Subtype":"Pre Sales","Icon":PreSalesImg}]
      },
      {
        "id":2,"Archetype":"Sales",
        "Subtypes":[{"Subtype":"Sales","Icon":SalesImg}]
      },
      {
        "id":3,"Archetype":"Subscription",
        "Subtypes":[{"Subtype":"Subscription","Icon":SalesImg}]
      },
      {
        "id":4,"Archetype":"Contracts",
        "Subtypes":[{"Subtype":"Contracts","Icon":SalesImg}]
      },

    ],
  },
  {
    "Archetype": "Service Assurance",
    "children": [
      {
        "id":5,
        "Archetype":"Incidents and issues",
      "Subtypes":[{"Subtype":"Incidents and issues","Icon":ChurnImg}]
      },
      {
        
        "id":6,
        "Archetype":"KPIs & SLAs",
        "Subtypes":[{"Subtype":"KPIs & SLAs","Icon":PreSalesImg}]
      }
    ],
  },
  {
    "Archetype": "Service Delivery",
    "children": [
      {
        "id":7,
        "Archetype":"Order provisioning & status",
      "Subtypes":[{"Subtype":"Order provisioning & status","Icon":ChurnImg}]
      },
      {
        "id":8,
        "Archetype":"Order fallouts",
      "Subtypes":[{"Subtype":"Order fallouts","Icon":PreSalesImg}]
      },
      {
        "id":9,
        "Archetype":"Cancellations",
      "Subtypes":[{"Subtype":"Cancellations","Icon":PreSalesImg}]
      }
    ],
  },
  {
    "Archetype": "Omni channel",
    "children": [
      {
        "id":10,
        "Archetype":"Digital (.com & mobile)",
      "Subtypes":[{"Subtype":"Digital (.com & mobile)","Icon":ChurnImg}]
      },
      {
        "id":11,
        "Archetype":"IVR",
      "Subtypes":[{"Subtype":"IVR","Icon":PreSalesImg}]
      },
      {
        "id":12,
        "Archetype":"Contact center",
      "Subtypes":[{"Subtype":"Contact center","Icon":PreSalesImg}]
      },
      {
        "id":13,
        "Archetype":"Social media",
      "Subtypes":[{"Subtype":"Social media","Icon":PreSalesImg}]
      },
      {
        "id":14,
        "Archetype":"Store",
      "Subtypes":[{"Subtype":"Store","Icon":PreSalesImg}]
      }
    ],
  },
  {
    "Archetype": "Billing & Payments",
    "children": [
      {
        "id":15,
        "Archetype":"Billing invoices",
      "Subtypes":[{"Subtype":"Billing invoices","Icon":ChurnImg}]
      },
      {
        "id":16,
        "Archetype":"Payments",
      "Subtypes":[{"Subtype":"Payments","Icon":PreSalesImg}]
      }
    ],
  },
  {
    "Archetype": "External",
    "children": [
      {
        "id":17,
        "Archetype":"Partner data",
      "Subtypes":[{"Subtype":"Partner data","Icon":ChurnImg}]
      }
    ],
  }, {
    "Archetype": "Network Assurance",
    "children": [
      {
        "id":18,
        "Archetype":"Network Assurance",
      "Subtypes":[{"Subtype":"Network Availablity","Icon":BroadbandAdoptionImg}]
      }
    ],
  }
 
 
]
const DPCategoriesold = [
  
    
      {
        "id":0,
        "Archetype":"Customer Retention & Churn",
        "Subtypes":[{"Subtype":"Churn Analysis","Icon":ChurnImg}]
      },
      {
        "id":1,
        "Archetype":"Pre Sales",
        "Subtypes":[{"Subtype":"Pre Sales","Icon":PreSalesImg}]
      },
      {
        "id":2,"Archetype":"Sales",
        "Subtypes":[{"Subtype":"Sales","Icon":SalesImg}]
      },
      {
        "id":3,"Archetype":"Subscription",
        "Subtypes":[{"Subtype":"Subscription","Icon":SalesImg}]
      },
      {
        "id":4,"Archetype":"Contracts",
        "Subtypes":[{"Subtype":"Contracts","Icon":SalesImg}]
      },

   
      {
        "id":5,
        "Archetype":"Incidents and issues",
      "Subtypes":[{"Subtype":"Incidents and issues","Icon":ChurnImg}]
      },
      {
        
        "id":6,
        "Archetype":"KPIs & SLAs",
        "Subtypes":[{"Subtype":"KPIs & SLAs","Icon":PreSalesImg}]
      },
   
      {
        "id":7,
        "Archetype":"Order provisioning & status",
      "Subtypes":[{"Subtype":"Order provisioning & status","Icon":ChurnImg}]
      },
      {
        "id":8,
        "Archetype":"Order fallouts",
      "Subtypes":[{"Subtype":"Order fallouts","Icon":PreSalesImg}]
      },
      {
        "id":9,
        "Archetype":"Cancellations",
      "Subtypes":[{"Subtype":"Cancellations","Icon":PreSalesImg}]
      },
    
      {
        "id":10,
        "Archetype":"Digital (.com & mobile)",
      "Subtypes":[{"Subtype":"Digital (.com & mobile)","Icon":ChurnImg}]
      },
      {
        "id":11,
        "Archetype":"IVR",
      "Subtypes":[{"Subtype":"IVR","Icon":PreSalesImg}]
      },
      {
        "id":12,
        "Archetype":"Contact center",
      "Subtypes":[{"Subtype":"Contact center","Icon":PreSalesImg}]
      },
      {
        "id":13,
        "Archetype":"Social media",
      "Subtypes":[{"Subtype":"Social media","Icon":PreSalesImg}]
      },
      {
        "id":14,
        "Archetype":"Store",
      "Subtypes":[{"Subtype":"Store","Icon":PreSalesImg}]
      },
  
      {
        "id":15,
        "Archetype":"Billing invoices",
      "Subtypes":[{"Subtype":"Billing invoices","Icon":ChurnImg}]
      },
      {
        "id":16,
        "Archetype":"Payments",
      "Subtypes":[{"Subtype":"Payments","Icon":PreSalesImg}]
      },

      {
        "id":17,
        "Archetype":"Partner data",
      "Subtypes":[{"Subtype":"Partner data","Icon":ChurnImg}]
      }
   
]
export function getCategories(){
  return DPCategoriesold
}

export function getArchetypeList(){
  var archetypeList = []
  DPCategories.forEach(cat =>{
    archetypeList.push({"Archetype":cat["Archetype"], "children":cat["children"]})
  })
  return archetypeList
}

export function getArcheTypeIcon(archetype, subtype){
  
  if( archetype === ''){  //return default icon if archetype is empty
    return ChurnImg
  }

  const categories = getCategories()
  //console.log(archetype, subtype)
  const index = categories.findIndex( cat => cat['Archetype'] === archetype)
  //console.log("index = ",index)
  if (index === -1){  //just in case if there is nothing return default image
    return ChurnImg;    
  }
  //if subtype is empty return the available subtype's icon from the categories list
  if (subtype === ''){
    return categories[index]["Subtypes"][0]["Icon"]
  }
  const category = categories[index]
  const subindex = category["Subtypes"].findIndex( cat => cat['Subtype'] === subtype)
  //console.log("sub index = ",subindex)
  if (subindex === -1){  //just in case if there is nothing return default image
    return category["Subtypes"][0]["Icon"];    
  } else{
    return category["Subtypes"][subindex]["Icon"]
  }
 
}

export function getPreviewData(dpData){
   /* material ui doesn't allow to insert column wise
   hence we need to transform the row wise data to column wise
   ref : https://stackoverflow.com/questions/63646812/how-can-i-add-data-column-wise-in-materialui-table-in-reactjs */
   
   const rawPreviewData = dpData["Tables"][0]["Preview"]
   //console.log("raw",rawPreviewData)
   const firstkey = Object.keys(rawPreviewData)[0];
   //console.log("firstkey",firstkey)
   const numberOfRows = rawPreviewData[firstkey].length
   const numberOfColumns = Object.keys(rawPreviewData).length
   //console.log('number of rows = ',numberOfRows)
   //console.log('number of columns = ',numberOfColumns)
   
   let previewData = [];
   for (let j = 0; j < numberOfRows; j++) {
      let previewRow = [];
      for (let i = 0; i < numberOfColumns; i++) {
         const columnKey = Object.keys(rawPreviewData)[i]
         //console.log(columnKey)
         previewRow.push(rawPreviewData[columnKey][j]);
      }
      previewData.push(previewRow);
   }

   return previewData
}