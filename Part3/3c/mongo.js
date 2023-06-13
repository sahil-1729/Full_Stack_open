const { Int32 } = require('bson')
const mongoose = require('mongoose')
if(process.argv.length<5){
    console.log('give password as arguement')
    process.exit(1)
}
const password = process.argv[2]
// for(let i = 0;i<5;i++){
//     console.log(process.argv[i])
// }
const url = `mongodb+srv://sahil_1729:${password}@cluster0.wl8k81y.mongodb.net/PhoneBook?retryWrites=true&w=majority`
mongoose.set(`strictQuery`,false)
mongoose.connect(url)
const contactSchema = new mongoose.Schema({
    name  : String,
    number : Number,
})
const Contact = mongoose.model('Contact',contactSchema)
const person = new Contact({
    name : process.argv[3],
    number : process.argv[4]
})
Contact.find({}).then(
    result => {
        result.forEach(phone => console.log(`${phone.name} ${phone.number}`))
        mongoose.connection.close()
    })
// console.log(person)
person.save().then(response => {
    console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
})