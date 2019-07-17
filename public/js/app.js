
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
  response.json().then((data)=>{
        console.log(data)
  })  
}) 
console.log('javascript client side') 
const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1 ')
const messageTwo=document.querySelector('#message-2')    

weatherForm.addEventListener('submit',(e)=>{
 const location=search.value
    e.preventDefault()
    console.log(location)
    
messageOne.textContent='content will apperar here'
messageTwo.textContent=''
    
fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
         if(data.error)
         {      messageTwo.textContent='error'
                messageOne.textContent=''
                 
         }
         else {           
messageOne.textContent='location:'+data.location
messageTwo.textContent='forecast:'+data.forecast
         }
    })  
  }) 
})