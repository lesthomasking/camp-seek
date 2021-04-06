const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '5fac45165ee82803e437118b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dkkc9lqig/image/upload/v1605212784/YelpCamp/yyf08r7pnimfmhcpwmea.jpg',
                    filename: 'YelpCamp/yyf08r7pnimfmhcpwmea'
                },
                {
                    url: 'https://res.cloudinary.com/dkkc9lqig/image/upload/v1605212784/YelpCamp/vufrafe5jbii4cqzsfzu.jpg',
                    filename: 'vufrafe5jbii4cqzsfzu'
                },
                {
                    url: 'https://res.cloudinary.com/dkkc9lqig/image/upload/v1605212782/YelpCamp/n4oqm2ve41c5dyiog80w.jpg',
                    filename: 'YelpCamp/n4oqm2ve41c5dyiog80w'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})