
const mongoose = require('mongoose');

const User = require('../models/user-model')

mongoose.connect(`mongodb://localhost/project2`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


users = [

    {
        // Log-in Data
        username: rut,
        password: bb,
        linkedinID: String,
        //Personal Data
        name: 'Ruta',
        surname: 'Zem',
        age: {}, // Date of birth would be better 
        country: 'Germany',
        city: 'Berlin',
        phone: {},
        email: 'rr@gmail.com',
        avatarUrl: {
            type: String,
            default: ''
        }, // TDB Default Image
        //Professional Profile
        bioDescription: 'Hi Everyone! My Name is Ruta. I am passionate about human-centred design and tech. I love ',

        blog: 'What is a blossom without a mountain, curated space that opens up to welcome a small living thing. Like a mountain that is always open to be guarded. Textured, rough, dusty, in snow. Like a blossom, softening with the night, and in the morning. Turning around, with the whole earth, turning in spirals, across the planets and stars. ',

        professionalField: 'Web-development',

        position: {
        },
        _followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        network: {
            type: Number
        },
        role: 'Mentor',

        imgName: { type: String },
        imgPath: { type: String }
    }



]


User.create(users).then(() => {
    console.log(`Created users ${users.body} `);
    mongoose.connection.close();
});
