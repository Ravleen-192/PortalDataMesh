const complianceSourceList = [
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
const complianceStd = [
    ['None',''],
    ['HIPAA','HIPAA'],
    ['GDPR','GDPR'],
    ['CCPA','CCPA'],
    ['PCI DSS','PCI DSS']
    ]
const maskingMethod = [    
    ['None',''],
    ['Encryption','Encryption'],
    ['Substitution','Substitution'],
    ['Shuffling','Shuffling'],
    ['Scrambling','Scrambling'],
    ['Nulling','Nulling']
]

export const compliance_templates = [
    /* TARGET AWS S3 */
    {
        "id" : 0,
        "Template Name" : "Sample name 1",
        "Template Description":"Sample description 1",
        "DP Source":"AWS S3",
        "DP Target":"AWS S3",
        "DP Format":"CSV",
        "Compliance":"HIPAA",
        "Masking Method":"Encryption",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 1,        
        "Template Name" : "Sample name 2",
        "Template Description":"Sample description 2",
        "DP Source":"AWS S3",
        "DP Target":"AWS S3",
        "DP Format":"CSV",
        "Compliance":"HIPAA",
        "Masking Method":"Encryption",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 2,     
        "Template Name" : "Sample name 3",
        "Template Description":"Sample description 3",
        "DP Source":"AWS Redshift",
        "DP Target":"AWS S3",
        "DP Format":"JSON",
        "Compliance":"HIPAA",
        "Masking Method":"Encryption",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 3,        
        "Template Name" : "Sample name 4",
        "Template Description":"Sample description 4",
        "DP Source":"AWS RDS",
        "DP Target":"AWS S3",
        "DP Format":"JSON",
        "Compliance":"HIPAA",
        "Masking Method":"Substitution",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 4,        
        "Template Name" : "Sample name 5",
        "Template Description":"Sample description 5",
        "DP Source":"Oracle",
        "DP Target":"AWS S3",
        "DP Format":"Parquet",
        "Compliance":"GDPR",
        "Masking Method":"Substitution",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 5,        
        "Template Name" : "Sample name 6",
        "Template Description":"Sample description 6",
        "DP Source":"MongoDB",
        "DP Target":"AWS S3",
        "DP Format":"Parquet",
        "Compliance":"GDPR",
        "Masking Method":"Substitution",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        

    /* TARGET Google Storage */
    {
        "id" : 6,        
        "Template Name" : "Sample name 7",
        "Template Description":"Sample description 7",
        "DP Source":"AWS S3",
        "DP Target":"Google Storage",
        "DP Format":"CSV",
        "Compliance":"GDPR",
        "Masking Method":"Shuffling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 7,        
        "Template Name" : "Sample name 8",
        "Template Description":"Sample description 8",
        "DP Source":"AWS S3",
        "DP Target":"Google Storage",
        "DP Format":"CSV",
        "Compliance":"GDPR",
        "Masking Method":"Shuffling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 8,        
        "Template Name" : "Sample name 9",
        "Template Description":"Sample description 9",
        "DP Source":"AWS Redshift",
        "DP Target":"Google Storage",
        "DP Format":"JSON",
        "Compliance":"CCPA",
        "Masking Method":"Shuffling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 9,        
        "Template Name" : "Sample name 10",
        "Template Description":"Sample description 10",
        "DP Source":"AWS RDS",
        "DP Target":"Google Storage",
        "DP Format":"JSON",
        "Compliance":"CCPA",
        "Masking Method":"Shuffling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 10,        
        "Template Name" : "Sample name 11",
        "Template Description":"Sample description 11",
        "DP Source":"Oracle",
        "DP Target":"Google Storage",
        "DP Format":"Parquet",
        "Compliance":"CCPA",
        "Masking Method":"Scrambling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 11,        
        "Template Name" : "Sample name 12",
        "Template Description":"Sample description 12",
        "DP Source":"MongoDB",
        "DP Target":"Google Storage",
        "DP Format":"Parquet",
        "Compliance":"CCPA",
        "Masking Method":"Scrambling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },     


    /* TARGET AZURE Blob */
    {
        "id" : 12,        
        "Template Name" : "Sample name 13",
        "Template Description":"Sample description 13",
        "DP Source":"AWS S3",
        "DP Target":"AZURE Blob",
        "DP Format":"CSV",
        "Compliance":"PCI DSS",
        "Masking Method":"Scrambling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 13,      
        "Template Name" : "Sample name 14",
        "Template Description":"Sample description 14",
        "DP Source":"AWS S3",
        "DP Target":"AZURE Blob",
        "DP Format":"JSON",
        "Compliance":"PCI DSS",
        "Masking Method":"Scrambling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 14,        
        "Template Name" : "Sample name 15",
        "Template Description":"Sample description 15",
        "DP Source":"AWS Redshift",
        "DP Target":"AZURE Blob",
        "DP Format":"JSON",
        "Compliance":"PCI DSS",
        "Masking Method":"Scrambling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 15,        
        "Template Name" : "Sample name 16",
        "Template Description":"Sample description 16",
        "DP Source":"AWS RDS",
        "DP Target":"AZURE Blob",
        "DP Format":"JSON",
        "Compliance":"PCI DSS",
        "Masking Method":"Nulling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 16,        
        "Template Name" : "Sample name 17",
        "Template Description":"Sample description 17",
        "DP Source":"Oracle",
        "DP Target":"AZURE Blob",
        "DP Format":"Parquet",
        "Compliance":"PCI DSS",
        "Masking Method":"Nulling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 17,        
        "Template Name" : "Sample name 18",
        "Template Description":"Sample description 18",
        "DP Source":"MongoDB",
        "DP Target":"AZURE Blob",
        "DP Format":"Parquet",
        "Compliance":"PCI DSS",
        "Masking Method":"Nulling",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },         
]

export function get_compliance_templates_all(){
    return compliance_templates
}

export function get_compliance_templates(source, target){
    const templates = get_compliance_templates_all()
    const result = templates.filter((template)=> {
            return template['DP Source'] == source && template['Compliance'] == target
        }
    )
    return result
}

export function get_compliance_template(id){
    const templates = get_compliance_templates_all()
    for (let template of templates){
        if (template['id'] === id){
            //console.log(template['id'],id,template)
            return template
        }
    }
}