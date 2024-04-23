const User = require('../models/User.js');
const path = require('path');
// module.exports = (req, res) => {
//     User.create(req.body, (error, user) => {
//         res.redirect('/')
//     })
// }

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        // Handle error
        console.error(error);
        return res.redirect('/auth/register');
        // res.status(500).send('Internal Server Error');
    }
}