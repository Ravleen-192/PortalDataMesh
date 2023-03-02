const formatList = [
    ['None',''],
    ['CSV','CSV'],
    ['JSON','JSON'],
    ['Parquet','Parquet']
    ]
const checkTypeList = [
    ['None',''],
    ['Completeness','Completeness'],
    ['Timeliness','Timeliness'],
    ['Validity','Validity'],
    ['Accuracy','Accuracy'],
    ['Consistency','Consistency']
]
export const quality_templates = [
    /* TARGET AWS S3 */
    {
        "id" : 0,
        "Template Name" : "Sample name 1",
        "Template Description":"Sample description 1",
        "DP Format":"CSV",
        "Quality Check Type":"Completeness",        
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 1,        
        "Template Name" : "Sample name 2",
        "Template Description":"Sample description 2",
        "Quality Check Type":"Completeness",
        "DP Format":"CSV",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 2,     
        "Template Name" : "Sample name 3",
        "Template Description":"Sample description 3",
        "Quality Check Type":"Completeness",
        "DP Format":"JSON",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 3,        
        "Template Name" : "Sample name 4",
        "Template Description":"Sample description 4",
        "Quality Check Type":"Completeness",
        "DP Format":"JSON",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 4,        
        "Template Name" : "Sample name 5",
        "Template Description":"Sample description 5",
        "Quality Check Type":"Timeliness",
        "DP Format":"Parquet",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 5,        
        "Template Name" : "Sample name 6",
        "Template Description":"Sample description 6",
        "Quality Check Type":"Timeliness",
        "DP Format":"Parquet",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        

    {
        "id" : 6,        
        "Template Name" : "Sample name 7",
        "Template Description":"Sample description 7",
        "Quality Check Type":"Timeliness",
        "DP Format":"CSV",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 7,        
        "Template Name" : "Sample name 8",
        "Template Description":"Sample description 8",
        "Quality Check Type":"Timeliness",
        "DP Format":"CSV",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 8,        
        "Template Name" : "Sample name 9",
        "Template Description":"Sample description 9",
        "Quality Check Type":"Validity",
        "DP Format":"JSON",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 9,        
        "Template Name" : "Sample name 10",
        "Template Description":"Sample description 10",
        "Quality Check Type":"Validity",
        "DP Format":"JSON",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 10,        
        "Template Name" : "Sample name 11",
        "Template Description":"Sample description 11",
        "Quality Check Type":"Validity",
        "DP Format":"Parquet",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 11,        
        "Template Name" : "Sample name 12",
        "Template Description":"Sample description 12",
        "Quality Check Type":"Validity",
        "DP Format":"Parquet",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },     


    {
        "id" : 12,        
        "Template Name" : "Sample name 13",
        "Template Description":"Sample description 13",
        "Quality Check Type":"Accuracy",
        "DP Format":"",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 13,      
        "Template Name" : "Sample name 14",
        "Template Description":"Sample description 14",
        "Quality Check Type":"Accuracy",
        "DP Format":"",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 14,        
        "Template Name" : "Sample name 15",
        "Template Description":"Sample description 15",
        "Quality Check Type":"Accuracy",
        "DP Format":"JSON",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 15,        
        "Template Name" : "Sample name 16",
        "Template Description":"Sample description 16",
        "Quality Check Type":"Consistency",
        "DP Format":"JSON",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 16,        
        "Template Name" : "Sample name 17",
        "Template Description":"Sample description 17",
        "Quality Check Type":"Consistency",
        "DP Format":"Parquet",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },        
    {
        "id" : 17,        
        "Template Name" : "Sample name 18",
        "Template Description":"Sample description 18",
        "Quality Check Type":"Consistency",
        "DP Format":"Parquet",
        "LinkRefCode":"https://github.com/TriadhAI/MeshPortal",
        "LLinkReadme":"https://github.com/TriadhAI/MeshPortal/blob/main/README.md"
    },         
]

export function get_qcheck_templates_all(){
    return quality_templates

}

export function get_qcheck_templates(format, qtype){
    const templates = get_qcheck_templates_all()
    const result = templates.filter((template)=> {
            return template['Quality Check Type'] == qtype && template['DP Format'] == format
        }
    )
    return result
}

export function get_qcheck_template(id){
    const templates = get_qcheck_templates_all()
    for (let template of templates){
        if (template['id'] === id){
            //console.log(template['id'],id,template)
            return template
        }
    }
}