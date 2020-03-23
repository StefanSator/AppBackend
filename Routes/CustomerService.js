const express = require("express");
const pool = require("../DBConnection");

const Router = express.Router();

/**
 * @api {post} /customers/validate Check Login
 * @apiGroup Customer Service
 * @apiName LoginCustomer
 * @apidescription Route for validating the login of a Customer.
 * @apiParam {String} email Email of a registered user.
 * @apiParam {String} password Raw password of a registered user.
 * @apiSuccess {Boolean} successful Tells if Users login form is correct. If this is false don't allow user to log into the app.
 * @apiSuccess {Integer} sessiontoken Token returned from Service. Used by the backend to identify a user. 
 * Store this, because it is needed for identifying a registered user in subsequent rest calls. Returns -1 if validation was
 * unsuccessful.
 */
Router.post('/validate', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log("Email: " + email);
  console.log("Password: " + password);

  const client = await pool.connect();
  try {
    const result = await client.query(`Select * From Customer Where email='${email}'`);
    // Check if user with defined email is in system
    if (result.rowCount === 0) {
      res.send({ successful: false, sessiontoken: -1 });
    } else {
      // Check if user password is valid
      if (password === result.rows[0].password) {
        res.send({ successful: true, sessiontoken: result.rows[0].customerid });
      } else {
        res.send({ successful: false, sessiontoken: -1 });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {get} /customers?email=:email Get Customer
 * @apiGroup Customer Service
 * @apiName GetCustomer
 * @apidescription Route which returns customer information.
 * @apiParam {String} email Email of a registered user.
 * @apiSuccess {Integer} customerid Customer ID of the registered customer.
 * @apiSuccess {String} username Username of the customer.
 */
Router.get('/', async (req, res) => {
  var email = req.query.email;
  const client = await pool.connect();
  try {
    const result = await client.query("Select customerid, username From Customer Where email='" + email + "'");
    const results = (result) ? result.rows : null;
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {post} /customers Register Customer
 * @apiGroup Customer Service
 * @apiName RegisterCustomer
 * @apidescription Route for registration of a new Customer.
 * @apiParam {String} username Username of the user to register.
 * @apiParam {String} password Raw password of the user to register.
 * @apiParam {String} email Unique Email of the user to register.
 * @apiSuccess {Integer} customerid Token returned from Service. Used by the backend to identify a user. 
 * Store this, because it is needed for identifying a registered user in subsequent rest calls.
 */
Router.post('/', async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  console.log("Username: " + username);
  console.log("Password: " + password);
  console.log("Email: " + email);
  if (username == undefined || password == undefined || email == undefined) {
    res.status(500).send({ error: 'Invalid Body Params.' });
    return;
  }
  const client = await pool.connect();
  try {
    await client.query("Insert Into Customer (username, password, email) Values ("
      + "'" + username + "', '" + password + "', '" + email + "')");
    const result = await client.query("Select customerid From Customer Where email='" + email + "'");
    const sessionToken = result.rows[0];
    res.send(sessionToken);
  } catch (err) {
    console.error(err);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

module.exports = Router;