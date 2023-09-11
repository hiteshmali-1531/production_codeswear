const axios = require('axios');




export default async function handler(req, res) {

    const encodedParams = new URLSearchParams();
    encodedParams.set('allow_repeated_payments', 'false');
    encodedParams.set('send_email', 'false');
    encodedParams.set('amount', '10');
    encodedParams.set('purpose', 'hiteshmali');

    const options = {
        method: 'POST',
        url: 'https://api.instamojo.com/v2/payment_requests/',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer iMmZLkhweBrPzYom2krLpAlVNZuxKDXIDarH_cUa8I8.fI4E2dZSbIR9XnmeBUAxpPmOWrHUPWBspBKJUanUY3I',
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: encodedParams,
    };

    axios
        .request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.json(error)
        });
        // res.send("hii")


}