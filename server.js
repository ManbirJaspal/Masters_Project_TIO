const express = require('express');
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var cookieParser = require('cookie-parser');


const app = express();
const port = 8082;

var session = require('express-session');


var hosts = ['http://localhost:3000'].join(', ');

var substrings = ["one", "two", "three", "kill", "i am going to kill", "depression", "I am depressed", "i am going to suicide", "suicide", "kill", "shoot", "shoot myself", "help",
"need help", "dropping out", "dropping out of school", "failing my class", "sexually harassed", "stalker", "bullying"];

const pool = new Pool({
  user: 'sahibjaspal',
  host: 'localhost',
  database: 'tio',
  password: 'msnjaspal',
  port: 5432,
});
pool.connect(function(err){
  if(!err) {
    console.log("Database is connected");
  } else {
    console.log("Error connecting database");
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  next();
});


app.post('/student', createStudent);
app.post('/login', studentLogin);
app.get('/groups', getGroups);
app.post('/groups', createGroup);
app.get('/group', getGroup);
app.put('/group', updateGroup);
app.get('/posts', getPosts);
app.post('/posts' , createPost);
app.get('/post', getPost);
app.put('/post', updatePost);
app.delete('/post', deletePost);
app.get('/comments', getComments);
app.get('/comments', getComments);
app.post('/comments', createComment);
app.post('/chaton', sendMessage);
app.get('/getmessages', getChat);



//*****************************************************************************

//Random Username generator

function haiku(){
  var adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
  "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
  "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
  "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
  "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
  "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
  "wandering", "withered", "wild", "black", "young", "holy", "solitary",
  "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
  "polished", "ancient", "purple", "lively", "nameless"]

  , nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
  "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
  "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
  "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
  "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
  "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
  "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
  "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
  "frog", "smoke", "star"];

  return adjs[Math.floor(Math.random()*(adjs.length-1))]+"_"+nouns[Math.floor(Math.random()*(nouns.length-1))];
}

//*****************************************************************************



//*****************************************************************************


//LOGIN AND REGISTER FUNCTIONS

function createStudent(request, response){
  console.log("inside createStudent()");
  var email = request.body.email,
  password = request.body.password,
  fname = request.body.fname,
  student_a_id = request.body.a_id,
  lname = request.body.lname;

  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {

      bcrypt.hash(password, saltRounds, function(err, hash1) {
        bcrypt.hash(student_a_id, saltRounds, function(err, hash2) {


        db.query('INSERT INTO student (student_email, student_password, student_fname, student_lname, student_a_id) VALUES ($1, $2, $3, $4, $5)', [email, hash1, fname, lname, hash2], (err, table) => {
          done();
          if(err) {
            return response.status(400).send(err);
          }
          else {
            response.status(201).send({message: 'REGISTRATION SUCCESSFULL' });
          }
        })
      }
        );
       });

    }
  })
}

// async function hashPassword(pass) {
//
//   var password = pass;
//
//   const hashedPassword = await new Promise((resolve, reject) => {
//     bcrypt.hash(password, saltRounds, function(err, hash) {
//       if (err) reject(err)
//       resolve(hash)
//     });
//   })
//
//   return hashedPassword
// }

