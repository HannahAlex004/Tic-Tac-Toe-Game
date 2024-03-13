const express=require("express")
const app=express()
const fs = require("fs")
const path=require("path")
const https=require("https")
const Server=require("socket.io")

const privateKey = fs.readFileSync('server.key', 'utf8'); //server.key is the private key
const certificate = fs.readFileSync('server.crt', 'utf8'); //server.crt is the crt certificate
const credentials = { key: ____________, cert: __________, passphrase: '_______' };//_________ should be replaced with your respective certificate names

const server = https.createServer(credentials, app); // Create HTTPS server
const io = Server(server);

app.use(express.static(path.resolve("")))

let arr=[]
let playingArray=[]

io.on("connection",(socket)=>{

    socket.on("find",(e)=>{

        if(e.name!=null){

            arr.push(e.name)

            if(arr.length>=2){
                let p1obj={
                    p1name:arr[0],
                    p1value:"X",
                    p1move:""
                }
                let p2obj={
                    p2name:arr[1],
                    p2value:"O",
                    p2move:""
                }

                let obj={
                    p1:p1obj,
                    p2:p2obj,
                    sum:1
                }
                playingArray.push(obj)

                arr.splice(0,2)

                io.emit("find",{allPlayers:playingArray})

            }

        }

    })

    socket.on("playing",(e)=>{
        if(e.value=="X"){
            let objToChange=playingArray.find(obj=>obj.p1.p1name===e.name)

            objToChange.p1.p1move=e.id
            objToChange.sum++
        }
        else if(e.value=="O"){
            let objToChange=playingArray.find(obj=>obj.p2.p2name===e.name)

            objToChange.p2.p2move=e.id
            objToChange.sum++
        }

        io.emit("playing",{allPlayers:playingArray})

    })

    socket.on("gameOver",(e)=>{
        playingArray=playingArray.filter(obj=>obj.p1.p1name!==e.name)
        console.log(playingArray)
        console.log("lol")
    })
    

})




app.get("/",(req,res)=>{
    return res.sendFile("index.html")
})

server.listen(4000,() => { 
    console.log("Server running on port 4000") 
});
