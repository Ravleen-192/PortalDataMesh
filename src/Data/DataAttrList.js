import DataAnalytics from "../resources/dataanalytics.png";
import AWSDataBrew from "../resources/Arch_AWS-Glue-DataBrew_64.svg";
import Redshift from "../resources/Arch_Amazon-Redshift_64.svg";
import AWSS3 from "../resources/Arch_Amazon-Simple-Storage-Service_64.svg";
import DBRepo from "../resources/database-svgrepo-com.svg";
import Analytics from "../resources/analytics-svgrepo-com.svg";

export const DataAttrList = [
  {
    "name": "DataAnalytics ",
    "image": DataAnalytics,
    "desc": "DataAnalytics",
    "new": false,
    "soon": false,
    "marketing": false,
    "databases": false,
    "sales": true,
    "product": false,
    "finance": false,
    "support": false,
    "engineering": false
    
  },
  {
    "name": "AWSDataBrew ",
    "image": AWSDataBrew,
    "desc": "AWSDataBrew",
    "new": false,
    "soon": false,
    "marketing": true,
    "databases": false,
    "sales": false,
    "product": false,
    "finance": false,
    "support": false,
    "engineering": false
  },
  {
    name: "Redshift",
    image: Redshift,
    desc: "Redshift",
    "new": false,
    "soon": true,
    "marketing": false,
    "databases": false,
    "sales": false,
    "product": false,
    "finance": false,
    "support": true,
    "engineering": false
  },
  {
    "name": "AWS-S3 ",
    "image": AWSS3,
    "desc": "AWS S3",
    "new": true,
    "soon": false,
    "marketing": true,
    "databases": false,
    "sales": false,
    "product": false,
    "finance": false,
    "support": false,
    "engineering": false
  },
  {
    "name": "Database Repo ",
    "image": DBRepo,
    "desc": "DBRepo",
    "new": true,
    "soon": false,
    "marketing": false,
    "databases": false,
    "sales": false,
    "product": false,
    "finance": true,
    "support": false,
    "engineering": false
  },
  {
    "name": "Analytics",
    "image": Analytics,
    "desc": "Analytics",
    "new": false,
    "soon": false,
    "marketing": false,
    "databases": true,
    "sales": false,
    "product": false,
    "finance": false,
    "support": false,
    "engineering": false
  },
];
