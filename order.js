const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/getSheetdata', (req, res) => {


  // res.send("api is working");
  const array = [];
  var count = 1;

//   getting data from sheet
  axios.get("https://sheetdb.io/api/v1/sna0vtf8dqafy")
    .then((resp) => {
      console.log(resp.data.length)
      resp.data.map((response)=> {
        // console.log("response:- ", response.Date_of_Activation);
        var mobile = response.Phone_number;
        var startDate = response.Date_of_Activation
        var amountInvested = response.Amount_Invested
        const interestAmount = response.Profit_after_6_months
        const message = `Be informed that on ${startDate}, your account with Green Lights was credited with MwK ${amountInvested} Your current balance is MwK ${interestAmount}`
         console.log(message);

     //  maytapi section
         setTimeout(function() {

            var data = JSON.stringify({"to_number":`${mobile}`,"type":"text","message":`${message}`});
           var config = {
             method: 'post',
             url: `https://api.maytapi.com/api/05bda7e8-115b-4aa7-a8e6-d28e275bfa10/15376/sendMessage`,
             headers: { 
               'x-maytapi-key': 'b212e4ec-6e20-442d-b386-664574c8a619', 
               'Content-Type': 'application/json', 
               // 'Cookie': '__cfduid=d060dfa5428a6c9c444f6171ecb2e4d3a1610447299'
             },
             data : data
           };
           axios(config)
           .then(function (response) {
             console.log(JSON.stringify(response.data));
           })
          }, 10000*count);
      })
      var count = 0;

     

      res.send(`sent`)
    })
    .catch((err) => {
      console.log("err is:- ", err);
    })

})


module.exports = router;
