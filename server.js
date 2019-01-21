const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date()
});

hbs.registerHelper('scremIt',(text)=>{
  return text.toUpperCase();
});
app.set('view engine','hbs');

app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log+'\n',(err)=>{
  if(err){
    console.log('Unable to append to server');
  }
});
next();
});
//
// app.use((req,res,next)=>{
//   res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
  // res.send('<h1> Hello Express</h1>');
   // res.send({
   //   name: 'mandeep',
   //   likes:[
   //     'Biking',
   //     'Cricketing'
   //   ]
   // });
   res.render('home.hbs',{
     pageTitle: 'Home page',
     // cuurentYear : new Date(),
     welcomeMsg : 'Welcome to my website'
   });
});
app.get('/about',(req,res)=>{
  // res.send('About page');
  res.render('about.hbs',{
    pageTitle:'About Page',
    // cuurentYear: new Date(),
    // msg:'Welcome to website '
  });
});
app.get('/bad',(req,res)=>{
  res.send({
  errorMessage : 'Unable to handle request'
  });
});

app.listen(3000);
console.log('Server is up on port 3000');
