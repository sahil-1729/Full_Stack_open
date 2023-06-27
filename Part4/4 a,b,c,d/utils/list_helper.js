var _ = require('lodash')
const {info} = require('./logger')

const dummy = (array) => {
    return 1;
}
const totalLikes = (list) => {
    function cal(initial,val) { 
        return initial+val.likes
    }
    const likes = list.reduce(cal,0)
    return likes
}
const favorite = (list) => {
    function calculate(initial,val){
        return initial>val ? initial : val.likes
    }
    const max = list.reduce(calculate,0)
    info(`The max number of likes`,max)
    const result = list.filter(val=>val.likes===max)
    info(`Here's the result`,result)
    return result
}
const mostBlog = (list) => {
    const justName = list.map(val => val.author)
    const names = _.countBy(justName,)
    info(`List of names`,names)
    const maxBlog = _.reduce(names,function(result,value,key){
        result = value > result ? value : result
        return result
    },0)
    info(`This is the result`,maxBlog)

    const theAuthor = _.reduce(names,function(result,value,key){
        info(value,maxBlog)
        const resObj = (maxBlog === value) ? {author : key, blogs : value} : result 
        info(resObj)
        return resObj
    },{})

    // const theAuthor = _.find(names,val => val === result)
    info(`The final author with max blogs`,theAuthor,typeof theAuthor)

    return theAuthor
}
const mostLikes = (list) => {
    const nameAuthor = _.map(list,(val) => {
        return {
            author : val.author,
            likes : val.likes
        }
    })
    const finalArray = nameAuthor.reduce((total,modify) => {
        const sign = _.find(total,function(value){
            // info(value.author,` `,modify.author)
            return value.author === modify.author
        })
        info(`sign is ${sign} ${typeof sign}`)
        const flag = (sign === undefined) ? true : false
        // info(`flag ${flag} modify ${modify.author} ${modify.likes}`)
        // info(total)
        if(flag){
            const obj = {
                author : modify.author,
                likes : modify.likes
            }
            total = total.concat(obj)
            return total
            // total.push(obj)                                                                         
        }else{
            _.forEach(total,function(finalObj){
                if(finalObj.author === modify.author){
                    finalObj.likes = finalObj.likes + modify.likes
                }
            })
            // info(`added likes of saved author`)
            return total
        }
    },[])

    info(`The array `,finalArray, ` `,typeof finalArray)
    const mostLikedAuthorCount = finalArray.reduce((max,val) => {
        return max > val.likes ? max : val.likes
    },0)
    const mostLikedAuthorObj = finalArray.find(val=>{
        return val.likes === mostLikedAuthorCount
    })
    info(mostLikedAuthorObj)
    return mostLikedAuthorObj
}


module.exports = {
    dummy,
    totalLikes,
    favorite,
    mostBlog,
    mostLikes
}