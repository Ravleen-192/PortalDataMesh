import ChurnImg from '../resources/Arch_AWS-Glue-DataBrew_64.svg';
import PreSalesImg from '../resources/Arch_Amazon-Redshift_64.svg';
import  SalesImg from '../resources/Arch_Amazon-Simple-Storage-Service_64.svg';
import  ServiceDeliveryImg from '../resources/dataproduct_bg.svg';
import  ServiceAssuranceImg from '../resources/database-svgrepo-com.svg';
import  CustomerAccountsImg from '../resources/customer-accounts.png';
import  IVRUsageImg from '../resources/ivr.png';
import  CallCenterUsageImg from '../resources/callcenter.jpg';
import  WebUsageImg from '../resources/webusage.jpg';
import  MobileUsageImg from '../resources/mobileuse.png';
import  SocialMediaImg from '../resources/social.png';
import  TelemetryImg from '../resources/telemetry.jpg';
const producerSourceList = [
['None',''],
['AWS S3','AWS S3'],
['AWS Redshift','AWS Redshift'],
['AWS RDS','AWS RDS'],
['Oracle','Oracle'],
['SQL Server','SQL Server'],
['MongoDB','MongoDB'],
['Google Storage','Google Storage'],
['AZURE Blob','AZURE Blob']
]
const producerTargetList = [
['None',''],
['AWS S3','AWS S3'],
['Google Storage','Google Storage'],
['AZURE Blob','AZURE Blob']
]


export const producer_templates = [
    /* TARGET AWS S3 */
    {
        "id" : 0,
        "Template Name" : "AWSS3-AWSS3",
        "Template Description":"AWSS3-AWSS3",
        "DP Source":"AWS S3",
        "DP Target":"AWS S3",
        "DP Format":"CSV",
        "Icon":ChurnImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 1,        
        "Template Name" : "S3-S3",
        "Template Description":"S3-S3",
        "DP Source":"AWS S3",
        "DP Target":"AWS S3",
        "DP Format":"CSV",
        "Icon":PreSalesImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 2,     
        "Template Name": "REDSHIFT-S3",
        "Template Description":"SREDSHIFT-S3",
        "DP Source":"AWS Redshift",
        "DP Target":"AWS S3",
        "DP Format":"JSON",
        "Icon":SalesImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 3,        
        "Template Name" : "RDS-S3",
        "Template Description":"AWSRDS-S3",
        "DP Source":"AWS RDS",
        "DP Target":"AWS S3",
        "DP Format":"JSON",
        "Icon":ServiceDeliveryImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 4,        
        "Template Name" : "ORACLE_S3",
        "Template Description":"Oracle to S3",
        "DP Source":"Oracle",
        "DP Target":"AWS S3",
        "DP Format":"Parquet",
        "Icon":ServiceAssuranceImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 5,        
        "Template Name" : "MongoDB-S3",
        "Template Description":"MongoDB to S3",
        "DP Source":"MongoDB",
        "DP Target":"AWS S3",
        "DP Format":"Parquet",
        "Icon":CallCenterUsageImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        

    /* TARGET Google Storage */
    {
        "id" : 6,        
        "Template Name" : "S3GoogleStorage",
        "Template Description":"S3 to google Storage",
        "DP Source":"AWS S3",
        "DP Target":"Google Storage",
        "DP Format":"CSV",
        "Icon":ServiceDeliveryImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 7,        
        "Template Name" : "S3toGoogleStorage",
        "Template Description":"S3 to GoogleStorage",
        "DP Source":"AWS S3",
        "DP Target":"Google Storage",
        "DP Format":"CSV",
        "Icon":CustomerAccountsImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 8,        
        "Template Name" : "Redshift-GoogleStorage",
        "Template Description":"Readshift to google Storage",
        "DP Source":"AWS Redshift",
        "DP Target":"Google Storage",
        "DP Format":"JSON",
        "Icon":ServiceDeliveryImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 9,        
        "Template Name" : "RDS-GoogleStorage",
        "Template Description":"RDS to Google Storage",
        "DP Source":"AWS RDS",
        "DP Target":"Google Storage",
        "DP Format":"JSON",
        "Icon":WebUsageImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 10,        
        "Template Name" : "Oracle-GoogleStorage",
        "Template Description":"Oracle To Google Storage",
        "DP Source":"Oracle",
        "DP Target":"Google Storage",
        "DP Format":"Parquet",
        "Icon":CustomerAccountsImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 11,        
        "Template Name" : "MongoDB-GoogleStorage",
        "Template Description":"MongoDB to Google Storage",
        "DP Source":"MongoDB",
        "DP Target":"Google Storage",
        "DP Format":"Parquet",
        "Icon":MobileUsageImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },     


    /* TARGET AZURE Blob */
    {
        "id" : 12,        
        "Template Name" : "S3-AZUREBlob",
        "Template Description":"target AZURE Blob",
        "DP Source":"AWS S3",
        "DP Target":"AZURE Blob",
        "DP Format":"",
        "Icon":WebUsageImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 13,      
        "Template Name" : "S3ToAzureBlob",
        "Template Description":"S3 to Azure Blob",
        "DP Source":"AWS S3",
        "DP Target":"AZURE Blob",
        "DP Format":"",
        "Icon":TelemetryImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 14,        
        "Template Name" : "Redshift-AzureBlob",
        "Template Description":"RedShift to Azure Blob",
        "DP Source":"AWS Redshift",
        "DP Target":"AZURE Blob",
        "DP Format":"JSON",
        "Icon":IVRUsageImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 15,        
        "Template Name" : "RDSToAzureBlob",
        "Template Description":"RDS to Azure Blob",
        "DP Source":"AWS RDS",
        "DP Target":"AZURE Blob",
        "DP Format":"JSON",
        "Icon":TelemetryImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 16,        
        "Template Name" : "Oracle-AZURE Blob",
        "Template Description":"Oracle to AZURE Blob",
        "DP Source":"Oracle",
        "DP Target":"AZURE Blob",
        "DP Format":"Parquet",
        "Icon":ServiceDeliveryImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 17,        
        "Template Name" : "MongoDB-Azure Blob",
        "Template Description":"MongoDB-Azure Blob",
        "DP Source":"MongoDB",
        "DP Target":"AZURE Blob",
        "DP Format":"Parquet",
        "Icon":TelemetryImg,
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },         
]

export function get_producer_templates_all(){
    return producer_templates
}

export function get_producer_templates(source, target){
    const templates = get_producer_templates_all()
    const result = templates.filter((template)=> {
            return template['DP Source'] == source && template['DP Target'] == target
        }
    )
    return result
}

export function get_producer_template(id){
    const templates = get_producer_templates_all()
    for (let template of templates){
        if (template['id'] === id){
            //console.log(template['id'],id,template)
            return template
        }
    }
}