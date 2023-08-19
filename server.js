const express= require('express')
const app= express()
const mongoose= require('mongoose')
const ShortUrl= require('./models/shortUrl')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb://127.0.0.1/urlShortener',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/',async (req,res)=>{
    // res.send("Hi")
    const shortUrls= await ShortUrl.find();
    res.render('index',{shortUrls: shortUrls})

})
//delete documents 
// const Del = async ()=>{
//    try{
//         const del= await ShortUrl.find();
        
//         if(del.length>0){
//             await ShortUrl.deleteOne({clicks: 1}) ;
//             console.log("Deleted Successfully")
//         }else{
//             console.log("Document not found")
//         }
//    }catch(err){ 
//     console.log("Error deleting document: ",err)
//    }
// }
//  Del()

app.post('/shortUrls', async (req,res)=>{
    const num=1;
    await ShortUrl.create({full: req.body.fullUrl ,})
    
    res.redirect('/')
})

app.get('/:shortUrl', async(req,res)=>{
    const shortUrl= await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl==null){
        return res.sendStatus(404)
    }
    shortUrl.clicks++;
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(3000,()=>console.log("Server started"))