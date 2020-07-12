var fs = require('fs');

let components = []
const files = fs.readdirSync('../public/music/')
files.forEach(function (item, index) {
    let stat = fs.statSync("../public/music/" + item)
    console.log(stat.isDirectory())
    if (stat.isFile() === true) { 
      components.push(item)
    }    
})


let str = JSON.stringify(components)
 
 fs.writeFile('../json/music.json',str,function(err){
     console.log(err)
})