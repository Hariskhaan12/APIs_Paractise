// console.log("Check")

// let fs=require("fs");


// fs.writeFile("file.txt",'THIS IS NEW DATA WRITTEN ON FILE',(err)=>{
//     if(err)
//     {
//         throw err
//     }
//     console.log("written");
   
// })

// fs.appendFile("file.txt"," ONE MORE DATA",(err)=>{
//      if(err)
//     {
//         throw err
//     }
//     console.log("Apended");
// })


// fs.readFile("file.txt",(err,data)=> {
//   console.log(data.toString());
// });

// let http=require("http");
// let PORT=8000;

// let server=http.createServer((req,res)=>{
//     if(req.url==='/')
//     {
    // res.setHeader("Content-Type", "application/json");
//         res.end("THIS IS HOME API")
//     }
//     if(req.url==='/login')
//     {
      // res.setHeader("Content-Type", "application/json");
//         res.end("THIS IS LOGIN API")
//     }
//     res.end(()=>{
//         console.log("server is Running");
//     })
// })

// server.listen(PORT);

//SERVER USING EXPRESS

let Users=[
    {name:"Haris",id:1},
    { name:"Ali",id:2},
    {name:"Rahman",id:3},
]


let PORT = 8000;
let express = require("express");
let app = express();

/// it enable our server to read json data
const urlParser = express.json();
app.use(urlParser);

app.get('/',(req,res)=>{
    res.statusCode=200
    // res.json(Users)
    res.send("Express Home API Hit")
 
})
// when  method is GET 
app.get('/getalluserdata',(req,res)=>{
    res.statusCode=200
    res.json(Users)

})

// when method is get and url== users/:id

app.get('/users/:id',(req,res)=>{
    res.sendStatus=200;
   let newuser=Users.find((usr)=>
    usr.id===parseInt(req.params.id)
   )

   if(!newuser)
   {
       return res.send(`Cannot find the user of ${req.params.id}  id`)
   }
   else{
       res.json(newuser)
   }
    
})


// when method is delete and url === users/:id
app.delete('/users/:id',(req,res)=>{
    res.sendStatus=200;
    let data=Users.filter((usr)=>usr.id!==parseInt(req.params.id))
    Users=data;
    res.send("DATA DELETED")
})

// when method is post and url === /createuser

app.post("/createuser",(req,res)=>{
    if(req.body.name)
    {
        res.statusCode=201
        let id=Math.floor(Math.random()*100)
        Users.push({name:req.body.name,id:id})
        res.send("New User is Added")
    }
    else{
        res.statusCode = 400;
        res.send("Name Field is missing")
    }
})

/// updateUSer

app.patch('/updateuser/:id',(req,res)=>{
    if(req.body.name)
    {
        res.statusCode=200;
        Users.map((val,i )=>{
            if(val.id===parseInt(req.params.id))
            {
                val.name=req.body.name
            }
        })
        res.send("Data is modified")
    }
    else{
        res.send("Name Field is missing")
    }
})


//search user by name
let flag=false

app.get("/getUserByName/:Name",(req,res)=>{
    res.sendStatus=200;
    Users.map((usr)=>{
        if(usr.name==  req.params.Name)
        {
            res.json(usr)
           flag = true;
        }
    })
    if(!flag)
    {
        res.send("Can't Find that user")
    }
})


app.listen(PORT,()=>{
    console.log("Server is Running");
})




