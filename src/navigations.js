export const navigations = [
  
  { name: 'Publish', path: '/dppublish',type:'leaf'},
  { name: 'PlatformServices', path: '/dpplatformServices' ,type:'tree',
  children: [
    { id: 'PS1',name: 'Add Template', path: '/dpplatformServices',type:'leaf'},
    { id: 'PS2',name: 'Available Templates', path: '/dpplatformServices',type:'leaf'},    
  ],},
  { name: 'Governance', path: '/dpgovernance',type:'tree',
  children: [
    { id: 'G1',name: 'Security', path: '/dpgovernance',type:'leaf'},
    { id: 'G2', name: 'Privacy', path: '/dpgovernance',type:'leaf'}, 
    { id: 'G3', name: 'Authentication & Access', path: '/dpgovernance',type:'leaf'},
    {id: 'G4',  name: 'PII Compliance', path: '/dpgovernance',type:'leaf'}, 
    { id: 'G5', name: 'Data Semantics', path: '/dpgovernance',type:'leaf'},
    { id: 'G6',name: 'Metrics', path: '/dpgovernance',type:'leaf'},
  ],
  },
  { name: 'DataProducts', path: '/dataproducts',type:'sub'},
  
];
