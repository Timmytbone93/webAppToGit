var express = require('express');
var {google} = require('googleapis');
var plus = google.plus('v1');
var fs = require('fs');
var config = require('../Config/config');
var User = require('../models/User');
var {generateToken, sendToken, verifyToken} = require('../middleware/token');
var path = require('path');
var rr = require("recursive-readdir");
var nodegit = require('nodegit');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');




var urlBlacklist = "https://github.com/Timmytbone93/blacklist.git";
var urlWhitelist = "https://github.com/Timmytbone93/whitelist.git";
var userName = "Timmytbone93";
var whiteListRepo = process.cwd()+"/whiteListRepo";
var blackListRepo = process.cwd()+"/blackListRepo";

var cloneOptsWhitelist = {
        fetchOpts: {
          callbacks: {
            
            credentials: function(urlWhiteList, userName) {
              return git.Cred.sshKeyNew(
                userName,
                '/Users/Timmytbone93/.ssh/id_rsa.pub',
                '/Users/Timmytbone93/.ssh/id_rsa',
                "git@github.com:Timmytbone93/whitelist.git");
            }
          }
        }
      };


    var  cloneOptsBlacklist = {
        fetchOpts: {
          callbacks: {
            credentials: function(urlBlacklist, userName) {
              return git.Cred.sshKeyNew(
                userName,
                '/Users/Timmytbone93/.ssh/id_rsa.pub',
                '/Users/Timmytbone93/.ssh/id_rsa',
                "git@github.com:Timmytbone93/blacklist.git");
            }
          }
        }
      };
   

var router = express.Router();

router.post('/getWhitelist', function (req, res) {
  
  rimraf(process.cwd()+'/whiteListRepo', function () {
    console.log("Deleted whitelist repo");

   // mkdirp(process.cwd()+'/whiteListRepo', function(err) { 

      nodegit.Clone(urlWhitelist, whiteListRepo, cloneOptsWhitelist).then(function (repo) {
        console.log("Cloned " + path.basename(urlWhitelist) + " to " + repo.workdir());
        res.sendStatus(200);
      }).catch(function (err) {
        console.log(err);
      });
      // path exists unless there was an error
  
  //});

  });

});

router.post('/getBlacklist', function (req, res) {
   
  console.log("black list logic hit");
  //check if the blacklist txt file is there, if so dont clone
  //fs.unlink('/blackListRepo/blacklist.txt', (err) => {
   // if (err) throw err;
    //console.log('successfully deleted /tmp/hello');
  //});

  rimraf(process.cwd()+'/blackListRepo', function () {
    console.log("Deleted blacklist repo");

   // mkdirp(process.cwd()+'/blackListRepo', function(err) {

      nodegit.Clone(urlBlacklist, blackListRepo, cloneOptsBlacklist).then(function (repo) {
        console.log("Cloned " + path.basename(urlBlacklist) + " to " + repo.workdir());
        res.sendStatus(200);
      }).catch(function (err) {
        console.log(err);

      });

    //});

  });

});

router.post('/addToBlacklist', function (req, res) {
    //parse the object
    console.log(req.body);
    console.log("trying to add to blacklist");
  var note = req.body.note;
  var ip = req.body.ipadress;
    console.log(req.body.ipadress);
    console.log(req.body.note);
    var s = String(note+"\n"+ip+"\n");
  fs.appendFile(process.cwd()+'/blackListRepo/blacklist.txt',s, function(err) {
    if(err) {
        return console.log(err);
    }
    
      process.chdir(process.cwd()+'/blackListRepo');

      console.log("Switched to Dir "+process.cwd());
      var exec = require('child_process').exec;
      exec('git add .', function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }

      exec('git commit -m"'+note+'"', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        exec('git push', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
          process.chdir("../");

          console.log(process.cwd());
          
        });
      });  
    });
  });
});

router.post('/addToWhitelist', function (req, res) {
  //parse the object
  console.log(req.body);
  console.log("trying to add to whitelist");
var note = req.body.note;
var ip = req.body.ipadress;
  console.log(req.body.ipadress);
  console.log(req.body.note);
  var s = String(note+"\n"+ip+"\n");
fs.appendFile(process.cwd()+'/whiteListRepo/whitelist.txt',s, function(err) {
  if(err) {
      return console.log(err);
  }
  
  process.chdir(process.cwd()+'/whiteListRepo');

  var exec = require('child_process').exec;
  exec('git add .', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }

    exec('git commit -m"'+note+'"', function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      exec('git push', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        process.chdir("../");

        console.log(process.cwd());
      });
    });  
  });
});
});



module.exports = router;
