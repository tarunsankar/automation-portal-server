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

/**
 * Function to save holiday dates entered in the UI in a flat file
 * Retries all the date entries in "req.body.holidayDates" and writes it to the file. It's always a write and not append
 * Works only when user has a valid session
 */
router.post('/saveDates', jwtservice.passport.authenticate('jwt', { session: false }), function(req, res) {
	const holidayDates = req.body.holidayDates ? req.body.holidayDates : "";
	log4jservice.log("Holiday date update",holidayDates);
});


module.exports = router;