function studentLogin(request, response){
  console.log("inside StudentLogin()");
  var email = request.body.email,
  password = request.body.password,
  mod = request.body.mod;
  // student_a_id = request.body.a_id;


  var query = "";

  if (mod) {
    query = `SELECT * FROM moderators WHERE mod_email=$1`;

  } else {
    query = `SELECT * FROM student WHERE student_email=$1`;
  }

  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query(query, [email], (err, results, fields) => {
        done();
        if(err) {
          return response.status(400).send(err);
        }
        if ( results.length === 0){
          return response.data
        }
        var hash1="";
        // var hash2="";
        if (mod) {
          console.log(results.rows[0]);
          hash1 = results.rows[0]["mod_password"].toString();
          mod = false;
          console.log(hash1);
          bcrypt.compare(password, hash1, function(err, res) {
            console.log(res)
            console.log(JSON.stringify(results.rows));
            response.status(200).send(results.rows);
            console.log(" MOD Login SUCCESSFULL");

          });
        } else {
          hash1 = results.rows[0]["student_password"].toString();
          // hash2 = results.rows[0]["student_a_id"].toString();
          console.log(hash1);
          bcrypt.compare(password, hash1, function(err1, res1) {
            console.log(res1);
            if(res1 == true) {
                console.log("inside login bycrypt res1");

            // bcrypt.compare(student_a_id, hash2, function(err2, res2) {
            //   if(res2 == true) {
                console.log("inside login bycrypt res2");
                console.log(JSON.stringify(results.rows));
                response.status(200).send(results.rows);
                console.log("Login SUCCESSFULL");
            //   }
            //    else {
            //     console.log("Anonymous_id incorrect");
            //   }
            // });
          }  else {
            console.log("Password incorrect");
          }
        });
        }

      })
    }
  })
}



//*****************************************************************************


//POST RELATED FUNCTIONS


function createPost(request,response) {
  console.log("inside createPost");
  console.log(request.body);
  var description = request.body.description,
  group_id = request.body.group_id,
  post_user_id = request.body.user_id,
  title = request.body.title;
  var alert;
  var str;
  str = description
  if (substrings.some(function(v) { return str.indexOf(v) >= 0; })) {
    alert = 'true';

  } if (substrings.some(function(v) { return str.indexOf(v) >= 0; })) {
    alert ='true';
  }
    else {
    alert = null;
  }

  console.log(alert);
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query('INSERT INTO posts (group_id, post_user_id, description, title, alert) VALUES ($1, $2, $3, $4, $5)', [group_id, post_user_id, description, title, alert], (err, results, fields) => {
        done();
        if(err) {
          return response.status(400).send(err);
        }
        else {
          var str;
          str = description
          if (substrings.some(function(v) { return str.indexOf(v) >= 0; })) {
            console.log(JSON.stringify(results.rows));
            response.status(201).send({message: 'Post insert Succesfull', alert: 'alert'});
          }
          else {
            console.log(JSON.stringify(results.rows));
            response.status(201).send({message: 'Post insert Succesfull'});
          }
        }
      })
    }
  })
}

function getPosts (request, response) {
  console.log("inside getPosts");
  const groupId = request.query.groupId;
  console.log(groupId);
  var query =`SELECT * FROM posts join groups on posts.group_id = groups.group_id where posts.group_id=${groupId}`;
  pool.query(query, function(error, results) {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

function getPost( request, response) {
  console.log("inside getPost server.js");
  const post_id = request.query.post_id;
  console.log(post_id);
  var query =`SELECT * FROM posts where post_id=${post_id}`;
  pool.query(query, function(error, results) {
    if(error) {
      throw error;
    }
    console.log((results.rows))
    response.status(200).json(results.rows)
  })
}


function updatePost(request, response){
  console.log("inside upDAtePost server.js");
  var post_id = request.body.post_id,
  title = request.body.title,
  description = request.body.description;

  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query("UPDATE posts SET description=$1, title=$2 where post_id=$3", [description, title, post_id], (err, table) => {
        done();
        if(err) {
          return response.status(400).send(err);
        }
        else {
          response.status(201).send({message: 'UPDATE SUCCESSFULL' });
        }
      })
    }
  })
}



async function deletePost(request,response) {
  console.log("inside deletePost() in server");
  console.log(request.params.post_id);
  var post_id = parseInt(request.params.post_id);
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query(` DELETE FROM posts where post_id=${post_id}`, (err, results, fields) => {
        done();
        if(err) {
          return response.status(400).send(err);
        }
        else {

          response.status(200).send({message: 'Post DELETE Succesfull'});
        }
      })
    }
  })
}


//*****************************************************************************


//GROUP RELATED FUNCTIONS


