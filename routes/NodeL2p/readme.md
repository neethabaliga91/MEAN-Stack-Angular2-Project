# Dependencies
This module requires the `request` module in node. To install just do

```
npm install request
```



# Setup
```javascript
var auth = require("l2pAuth");
auth.setClientID('YOURCLIENTID.app.rwth-aachen.de')
```

# Workflow

The OAuth workflow is the following:

1. Obtaining a user code
2. Obtaining an OAuth access token
3. Calling the API

and optionally

* Refreshing the token
* validating the token
* invalidating the token

## Obtaining a user code

The first thing you will have to do is to let the user authorize your application.
For that you have to provide him with a web page to login and authorize. To do that 
call the `obtainUserCode(callback)` function of l2pAuth. Example:

 ```javascript
auth.obtainUserCode(function(response){console.log(response)})
 ```

The `response` object stores the information sent back by the server and stores the following fields:

* `device_code` : The code of the current device, will be used in later processes
* `user_code` : The user code for verification
* `verification_url` : An URL to pass to the user, so that he can authorize the app
* `expires_in` : Time when the codes will expire
* `interval` : Polling interval to get Auth token

These are accessed in a normal javascript fashion, that is for example `response.device_code`.

## Obtaining OAuth tokens

After the user has authorize the app you are ready to request an OAuth token. This is done using the
`getTokens(device_code, callback)` function. The device code is the one from the previous step. 

The callback works the same as before and is a response object, that in the case of two distinct errors only has the status field with value "error: authorization pending" or "error: slow down" when the user has not yet authorized the app or the pollingwas done too fast respectively.
If there was no error the response object has the following fields:

* `access_token` : The access token used for the API
* `token_type` : The type of the token (unused here but will always be "bearer")
* `expires_in` : When the token will expire
* `refresh_token` : The refresh token to request an new access token

## Accessing the API
Accessing the API is done via the access token. There is a build in method for the course info called `courseinfo(token,callback)` and a general method that takes a custom url as input called `callAPI(token,apiurl,callback)`. 

The response is dependent on the call, please refer to the L2P API documentation for further information.

## Refreshing a token
If the access token timed out, it is possible to request a new one using the refresh token, this is done via `refreshToken(refreshToken, callback)`.

The response will have the following fields:

* `status` : will be "ok"
* `expires_in` : When the access token expires
* `access_token` = The new token
* `token_type` = will again be "bearer"

If the refresh token expired (after 6 month) you will get `"error": "authorization invalid."`

## Token validation

If you wish to see if a token is valid, call the `tokenValidation(accessToken, callback)` function. The response will have the following fields:

* `status`: If the request was "ok"
* `audience`: "Your App Name"
* `scope`: will be "l2p.rwth userinfo.rwth"
* `expires_in`: When it expires
* `state`: The state will be "valid" if the token can still be used

## Token invalidation
If you are sure that you no longer want to use the API for this user you can destroy the access and refresh token using the function `invalidateToken(refreshToken)`. As there will be no response object, there is no callback function.

# Example
Here is an example of the workflow:

```javascript
var auth = require("l2pAuth");
auth.setClientID('YOURCLIENTID.app.rwth-aachen.de')

//obtain user code
auth.obtainUserCode(function(response){
console.log(response.verification_url); //Show this url to your user
device_code = response.device_code; //save device code
})

//...
//Make sure the user has now verified the app
//...

//get access tokens
auth.getTokens(device_code,function(response){
    //save tokens
    acessToken = response.access_token;
    refreshToken = response.refresh_token;

    //validate token and show output
    auth.tokenValidation(acessToken, function(response){
        console.log(response);
    });
});
```
