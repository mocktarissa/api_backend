var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
var User = require('./models/student_model');
var cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
mongoose.connect('mongodb+srv://admin:admin@cluster0-me4wm.mongodb.net/SchoolDb?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});
/*
var MyModel = mongoose.model('TheRestaurants', new Schema({
    code :Number,
    EmailAdress: String,
    name:String,
    type:String,
    website:String,
    street:String,
    number:Number,
    city:String,
    zip:String,
    country:String,
    phone:String,
    date:Date,
    payment:String,
    description:String,
    scoring:[
        {comment:String,
        score:Number}
    ]

})); */

var MyModel = mongoose.model('ColEtu', );






app.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
	let val= await User.find().then(
		val=>{
            
            

            


res.json(val)
        }
		
	)
	
});


app.post('/push',cors(),(req,res)=>{
    
    console.log(req.body);
    const student = new User(req.body);
student.save().then(() => console.log('saved'));
res.send('Saved the value');
})

app.get("/aggregate",(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
	const aggregate = MyModel.aggregate(
 [ { $project: { name:1, _id:0, average:{$round:[{ $avg: "$scoring.score"},2]} } }, {$addFields: { rated: "$average" }} ],function(err,rest){
																					 if(err){console.log(err)} 
																					});
	res.send(aggregate);
	
})



app.get('/get/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const id=req.params.id;
    console.log(id);
    MyModel.findById(id).then(
		val=>
		res.send(val)
	)
})




app.listen(3000, () => {
	console.log('server listening on port 3000');
});