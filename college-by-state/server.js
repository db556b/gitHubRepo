const express = require('express')
const app = express()
const PORT =  process.env.PORT || 8000
const cors = require('cors')

app.use(cors())
 app.get('/', (req,res) => {
     res.sendFile(__dirname + '/index.html')
 })


const stateObj = {
    'alabama' :  {
        1 : `Air University`,
        2 : `Alabama A&M University`,
        3 : `Alabama State University`,
        4 : `Athens State University`,
        5 : `Auburn University`,
        6 : `Auburn University at Montgomery`,
        7 : `Birmingham-Southern College`,
        8 : `Concordia College-Selma`,
        9 : `Faulkner University`,
        10 : `Huntingdon College`,
        11 : `Jacksonville State University`,
        12 : `Judson College`,
        13 : `Miles College`,
        14 : `Oakwood College`,
        15 : `Samford University`,
        16 : `Southeastern Bible College`,
        17 : `Southern Christian University`,
        18 : `Spring Hill College`,
        19 : `Stillman College`,
        20 : `Talladega College`,
        21 : `Troy State University`,
        22 : `Tuskegee University`,
        23 : `United States Sports Academy`,
        24 : `University of Alabama System`,
        25 : `University of Mobile`,
        26 : `University of Montevallo`,
        27 : `University of North Alabama`,
        28 : `University of South Alabama`,
        29 : `University of West Alabama` },

    'alaska' : {
        1 : `Alaska Bible College`,
        2 : `Alaska Pacific University`,
        3 : `Sheldon Jackson College`,
        4 : `University of Alaska System`,
    },
    'unknown' : {
        1 : "Request unknown"
    }
}

app.get('/api/:state', (req,res) => {
    const state = req.params.state.toLowerCase()
    if (stateObj[state]){
        res.json(stateObj[state])
    } else {
        res.json(stateObj[`unknown`])
    }
})


app.listen(  PORT, function () {
    console.log('server is running...')
})