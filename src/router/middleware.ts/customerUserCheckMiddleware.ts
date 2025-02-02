import jwt = require('jsonwebtoken');

export const generateToken = ((payload: any)=>{
    return  jwt.sign(payload, 'jsonwebtoken');
});

export const verifyToken = ((req: any, res: any, next: any)=>{
    const authorization = req.header('authorization');
    if(authorization && authorization.split('')[0] === 'Bearer'){
        if (!authorization) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        console.log(authorization.split(' ')[1]);
        console.log('coming here yes');
        jwt.verify(authorization.split('')[1], 'jsonwebtoken', { ignoreExpiration: true }, (err, decode)=>{
            if(err){
                return res.json({message: 'UnAuthorized'});
            }
            req.user = decode;
            next();
        });
    } 
});