function getGroups (request, response) {
  console.log("inside getgroups");
  const groupName = request.query.group_name;
  var query = "";

  if (groupName != null) {
    query = `SELECT * FROM groups where group_name=${groupName} ORDER BY group_id ASC`;
  } else {
    query = `SELECT * FROM groups ORDER BY group_id ASC`;
  }
  pool.query(query, function(error, results) {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

function getGroup( request, response) {
  console.log("inside getGroup server.js");
  const group_id = request.query.group_id;
  console.log(group_id);
  var query =`SELECT * FROM groups where group_id=${group_id}`;
  pool.query(query, function(error, results) {
    if(error) {
      throw error;
    }
    console.log((results.rows))
    response.status(200).json(results.rows)
  })
}


function updateGroup(request, response){
  console.log("inside upDAteGroup server.js");
  var group_id = request.body.group_id,
  group_name = request.body.group_name,
  group_description = request.body.group_description;

  console.log(group_id, group_name, group_description);

  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query("UPDATE posts SET group_description=$1, group_name=$2 where group_id=$3", [group_description, group_name, group_id], (err, table) => {
        done();
        if(err) {
          return response.status(400).send(err);
        }
        else {
          response.status(201).send({message: 'UPDATE SUCCESSFULL' });
        }
      })
    }
  })
}

function createGroup(request,response) {
  console.log("inside createGroup");
  console.log(request.body);
  var group_description = request.body.group_description,
  group_user_id = request.body.user_id,
  group_moderator = 23,
  group_name = request.body.title;

  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query('INSERT INTO groups (group_user_id, group_description, group_name, group_moderator) VALUES ($1, $2, $3, $4)', [group_user_id, group_description, group_name, group_moderator], (err, results, fields) => {
        done();
        if(err) {
          return response.status(400).send(err);
        }
        else {
          console.log(JSON.stringify(results.rows));
          response.status(201).send({message: 'Group Insert Succesfull'});
        }
      })
    }
  })
}


//*****************************************************************************


//COMMENT RELATED FUNCTIONS


function getComments (request, response) {
  console.log("inside getComments");
  const post_id = request.query.post_id;
  console.log(post_id);
  var query =`SELECT * FROM comments join posts on comments.post_id = posts.post_id where comments.post_id=${post_id}`;
  pool.query(query, function(error, results) {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

function createComment(request,response) {
  console.log("inside createComment");
  console.log(request.body);
  var comment = request.body.comment,
  post_id = request.body.post_id,
  comment_user_id = request.body.comment_user_id;


  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query('INSERT INTO comments (post_id, comment_user_id, comment) VALUES ($1, $2, $3)', [post_id, comment_user_id, comment], (err, results, fields) => {
        done();
        if(err) {
          return response.status(400).send(err);
        }
        else {
          console.log(JSON.stringify(results.rows));
          response.status(201).send({message: 'Comment insert Succesfull'});
        }
      })
    }
  })
}

//*****************************************************************************


//CHAT RELATED FUNCTIONS


function sendMessage(request,response) {
  console.log("inside ChatOn() in server");
  console.log(request.body);
  var message = request.body.message,
  chat_user_id = request.body.chat_user_id,
  chat_mod_id = request.body.chat_mod_id;
  created_by = request.body.created_by;


  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query('INSERT INTO chats (message, chat_user_id, chat_mod_id, created_by) VALUES ($1, $2, $3, $4)', [message, chat_user_id, chat_mod_id, created_by], (err, results, fields) => {
        done();
        if(err) {
          return response.status(400).send(err);
        }
        else {
          console.log(JSON.stringify(results.rows));
          response.status(201).send({message: 'Message sent Succesfull'});
        }
      })
    }
  })
}

function getChat (request, response) {
  console.log("inside getChat");
  const chat_user_id = request.query.chat_user_id;
  const chat_mod_id = request.query.chat_mod_id;

  console.log(chat_mod_id);



  var query =`SELECT * FROM chats where chat_user_id=$1 and chat_mod_id=$2`;
  pool.query(query, [chat_user_id, chat_mod_id], function(error, results) {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

//*****************************************************************************



app.listen(port);
