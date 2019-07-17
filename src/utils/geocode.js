const request = require('request')
const geocode = (address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiaGltYW5zaHUxOTk5OSIsImEiOiJjanh6N2ZiZzAwMDNjM2hudnptdWMzMXhzIn0.Lrye6l-sulUMu5F0VDlsEw&limit=1'
    request({
             url:url,
             json:true
         },(error,response)=>{
                if(error) {
                    callback('unable to use location service')
                } else if(response.body.features.length===0)
                {
                    callback('unable to use  this loction')
                }
                else {
                    callback(undefined,{
                        latitude:response.body.features[0].center[1],
                        longitude:response.body.features[0].center[0],
                        location:response.body.features[0].place_name
                    })
                    }
         })
        }
module.exports=geocode