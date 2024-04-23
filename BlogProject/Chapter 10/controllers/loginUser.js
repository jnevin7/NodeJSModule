const bcrypt = require('bcrypt')
const User = require('../models/User')
module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                // Store user session, will talk about it later
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
            }
        } else {
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).send('An error occurred while processing the request');
    }
};
// module.exports = (req, res) => {
//     const { username, password } = req.body;
//     User.findOne({ username: username }, (error, user) => {
//         if (user) {
//             bcrypt.compare(password, user.password, (error, same) => {
//                 if (same) { // if passwords match
//                     // store user session, will talk about it later
//                     res.redirect('/')
//                 }
//                 else {
//                     res.redirect('/auth/login')
//                 }
//             })
//         }
//         else {
//             res.redirect('/auth/login')
//         }
//     })
// }

