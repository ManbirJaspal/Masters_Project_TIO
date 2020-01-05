const express = require('express');
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');

const app = express();
const port = 8082;

var session = require('express-session');
var hosts = ['http://localhost:3000'].join(', ');

var substrings = ["kill", "i am going to kill", "depression", "I am depressed", "i am going to suicide", "suicide", "kill", "shoot", "shoot myself", "help",
"need help", "dropping out", "dropping out of school", "failing my class", "sexually harassed", "stalker", "bullying", "need of help","stalked"];

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
app.post('/send', reportNotification);

//*****************************************************************************
async function reportNotification(request, response){
  // create reusable transporter object using the default SMTP transport
  console.log("inside reportNotification server.js");
  var title = "group number" + request.body.title;
  console.log(title);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
      user: "your_email",
      pass: "your_password"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"anonymous student" <"email"', // sender address
    to: 'your_email', // list of receivers
    subject: 'A Post has been reported on TIO', // Subject line
    text: 'Post has been reported in group number ' + title + ' on TIO', // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("inside error nodemailer");
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

async function alertNotification(PostTitle){
  // create reusable transporter object using the default SMTP transport
  console.log("inside alertNotification server.js");
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
      user: "your_email",
      pass: "your_password"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"anonymous student" <manb.jaspal@gmail.com', // sender address
    to: 'manb.jaspal@gmail.com', // list of receivers
    subject: 'An Alert has been generated on TIO', // Subject line
    text: 'Alert generated on Post with Title: ' + PostTitle + ' on TIO', // plain text body

  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("inside error nodemailer");
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

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


function studentLogin(request, response){
  console.log("inside StudentLogin()");
  var email = request.body.email,
  password = request.body.password,
  mod = request.body.mod;
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
          bcrypt.compare(password, hash1, function(err1, res1) {
            if(res1 == true) {
              console.log(JSON.stringify(results.rows));
              response.status(200).send(results.rows);
              console.log("Login SUCCESSFULL");
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
  var description = request.body.description,
  group_id = request.body.group_id,
  post_user_id = request.body.user_id,
  title = request.body.title;
  var alert;
  var str;
  str = description
  if (substrings.some(function(v) { return str.indexOf(v) >= 0; })) {
    alert = 'true';
    alertNotification(title);
  }
  else {
    alert = null;
  }

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
            response.status(201).send({message: 'Post insert Succesfull', alert: 'alert'});
          }
          else {
            response.status(201).send({message: 'Post insert Succesfull'});
          }
        }
      })
    }
  })
}

function getPosts (request, response) {
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
  const post_id = request.query.post_id;
  var query =`SELECT * FROM posts where post_id=${post_id}`;
  pool.query(query, function(error, results) {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

function updatePost(request, response){
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
  const chat_user_id = request.query.chat_user_id;
  const chat_mod_id = request.query.chat_mod_id;
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
