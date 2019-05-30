const path=require('path');
const hbs = require('hbs');
const express = require('express');

//utils
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const port = process.env.PORT || 3000;

//DEFINE PATHS 
const addr = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(addr));


app.get('', (req,res) => {
    res.render('index', {
        title:'Weather App',
        name:'Divesh C.'
    });
});

app.get('/about',(req, res)=>{
    res.render('about', {
        title:'Weather App',
        name:'Divesh C.'
    });
});

app.get('/help',(req, res)=>{
    res.render('help',{
        helpText: "Text",
        title:'Help',
        name:'Divesh C.'
    });
});

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be included in search'
        });
    }
    const addr = req.query.address;
    geocode(addr, (error, {latitude, longitude, location} ={}) =>{
        if(error){
            return res.send({error}); 
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            });
        })
    })
    
});


app.get('/products',(req, res) =>{
    if (!req.query.search){
        //no search term provided
        return res.send({
            error: 'Must provide a search term'
        });

    }
    console.log(req.query);
    res.send({
        products:[]
    });
});

app.get('/help/*', (req, res) =>{
    res.render('404page', {
        title:'404',
        error: 'Help article not found',
        name:'Divesh C.'
    });
})


app.get('*', (req,res)=>{
    res.render('404page', {
        title:'404',
        error: 'Page not found',
        name: 'Divesh C'
    });
});

app.listen(port, () =>{
    console.log('server is up on port ' + port);
});