//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const fs = require('fs');
const csvWriter = require('csv-write-stream');
const csv = require('csv-parser');

// const { spawn } = require('child_process');
// const pythonProcess = spawn('python', ['C:/Users/Vijay/OneDrive/Desktop/TraverCity-using Node/py file/pyFile.py']);

const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/authentication');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var user_id = "643b693f7fd0fb4fd24d42d7"
var preferences = [1,2,3,4,5]

const userSchema = {


  email: {
    type: String,
    required: true,
    // unique: true  // Add a unique index to the `email` property
  },
  password: {
    type: String,
    required: true
  }

}

const User = new mongoose.model("User",userSchema);




app.get("/",function(req,res){
  res.render("home",{home_strating_content: homeStartingContent});
})

// pythonProcess.stdout.on('data', (data) => {
//   op = String(data)
//   console.log(op);
// });

// pythonProcess.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// pythonProcess.on('exit', (code) => {
//   console.log(`Python process exited with code ${code}`);
// });

// handle the form submission
app.post('/submit', (req, res) => {

  timestamp = "########"
  // create a CSV writer
  const writer = csvWriter({
    headers: ['userId', 'placeId', 'rating','timestamp'],
    sendHeaders: false,
  });

  // get the user input from the request body
  const { userId, placeId, rating } = req.body;

  // write the user input to the CSV file
  writer.pipe(fs.createWriteStream('C:/Users/Vijay/OneDrive/Desktop/TraverCity-using Node/py file/ratings.csv', { flags: 'a' }));
  writer.write({ userId, placeId, rating, timestamp });
  writer.end();

  // send a response to the client
  res.send('Data saved to CSV file');
});


//


app.get("/contact",function(req,res){
  res.render("contact",{contact_content: contactContent})
})

app.get("/login",function(req,res){
  res.render("login")
})

app.get("/register",function(req,res){
  res.render("register")
})

app.get("/index",function(req,res){
  res.render("index")
})

app.get("/destination",function(req,res){
  var test_value_1 = "vijay here";
  const myVariable = "Hello, world!";
  // res.render("destination") , { test_value_1: test }
  res.render('destination', {myVariable: myVariable});
})

app.get("/destination-single",function(req,res){
  res.render("destination-single")
})

app.get("/newq",function(req,res){
  res.render("newq")
})

app.get("/questionnaire",function(req,res){
  res.render("questionnaire")
})

app.get("/signup",function(req,res){
  res.render("signup")
})

app.get("/single",function(req,res){
  res.render("single")
})

app.get("/user_home",function(req,res){
  res.render("user_home")
})

app.get("/user_login",function(req,res){
  res.render("user_login")
})

app.get("/user_signup",function(req,res){
  res.render("user_signup")
})

app.get("/unsuccessful",function(req,res){
  res.render("unsuccessful")
})

app.get("/appreciate-rating",function(req,res){
  res.render("appreciate-rating")
})

const cities = []
fs.createReadStream('C:/Users/Vijay/OneDrive/Desktop/TraverCity-using Node/py file/cities.csv')
  .pipe(csv())
  .on('data', (data) => {
    // Change 'Column Name' to the actual name of the column you want to extract
    cities.push(data['city']);
  })
  .on('end', () => {
    console.log(cities);
  });
app.get("/rate",function(req,res){
  // var column_values = [];
  // var test = ['vj','vky','bhavani']
  // test.push('papa','mummy')
  // var i = 0;
  // // Read the CSV file and extract the desired column
  // fs.createReadStream('C:/Users/vhajjar/Desktop/Vijay/PROJECT/TraverCity-using Node/py file/cities.csv')
  //   .pipe(csv())
  //   .on('data', (row) => {
  //     column_values.push(row.city.toString());
  //     console.log(row.city)
  //     const cityy = row.city
  //     console.log("city : "+cityy)
  //     console.log(i)
  //     i++
  //     //console.log(typeof(row.city));
  //   })
  //   .on('end', () => {
  //     // Pass the column data to the EJS template for rendering
  //     // res.render('rate', { column_values });
  //   });
  //   console.log(column_values);
  //   console.log(test);


  //



  //



  //

  res.render("rate",{cities: cities})
})

app.post("/register",function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  })
    if(success){
      console.log(success);
    }
    res.render("welcome")

})

app.post('/login',function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}).then(function(foundUser){
    if(foundUser){
      console.log(foundUser);
      if(foundUser.password === password){
        res.send("G00D")
      }
      else{
        res.send("BAD")
      }
    }

  })
})


app.post('/user_login',function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}).then(function(foundUser){
    if(foundUser){
      console.log(foundUser);
      if(foundUser.password === password){
        res.render("user_home")
        user_id = foundUser._id.toString();
        console.log(user_id)
      }
      else{
        res.render("unsuccessful")
      }
    }

  })
})

app.post("/user_signup",function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  })
  newUser.save().then(function(success){
    if(success){
      res.render("user_home")

      User.findOne({email: newUser.email}).then(function(foundUser){
        if(foundUser){
          console.log(foundUser);
          if(foundUser.password === newUser.password){
            user_id = foundUser._id.toString();
            console.log(user_id)
          }
        }
      })
    } else{
      res.send("unsuccessfull")
    }
  })
})

// to get the output for this form you need to sign in first
app.post('/questionnaire', (req, res) => {
  preferences = [req.body.interests,req.body.companion,req.body.season,req.body.age,req.body.budget]
  preferences.forEach(function(value){
    console.log(value)
  })

  //console.log(preferences[4])
  console.log(req.body);
  //res.send(user_id)

  // create a CSV writer
  const writer = csvWriter({
    headers: ['user_id','interests', 'companion', 'season','age','budget'],
    sendHeaders: false,
  });

  // get the user input from the request body
  const {interests,companion,season,age,budget } = req.body;

  // write the user input to the CSV file
  writer.pipe(fs.createWriteStream('C:/Users/Vijay/OneDrive/Desktop/TraverCity-using Node/py file/questionnaire.csv', { flags: 'a' }));
  writer.write({ user_id,interests,companion,season,age,budget });
  writer.end();
  //
  // // send a response to the client
  // res.send('Data saved to CSV file');

  var test_value_1 = "vijay here";
  const myVariable = "Hello, world!";
  // res.render("destination") , { test_value_1: test }
  res.render('destination', {preferences: preferences});
  // res.render("destination",);



});


app.post("/rate",function(req,res){
 var pcity = req.body.city;
 var prating = req.body.rating;
 console.log(pcity);
 console.log(prating);
 res.render("appreciate-rating")
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
