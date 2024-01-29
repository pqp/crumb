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
xx      
xx  xxxx
xx    xx
xxxxxxxx
`,
'h':
`
xx    xx
xx    xx
xxxxxxxx
xx    xx
xx    xx
`,
'i':
`
xxxxxxxx
   xx   
   xx   
   xx   
xxxxxxxx
`,
'j':
`
xxxxxxxx
     xx 
     xx 
xx   xx 
xxxxxxx 
`,
'k':
`
xx    xx
xx   xx 
xxxxxx  
xx   xx 
xx    xx
`,
'l':
`
xx      
xx      
xx      
xx      
xxxxxxxx
`,
'm':
`
xx    xx
xxx  xxx
x  xx  x
x  xx  x
x  xx  x
`,
'n':
`
xx    xx
xxx   xx
xx x  xx
xx  x xx
xx   xxx
`,
'o':
`
xxxxxxxx
xx    xx
xx    xx
xx    xx
xxxxxxxx
`,
'p':
`
xxxxxxxx
x     xx
x     xx
xxxxxxxx
xx      
`,
'q':
`
xxxxxxxx
xx    xx
xxxxxxxx
   xxx  
     xxx
`,
'r':
`
xxxxxxxx
x     xx
xxxxxxxx
xx  xx  
xx  xxxx
`,
's':
`
xxxxxxxx
xx      
xxxxxxxx
      xx
xxxxxxxx
`,
't':
`
xxxxxxxx
   xx   
   xx   
   xx   
   xx   
`,
'u':
`
xx    xx
xx    xx
xx    xx
xx    xx
xxxxxxxx
`,
'v':
`
x      x
xx    xx
 xx  xx 
  xxxx  
   xx   
`,
'w':
`
x  xx  x
x  xx  x
x  xx  x
x  xx  x
xxxxxxxx
`,
'x':
`
xx    xx
  x  x  
   xx   
  x  x  
xx    xx
`,
'y':
`
xx    xx
 xx  xx 
  xxxx  
   xx   
   xx   
`,
'z':
`
xxxxxxxx
     xx 
    xx  
  xx    
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