interface CharSet {
   [index: string]: string; 
}

let charset: CharSet = {
    'a':
`
   xx   
  xxxx  
 xx  xx 
xxxxxxxx
xx    xx
`,
'b':
`
xxxxxxx 
xx    xx
xxxxxxx 
xx    xx
xxxxxxxx
`,
'c':
`
xxxxxxxx
xx      
xx      
xx      
xxxxxxxx
`,
'd':
`
xxxxxx  
xx    xx
xx    xx
xx    xx
xxxxxx  
`,
'e':
`
xxxxxxxx
xx      
xxxxxxxx
xx      
xxxxxxxx
`,
'f':
`
xxxxxxxx
xx      
xxxxxxxx
xx      
xx       
`,
'g':
`
xxxxxxxx
xxxxxxxx
xxxxxxxx
xxxxxxxx
xxxxxxxx
`,
'block':
`
xxxxxxxx
xxxxxxxx
xxxxxxxx
xxxxxxxx
xxxxxxxx
`,
};

export {charset};