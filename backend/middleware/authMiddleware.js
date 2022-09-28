const cookieParser = require('cookie-parser')
const asyncHandler = require('express-async-handler')
const colors = require('colors');
const bcrypt = require('bcryptjs')
const { User } = require('../models/userModel');

// UUID is an universally unique identifier
// it enables to give to every user an unique id
// this id will be store in a cookie and will be used to identify the user

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


//NOT WORKING
const protect = asyncHandler( async (req, res, next) => {
    const email = req.signedCookies.email
    if (email) {
        const user = await User.findOne({
            where: {
                email: req.signedCookies.email
            }
        })
        if (await bcrypt.compare(req.signedCookies.sessionID, user.sessionID)) {
            req.user = user

            // We don't want people have the hashed password
            req.user.password = null
            next()
        
        } else {
        res.status(401)
        throw new Error('Not authorized, invalid cookie')
        }
        
    }
    if (!email) {
        res.status(401)
        throw new Error('Not authorized, please login')
    }
})

module.exports = {
    generateUUID,
    protect
}