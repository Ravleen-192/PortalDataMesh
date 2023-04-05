export const navigations = [
  
  { name: 'Publish', path: 'DPPublish',type:'leaf'},
  { name: 'PlatformServices', path: 'DPPlatformServices' ,type:'tree',
  children: [
    { id: 'PS1',name: 'Add Template', path: 'DPPlatformServices',type:'leaf'},
    { id: 'PS2',name: 'Available Templates', path: 'DPPlatformServices',type:'leaf'},    
  ],},
  { name: 'Governance', path: 'DPGovernance',type:'tree',
  children: [
    { id: 'G1',name: 'Security', path: 'DPGovernance',type:'leaf'},
    { id: 'G2', name: 'Privacy', path: 'DPGovernance',type:'leaf'}, 
    { id: 'G3', name: 'Authentication & Access', path: 'DPGovernance',type:'leaf'},
    {id: 'G4',  name: 'PII Compliance', path: 'DPGovernance',type:'leaf'}, 
    { id: 'G5', name: 'Data Semantics', path: 'DPGovernance',type:'leaf'},
    { id: 'G6',name: 'Metrics', path: 'DPGovernance',type:'leaf'},
  ],
  },
  { name: 'DataProducts', path: 'DataProducts',type:'sub'},
  
];
