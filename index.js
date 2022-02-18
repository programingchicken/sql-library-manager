const express = require("express");
const bodyParser = require('body-parser')
const sequelize = require('./public/db/database');
const indexRoute = require('./public/routes/Book')

const app = express();

//view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }));
app.use(/*this is middle ware*/express.json());


sequelize.authenticate()

//Update database
sequelize.sync({ /*Use to force the sync on database*/ force: true}).then(() => console.log('db is ready')) 

function asyncHandler(cb) {
    return async (req,res,next) => {
        try {

            await cb(req,res,next);

        } catch(err) {

            if (err.name === 'SequelizerValidationError') {            
                res.render('page-not-found', { title: "Page Not Found", message: "Sorry your path was interrupted.", messageTwo: "Click the (HOME) link below." } )
            } else {
                res.render('error', {message: 400, title: "Server Error", messageTwo: "Server didn't load." })
            }

        }
    }

}

app.use('/', asyncHandler(indexRoute))
app.use((req, res) => {
    res.status(404).render('page-not-found',{
        message: 404,
         title: "Page Not Found", 
         messageTwo: "Page didn't load."
    });
    console.log('Could not find route sorry.')
  });
// //Uses then instead of await
// // app.post('/users', (req, res) => {
// //   User.create(req.body).then(() => {
// //     res.send('user is inserted')
// //   })
// // })


// //This uses await instead of .then func
// app.post('/users', async (req, res) => {
//   await User.create(req.body); //first
//     res.send('user is inserted');//after first happens. this is old .then func.
// })

// app.get('/users', async (req, res) => {
//   const users = await User.findAll();
//   res.send(users);
// })

// app.get('/users/:id', async (req, res) => {
//   const reqID = req.params.id;
//   const user = await User.findOne({where: {id: reqID}});
//   res.send(user);
// })

// app.put('/users/:id', async (req, res) => {
//   const reqID = req.params.id;
//   const user = await User.findOne({where: {id: reqID}});
//   user.username = req.body.username;
//   await user.save();//saves a thing in database
//   res.send("updated");
// })

// app.delete('/users/:id', async (req, res) => {
//   const reqID = req.params.id;
//   await User.destroy({where: {id: reqID}});
//   res.send("removed");
// })

app.listen(3000, () => {
  console.log("app is running");
});