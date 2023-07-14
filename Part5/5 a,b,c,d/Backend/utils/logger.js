//Handle all the console.log and error parts
const info = (...params) => {
    if(process.env.MONGODB_URI !== 'test'){
    console.log(...params)
    }}
const error = (...params) => {
    if(process.env.MONGODB_URI !== 'test'){
    console.error(...params)        
    }
}

module.exports ={
    info,
    error
}