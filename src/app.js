const path=require('path')
const express = require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs=require('hbs')
//express is a function!!
const app=express()
      
//define path for express config
const pathdir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partial')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(pathdir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'himanshu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'himanshu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'himanshu',
        text:'help page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide an address'
        })
    }
geocode(req.query.address,(error, {latitude,longitude,location}={})=> {
     if(req.query.address===undefined) {
       return  res.send({
           error:'please provide location'})
     }
     if(error) {
         return res.send({
             error:'error'})
     }
  forecast(latitude,longitude, (error, foredata) => {
     if(error) {
         return res.send({
             error:'error'})
     }    
     res.send({
         location,
         forecast:foredata,
         address:req.query.address
     })
  })
  })

})
app.get('/products',(req,res)=>{
   if(!req.query.search) {
       return res.send({
           error:'you must provide an search string'
       })

   }
    res.send({
            products:[ ]
    })
})
app.get('/help/*',(req,res)=>{
res.render('error',{
    title:'wrong page',
    text:'help article not found',
    name:'himanshu'
})
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:' 404',
        text:'page not found',
        name:'himanshu'
    })
})
app.listen(3000,()=>{
    console.log('started succes')
})