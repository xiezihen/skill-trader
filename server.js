const express =  require('express');
const app = express();
const path= require('path');
const port = process.env.PORT ||4200;

app.use(express.static(__dirname + '/skill-trader/eventApp'))
app.listen(port)
//PathLocationStrategy
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname+'/dist/skill-trader/index.html'));
});
console.log("Listening on port: "+port)
