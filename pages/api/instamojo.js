const axios = require('axios');




export default async function handler(req, res) {
    
    const encodedParams = new URLSearchParams();
    encodedParams.set('grant_type', 'client_credentials');
    encodedParams.set('client_id', '9VsngbDAKmpbnrclITSgWKYvo73HR9VdgFntnm4j');
    encodedParams.set('client_secret', '2tCiW6Igm2xs7gtFP9H1uN9mY98YZ9ym9Pwp9QXqOLkQUHZXcFFGEAg4WEcS9h86a1udN5y60vESkEGJZ8piB4fYyuJsYJ9w9RkSe4PWs2sfAGnJJUj7SFgzDTPTOCax');

    const options = {
        method: 'POST',
        url: 'https://api.instamojo.com/oauth2/token/',
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
            
            
        },
        data: encodedParams,
    };

    // let response  = await axios.request(options);
    // console.log(response.data);
        axios.request(options).then(function (response) {
            response.data
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });

        console.log(res);



}


