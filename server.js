var  express = require('express');
var  bodyparser= require('body-parser');
var  app = express();
var path = require('path');
var  mongojs=require('mongojs');
var db=mongojs('sudanDB',['contact']);
var dbs=mongojs('sudanDB',['user']);
var  session=require('express-session')
var  port= 1994;


app.use(express.static(__dirname + "/view"));
app.use(bodyparser.json());
app.use(session({
    secret: 'mysecrt',
    name:'username',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));



app.get('/',function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})


app.get('/contact' , function (req ,res) {
    console.log('I reciver')

db.contact.find(function (err , docs) {
    res.json(docs);
});
});

app.post('/contact' , function (req , res) {
    db.contact.insert(req.body,function (err,doc) {
        res.json(doc);

    });
});

app.delete('/contact/:id',function (req , res ) {
    var id=req.params.id;

    db.contact.remove({_id: mongojs.ObjectId(id)},function (err,doc) {
       res.json(doc);
    });

});

app.get('/contact/:id',function (req , res ) {
    var id=req.params.id;

    db.contact.findOne({_id: mongojs.ObjectId(id)},function (err,doc) {
        res.json(doc);
    });

});
app.put('/contact/:id',function (req , res) {
    var id=req.params.id;
    db.contact.findAndModify({
    query :{_id:mongojs.ObjectId(id)},
        update:{$set:{
                name:req.body.name ,
                phone:req.body.phone ,
                job:req.body.job ,
                location:req.body.location
            }} ,
        new : true} , function (err , doc) {
        res.json(doc)
    }
    )


});
app.use(bodyparser.urlencoded({ extended: false }));
app.post('/login' ,function (req , res) {
    var name = req.body.user;
    dbs.user.findOne({name: name} ,function (err,doc) {

       if (!doc){
           res.redirect('cont.html')
       }
       else {
           var sessData = req.session;
           sessData.someAttribute = name;
           res.redirect('contact.html');



       }
    });
});
app.post('/newuser' , function (req , res) {
    dbs.user.insert(req.body,function (err,doc) {
        if (!doc) {

            res.send("mapay error ")
        }
            else{
                res.redirect('index.html')

            }


    });
});
app.listen(port);
console.log("running  ... on  port 1994")