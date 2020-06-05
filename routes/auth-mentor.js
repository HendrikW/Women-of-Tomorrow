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



/////// LINKEDIN PATH
router.get('/auth/linkedin',
  passport.authenticate('linkedin')
)

// The request will be redirected to LinkedIn for authentication, so this
// function will not be called.

// the login callback:

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {

  successRedirect: '/mentor-space',
  failureRedirect: '/login'
}));




// router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {

//   failureRedirect: '/login',
//   failureFlash: true,
//   passReqToCallback: true

// }), (req, res) => {
//   if (req.user.role === "Mentor") {
//     res.redirect('/mentor-space')
//     console.log("I am Mentor")
//   }
//   if (req.user.role === "Mentee") {
//     res.redirect('/mentee-space')
//     console.log("I am Mentee")

//   }
// })


////////////////////////// SIGN UP
///////// CREATE EPARATE ROUTES FOR METEE AND MENTOR in auth
// auth/signup_mentor
// auth/signup_mentee

//////// SHOWS YOU THE SIGN UP FORM
router.get('/signup-mentor', (req, res, next) => {
  res.render('auth/signup-mentor');
});

//////// SENDS USER INFO TO THE DATABASE FROM SIGN-UP PAGE
router.post('/signup-mentor', (req, res, next) => {

  const {
    username,
    password,
    name,
    surname
  } = req.body;

  if (!username || !password) {
    res.render('auth/signup-mentor', {
      message: 'Indicate username and password'
    });
    return;
  }

  User.findOne({
    username
  })
    .then(user => {
      if (user !== null) {
        res.render('auth/signup-mentor', {
          message: 'The username already exists'
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass,
        role: "Mentor",
        name,
        surname

      });

      return newUser.save();
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch(error => {
      res.render('auth/signup-mentor', {
        message: 'Something went wrong'
      });
    });
});



///////////////////////LOG IN 

//////// SHOWS YOU THE LOGIN PAGE FORM
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});


// router.get('/login', (req, res, next) => {
//   res.render('auth/login', { message: req.flash('error') });
// });

///////// THESE ARE THE PRIVATE ROUTES BELOW
//////// SAME SHOULD BE SET UP FOR MENTEES

router.get('/mentor-space', ensureLogin.ensureLoggedIn(), (req, res) => {
  User.find({
    role: "Mentee"
  })
    .then(mentees => {
      console.log(mentees)
      res.render('spaces/mentor-space', {
        user: req.user,
        mentees: mentees.slice(0, 5)
      })
    })
})


router.get('/mentor-edit', ensureLogin.ensureLoggedIn(), (req, res) => {



  res.render('spaces/mentor-edit', {

    user: req.user,

  });
})




router.get('/common-space', ensureLogin.ensureLoggedIn(), (req, res) => {

  User.find({ role: 'Mentor' }, ' name surname imgPath _id blog')

    .then(mentorBlog => {

      console.log('blog posts' + mentorBlog)
      res.render('spaces/common-space', {
        user: req.user,

        mentorBlog: mentorBlog
      })// handle user
    })
    .catch(error => {
      // handle error
    });

});



// router.get('/common-space', (req, res, next) => {

//   User.find({ role: 'Mentor' }, ' name surname imgPath blog')
//     .then(mentorBlog => {
//       console.log('blog posts' + mentorBlog)
//       res.render('spaces/common-space', mentorBlog)// handle user
//     })
//     .catch(error => {
//       // handle error
//     });

// });

//////// AFTER LOGIN



// router.post('/login', passport.authenticate

//   ('local', {

//     successRedirect: '/mentor-space',
//     failureRedirect: '/login',
//     failureFlash: true,
//     passReqToCallback: true
//   })

// );



router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
  }), (req, res) => {
    if (req.user.role === "Mentor") {
      res.redirect('/mentor-space')
      console.log("I am Mentor")
    }
    if (req.user.role === "Mentee") {
      res.redirect('/mentee-space')
      console.log("I am Mentee")
    }
  })




router.post('/mentor-edit', uploadCloud.single('photo'), (req, res, next) => {
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
    blog
  } = req.body

  //professional field from the multiple choice
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
    blog
  })
    .then((result) => {
      res.redirect('/mentor-space')
    })
    .catch(() => {
      console.log('error')
    })
})




//---------------------MENTOR VIEW ON MENTEES----------------
router.get('/mentee/:id', (req, res) => {

  let id = req.params.id
  console.log(id)

  User.findById(id)
    .then(user => {
      console.log(user)
      res.render('spaces/mentor-view', { user })
    })
})


// -----------------------COMMON SPACE---------------------------

// router.get('/common-space'), (req, res) => {

//   User.blog.find()
//     .then((blogpost) => {
//       res.render('common-space', { blogpost })
//     })



// }




// routes/index.js

// router.get('/common-space', (req, res, next) => {
//   User.find()
//     .then(blogPosts => {
//       // console.log('Retrieved books from DB:', allTheBooksFromDB);
//       res.render('common-space', { AllBlogs: blogPosts });
//     })
//     .catch(error => {
//       console.log('Error while getting the blogpost', error);
//     })
// });




////////// LOG OUT
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});



module.exports = router;