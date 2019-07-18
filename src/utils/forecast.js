const request=require('request')





const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/6af5e9150a5ea5c0149fe539dbcbcfeb/'+latitude+','+longitude
            request({                                                          
                url,
                json:true
                   },(error,response) => {
                    if(error){
                            callback('unable to connect to the internet service')
                            }
                    else if(response.body.error) {
                            callback('unable to find location')
                                                  }
                    else {
                            callback( undefined,`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degree out. high temperature may be ${response.body.daily.data[0].temperatureHigh} low temperature may be ${response.body.daily.data[0].temperatureLow}. There ia a ${response.body.currently.precipProbability}% chance of rain`)
                         }
                   })
}
module.exports=forecast