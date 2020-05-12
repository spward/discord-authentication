const express = require("express");
const fetch = require("node-fetch");
const btoa = require("btoa");
const path = require("path");
const { catchAsync } = require("../utils");

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent("http://localhost:3000/callback");

//you may consider storing this in database (_userInfos)
const users = [];

router.get("/login", (req, res) => {
  res.redirect(
    `https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20email&response_type=code&redirect_uri=${redirect}`
  );
});

router.get("/userInfo/:id", (req, res) => {
  console.log("a user want to get his information");
  console.log("looking for user in database id: ", req.params.id);
  if(!req.params.id) {
    console.log("user id is required");
    res.json({error: "user Id is required to obtain user infos"});
  }else{
    const user = users.find(user => user.id === req.params.id);
    if(!user){
      console.log("user not found in database wrong id or not logged in");
      res.json({error: "Please re-login and try again"});
    }else{
      console.log('user found in database : ', user);
      res.json({userInfo: user});
    }    
  }
});

router.get("/logout/:id", (req, res) => {
  console.log("a user want to logout");
  console.log("looking for user in database id: ", req.params.id);
  const index = users.findIndex(user => user.id === req.params.id);
  if(index !== -1) {
    console.log("user found we will log him out");
    users.splice(index,1);
    res.json({msg : 'you are logged out now'});
  }else{
    console.log("user not found , probably loged out already");
    res.json({msg : 'you are logged out already!'});
  }

  
});

router.get(
  "/callback",
  catchAsync(async (req, res) => {
    if (!req.query.code) throw new Error("NoCodeProvided");
    const code = req.query.code;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(
      `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${creds}`,
        },
      }
    );

    const json = await response.json();
    console.log('call back', json);
    const fetchUser = await fetch("https://discordapp.com/api/users/@me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${json.access_token}`,
      },
    });

    const userInfo = await fetchUser.json();
    console.log("got new user :", userInfo);
    
    if (userInfo && userInfo.email){
      console.log("adding user to in memrory database")
      users.push(userInfo);
    } 
    res.json({ userInfo });
  })
);

module.exports = router;
