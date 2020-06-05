// routes/auth-routes.js
const express = require('express');
const router = express.Router();
// Avatar upload related item
const uploadCloud = require('./cloudinary');


require('dotenv').config()


// User model
const User = require('../models/user-model');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

// Axios
const axios = require('axios')

// Var needed for jobs slice 
let x = 0
let y = 5

/////// LINKEDIN PATH
router.get('/auth/linkedin',
    passport.authenticate('linkedin')
)

// The request will be redirected to LinkedIn for authentication, so this
// function will not be called.

// the login callback:

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

//////// SHOWS YOU THE SIGN UP FORM

router.get(`/signup-mentee`, (req, res, next) => {
    res.render(`auth/signup-mentee`)
})

//////// SENDS USER INFO TO THE DATABASE

router.post('/signup-mentee', (req, res, next) => {
    const {
        username,
        password,
        name,
        surname
    } = req.body;

    //let name = req.body.name

    // res.render(`name: ${name}`)

    console.log("hello from signup mentee")

    if (!username || !password) {
        res.render('auth/signup-mentee', {
            message: 'Indicate username and password'
        });
        return;
    }

    User.findOne({
            username
        })
        .then(user => {
            if (user !== null) {
                res.render('auth/signup-mentee', {
                    message: 'The username already exists'
                });
                return;
            }

            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);

            console.log({
                username,
                password: hashPass,
                role: 'Mentee',
                name,
                surname
            })

            const newUser = new User({
                username,
                password: hashPass,
                role: 'Mentee',
                name,
                surname
            });

            //
            newUser.save().then(() => {
                res.redirect('/login');
            })
        })

    // .catch(error => {
    //     res.render('auth/signup-mentee', {
    //         message: 'Something went wrong'
    //     });
    // });
});

//----------------------Personal Information Form----------------------




///////////////////////LOG IN 

router.get('/login', (req, res, next) => {
    res.render('auth/login', {
        message: req.flash('error')
    });
});

router.get('/mentee-space', ensureLogin.ensureLoggedIn(), (req, res) => {


    axios
        .get(`http://jobs.github.com/positions.json`)
        .then((responseFromAPI) => {


            User.find({
                    role: "Mentor"
                })

                .then(mentors => {
                    //AFter finding all the mentors tou could apply whatever filter you want with some javascript(checkout array.filter in google)

                    let randomMentors = mentors.slice(0, 5)
                    //HERE you could write some javascript that filters 3 random mentors (or even choose some condition)
                    let followers_number = req.user._followers.length.toString()
                    console.log(`followers `, followers_number)
                    res.render('spaces/mentee-space', {
                        user: req.user,
                        jobs: responseFromAPI.data.slice(x, y),
                        followers: followers_number,

                        //When you have random Mentors saved you can send them here
                        mentors: randomMentors

                    })

                    //console.log(responseFromAPI.data)



                })
            x += 5
            y += 5
        })

})


router.get('/mentee-edit', ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render('spaces/mentee-edit', {
        user: req.user
    });
});

//RUTA'S CODE GOES HERE
router.get('/common-space', ensureLogin.ensureLoggedIn(), (req, res) => {
})

//---------------CRUD EDIT--------------------

router.get('/mentee-edit', (req, res) => {
    res.render('spaces/mentee-edit')
})

router.post('/mentee-edit', uploadCloud.single('photo'), (req, res) => {
    const {
        name,
        surname,
        username,
        country,
        city,
        phone,
        email,
        position,
        professionalField,
        bioDescription,
        blog,
        menteeBlog

    } = req.body

    const imgPath = req.file.url
    User.findByIdAndUpdate(req.user._id, {


        // you're only allowing name,occupation,catchPhrase to be modified
        name,
        surname,
        username,
        position,
        country,
        city,
        phone,
        email,
        professionalField,
        //professional field from the multiple choice
        bioDescription,
        imgPath,
        blog,
        menteeBlog
    })



        .then((result) => {
            res.redirect('/mentee-space')
        })
        .catch(() => {
            console.log('error')
        })

})

//---------------------MENTEE VIEW ON MENTORS----------------
router.get('/mentor/:id', (req, res) => {
    let id = req.params.id
    User.findById(id)
        .then(user => {
            console.log(user)
            res.render('spaces/mentee-view', {
                user
            })
        })
})

router.get('/follow/:id', (req, res) => {
    let id = req.params.id
        // let name = req.params.name
        // let surname = req.params.surname
        // let position = req.params.position
        // let professionalField = req.params.professionalField
        // let email = req.params.email

    User.findByIdAndUpdate(req.user._id, {
            $push: {
                _followers: id,
                // name: name,
                // surname: surname,
                // position: position,
                // professionalField: professionalField,
                // email: email
            }
        })
        .then((result) => {
            res.redirect('/mentee-space')
        })
        .catch(() => {
            console.log('error')
        })
})

router.get('/all-following/:id', ensureLogin.ensureLoggedIn(), (req, res) => {
    
    let id = req.params.id
    User.findById(id)
    // .populate('role').
    // // exec (function(err, user){
    // //     if (err) return handleError(err)
    // //     console.log('The role is', user.role)
    // // })
        .then(user => {
            console.log("This is the USER" + user)
            res.render('spaces/all-following-view', {user: user})
        })
})



////////// LOG OUT
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
});

module.exports = router;