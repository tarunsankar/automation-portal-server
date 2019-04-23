const _ = require("lodash");
const express = require('express');
const fs = require('fs');
const Promise = require("bluebird");
const request = require('request-promise');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const https = require('https');
// custom objects
const configservice = require('../services/configservice');
const log4jservice = require('../services/log4jservice');
// custom jwt configure object
const jwtservice = require('../services/jwtservice');

const router = express.Router();

// Get the user data array from configuration file
const usersArray = configservice.loginCredentials;

/**
 * Function to return the card data of the logged-in user
 * Works only when user has a valid session
 */
router.get('/getCards', jwtservice.passport.authenticate('jwt', { session: false }),  function(req, res) {
	log4jservice.info("req.user.id",req.user.id);
	const user = usersArray[_.findIndex(usersArray, {id: req.user.id})];
	res.status(200).json({message: "success", cards: user.cards});
});

module.exports = router;
