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
                            callback( undefined,`It is currently ${response.body.currently.temperature} degree out. There ia a ${response.body.currently.precipProbability}% chance of rain`)
                         }
                   })
}
module.exports=forecast