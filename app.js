const express   = require('express');
const jwt       = require('jsonwebtoken');

const app       = express();

// simple get without token
app.get('/api/simple-get',(req,res)=>{
    res.json({
        message : 'Simple get method'
    })
});

// simple post without token
app.post('/api/simple-post', (req,res)=>{
    res.json({
        message : 'Simple post method'
    })
});

// simple post with token
app.post('/api/simple-post-token', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'mySecretKey', (err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message : 'Simple post with token',
                data
            })
        }
    });
});

// get token (usualy from login)
app.post('/api-login-token', (req,res)=>{
    // Mock data (callback from login)
    const user = {
        id          : 1,
        username    : 'Andika Nugraha',
        email       : 'm.andika.nugraha@gmail.com'
    }
    jwt.sign({user}, 'mySecretKey', {expiresIn:'60s'}, (err,token)=>{
        res.json({
            token
        })
    });
});

// format token
// bearer <access_token>
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        // console.log(bearerHeader);
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
app.listen('5000',()=>{
    console.log('App running on port 5000');
})