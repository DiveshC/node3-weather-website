const request = require('request');

const forecast = (lat, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/691a1e4b3535f1932e33d89f5302f5f5/'+lat+','+longitude+'?units=si';
    request({ url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if(body.error){
            callback('unable to find location', undefined);
        }else{
            const data = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain';
            callback(undefined, data);
        }
    })
    
}

module.exports = forecast;