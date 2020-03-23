const express = require('express');
const pool = require('../DBConnection');
var DistanceCalculator = require('../Helpers/DistanceCalculator');

const Router = express.Router();

/**
 * @api {get} /lifts/destination/states Get States
 * @apiGroup Lift Service
 * @apiName GetFederalStates
 * @apidescription Route for getting all federal states of Germany.
 * @apiSuccess {Object[]} states List containing federal states of Germany.
 * @apiSuccess {String} states.state Name of the state.
 */
Router.get("/destination/states", async (req, res) => {
  const client = await pool.connect();

  try {
    const getStatesQuery = `Select admin AS state From City Group by admin;`;
    const result = await client.query(getStatesQuery);
    res.send(result.rows);
    client.release();
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {get} /lifts/destination/cities?state=:state Get Cities
 * @apiGroup Lift Service
 * @apiName GetCities
 * @apidescription Route for getting all cities for a specified federal state.
 * @apiParam {String} state Name of the federal state. Valid state names are returned from the Get States Route.
 * @apiSuccess {Object[]} cities List containing all cities of the state.
 * @apiSuccess {Integer} cities.cityid ID of the city.
 * @apiSuccess {String} cities.city Name of the city.
 * @apiSuccess {String} cities.state Name of the federal state, which the city belongs to.
 * @apiSuccess {String} cities.latitude Latitude of the city.
 * @apiSuccess {String} cities.longitude Longitude of the city.
 */
Router.get("/destination/cities", async (req, res) => {
  let state = req.query.state;

  const client = await pool.connect();
  try {
    const getCitiesQuery = `Select cityId, city, admin AS state, latitude, longitude From City Where admin='${state}'`;
    const result = await client.query(getCitiesQuery);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {post} /lifts/destination/recommendedprice Get Recommended Price
 * @apiGroup Lift Service
 * @apiName GetRecommendedPrice
 * @apidescription Route for getting the recommended price for a lift advertisement.
 * Based on distance and number of passengers.
 * Distance calculated by Vincenty Algorithm.
 * @apiParam {Object} point1 Start of the lift.
 * @apiParam {Double} point1.lat Latitude of point1.
 * @apiParam {Double} point1.lng Longitude of point1.
 * @apiParam {Object} point2 Start of the lift.
 * @apiParam {Double} point2.lat Latitude of point2.
 * @apiParam {Double} point2.lng Longitude of point2.
 * @apiParam {Integer} passengers Number of passengers.
 * @apiSuccess {Double} price Price Recommendation for the lift.
 */
Router.post("/recommendedprice", async (req, res) => {
  console.log(req.body);
  let startPoint = req.body.point1;
  let targetPoint = req.body.point2;
  let numberPassengers = req.body.passengers;
  let fuelPricePerLiter = 1.50; // Assumption: End 2019
  let fuelConsumptionPerLiter = 0.075; // Assumption: End 2019
  // Calculate the Vincenty Distance
  try {
    let distanceCalculator = new DistanceCalculator(startPoint.lat, startPoint.lng);
    let distance = distanceCalculator.calculateVincentyDistance(targetPoint.lat, targetPoint.lng);
    (console.log(distance));
    let recommendedPrice = distance * fuelPricePerLiter * fuelConsumptionPerLiter / (numberPassengers + 1);
    res.send({ price: recommendedPrice });
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  }
});

/**
 * @api {get} /lifts/event/faculties Get Faculties
 * @apiGroup Lift Service
 * @apiName GetFaculties
 * @apidescription Route for getting all faculties of OTH Regensburg.
 * @apiSuccess {Object[]} faculties List containing all faculties of OTH Regensburg.
 * @apiSuccess {Integer} faculties.facultyid ID of the faculty.
 * @apiSuccess {String} faculties.name Name of the faculty.
 */
Router.get("/event/faculties", async (req, res) => {
  const client = await pool.connect();
  try {
    const getFacultiesQuery = `Select facultyid, name From Faculty`;
    const result = await client.query(getFacultiesQuery);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {post} /lifts/new Post Lift
 * @apiGroup Lift Service
 * @apiName PostLift
 * @apidescription Route for posting a new Lift.
 * @apiParam {Object} lift Object containing information about the lift to post.
 * @apiParam {Integer} lift.user ID of the user who wants to post the lift.
 * @apiParam {Object} lift.start Start City of the lift.
 * @apiParam {Integer} lift.start.cityId ID of the city.
 * @apiParam {String} lift.start.cityName Name of the city.
 * @apiParam {String} lift.start.state State, which the city belongs to.
 * @apiParam {Double} lift.start.lat Latitude of the city.
 * @apiParam {Double} lift.start.lng Longitude of the city.
 * @apiParam {Object} lift.target Target City of the lift.
 * @apiParam {Integer} lift.target.cityId ID of the city.
 * @apiParam {String} lift.target.cityName Name of the city.
 * @apiParam {String} lift.target.state State, which the city belongs to.
 * @apiParam {Double} lift.target.lat Latitude of the city.
 * @apiParam {Double} lift.target.lng Longitude of the city.
 * @apiParam {Integer} lift.passengers Number of passengers in the lift.
 * @apiParam {Integer} lift.price Price for the lift.
 * @apiParam {Object} lift.event Event for which the lift is advertised. Can also be null.
 * @apiParam {String} lift.event.eventTitle Title of the event.
 * @apiParam {String} lift.event.eventDescription Description of the event.
 * @apiParam {Object[]} lift.event.faculties List of faculties, for which the event is interesting.
 * @apiParam {Integer} lift.event.faculties.facultyId ID of the faculty.
 * @apiParam {String} lift.event.faculties.name Name of the faculty.
 * @apiParam {Object} lift.datetime Datetime Informations regarding the lift.
 * @apiParam {Integer} lift.datetime.day Day, e.g. 12.
 * @apiParam {Integer} lift.datetime.month Month, e.g. 10.
 * @apiParam {Integer} lift.datetime.year Year, e.g. 2019.
 * @apiParam {Integer} lift.datetime.hour Hour, e.g. 8.
 * @apiParam {Integer} lift.datetime.minutes Minutes, e.g. 30.
 * @apiParam {String} lift.datetime.dateString String representing the date of the lift. Format: DDMMYYYY.
 */
Router.post("/new", async (req, res) => {
  console.log(req.body);
  let lift = req.body.lift;
  let event = lift.event;
  console.log(lift);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    if (event !== null) {
      const postEventQuery = `Insert Into Event(title, description) Values ('${event.eventTitle}', '${event.eventDescription}') RETURNING eventId`;
      const result = await client.query(postEventQuery);
      var eventId = result.rows[0].eventid;
      console.log('Eventid: ' + eventId);
      for (var i = 0; i < event.faculties.length; i++) {
        let eventFacultyMappingQuery = `Insert Into EventFacultyMapping(eventId, facultyId) Values (${eventId}, ${event.faculties[i].facultyId})`;
        await client.query(eventFacultyMappingQuery);
      }
    }
    const postLiftQuery = `Insert Into Lift(userId, startId, targetId, eventId, passengers, price, day, month, year, hour, minutes, date) Values `
      + `(${lift.user}, ${lift.start.cityId}, ${lift.target.cityId}, ${(event != null) ? eventId : null}, ${lift.passengers}, ${lift.price}, ${lift.datetime.day}, ${lift.datetime.month}, ${lift.datetime.year}, ${lift.datetime.hour}, ${lift.datetime.minutes}, TO_DATE('${lift.datetime.dateString}', 'DDMMYYYY'))`;
    await client.query(postLiftQuery);
    await client.query('COMMIT');
    res.end();
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});


// TODO: Change that own lifts are not displayed any more
/**
 * @api {post} /lifts/search Search Lifts
 * @apiGroup Lift Service
 * @apiName SearchLifts
 * @apidescription Route for getting Lift Recommendations specified through a submitted search request.
 * @apiParam {Object} searchrequest Search Request for searching the lifts.
 * @apiParam {Object} searchrequest.place Destination of the lift.
 * @apiParam {Integer} searchrequest.place.cityId ID of the city.
 * @apiParam {String} searchrequest.place.cityName Name of the city.
 * @apiParam {String} searchrequest.place.state State, which the place belongs to.
 * @apiParam {Double} searchrequest.place.lat Latitude of the Destination.
 * @apiParam {Double} searchrequest.place.lng Longitude of the Destination.
 * @apiParam {Object} searchrequest.datetime Datetime Informations regarding the lift.
 * @apiParam {Integer} searchrequest.datetime.day Day, e.g. 12.
 * @apiParam {Integer} searchrequest.datetime.month Month, e.g. 10.
 * @apiParam {Integer} searchrequest.datetime.year Year, e.g. 2019.
 * @apiParam {Integer} searchrequest.datetime.hour Hour, e.g. 8.
 * @apiParam {Integer} searchrequest.datetime.minutes Minutes, e.g. 30.
 * @apiParam {String} searchrequest.datetime.dateString String representing the date of the lift. Format: DDMMYYYY.
 * @apiParam {Boolean} searchrequest.isEventSearch True, if user wants to search for lifts to events. False, if user wants to search for private lifts.
 * @apiParam {Object[]} searchrequest.faculties Events interesting for the specified Faculties, should be searched.
 * @apiParam {Integer} searchrequest.faculties.facultyId ID of the faculty.
 * @apiParam {String} searchrequest.faculties.name Name of the faculty.
 * @apiParam {Integer} searchrequest.radius Radius Search for lifts within the specified radius.
 * @apiSuccess {Object[]} searchresponse Array containing lifts fulfilling the search request.
 * @apiSuccess {Object} searchresponse.lift Lift, which fullfills the search request.
 * @apiSuccess {Integer} searchresponse.lift.userid ID of the Advertiser of the lift.
 * @apiSuccess {String} searchresponse.lift.username Name of the Avertiser of the lift.
 * @apiSuccess {String} searchresponse.lift.email Email of the Advertiser of the lift.
 * @apiSuccess {Integer} searchresponse.lift.passengers Number of passengers.
 * @apiSuccess {Integer} searchresponse.lift.price Price of the lift.
 * @apiSuccess {Integer} searchresponse.lift.startid ID of the city.
 * @apiSuccess {String} searchresponse.lift.startcity Name of the city.
 * @apiSuccess {String} searchresponse.lift.startstate State, which the city belongs to.
 * @apiSuccess {Double} searchresponse.lift.startlatitude Latitude of the city.
 * @apiSuccess {Double} searchresponse.lift.startlongitude Longitude of the city.
 * @apiSuccess {Integer} searchresponse.lift.targetid ID of the city.
 * @apiSuccess {String} searchresponse.lift.targetcity Name of the city.
 * @apiSuccess {String} searchresponse.lift.targetstate State, which the city belongs to.
 * @apiSuccess {Double} searchresponse.lift.targetlatitude Latitude of the city.
 * @apiSuccess {Double} searchresponse.lift.targetlongitude Longitude of the city.
 * @apiSuccess {Integer} searchresponse.lift.eventid ID of the event.
 * @apiSuccess {String} searchresponse.lift.eventdescription Description of the Event of the lift.
 * @apiSuccess {String} searchresponse.lift.eventtitle Title of the Event of the Lift.
 * @apiSuccess {Integer} searchresponse.lift.day Day of the trip.
 * @apiSuccess {Integer} searchresponse.lift.month Month of the trip.
 * @apiSuccess {Integer} searchresponse.lift.year Year of the trip.
 * @apiSuccess {Integer} searchresponse.lift.hour Hour of the day.
 * @apiSuccess {Integer} searchresponse.lift.minutes Minutes.
 * @apiSuccess {Object[]} searchresponse.faculties Faculties, for which the Lift is interesting. Null, if lift reason is a private trip.
 * @apiSuccess {Integer} searchresponse.faculties.facultyId ID of the faculty.
 * @apiSuccess {String} searchresponse.faculties.name Name of the faculty.
 */
Router.post("/search", async (req, res) => {
  console.log(req.body);
  let place = req.body.searchrequest.place;
  let datetime = req.body.searchrequest.datetime;
  let isEventSearch = req.body.searchrequest.isEventSearch;
  let faculties = req.body.searchrequest.faculties;
  let facultyIds = [];
  if (faculties !== null) {
    for (var i = 0 ; i < faculties.length ; i++) {
      facultyIds.push(faculties[i].facultyId);
    }
  }
  console.log(facultyIds);
  let radius = req.body.searchrequest.radius;

  const client = await pool.connect();
  try {
    // Get Possible Lift Candidates
    let getPossibleCandidatesQuery = `Select L.liftid, L.userid, CU.username, CU.email, L.startid, C2.city AS startcity, C2.admin AS startstate, C2.latitude AS startlatitude, C2.longitude AS startlongitude, `
      + ` L.targetid, C1.city AS targetcity, C1.admin AS targetstate, C1.latitude AS targetlatitude, C1.longitude AS targetlongitude, L.passengers, L.price, L.day, L.month, L.year, L.hour, L.minutes, ` 
      + ` L.eventid, E.description AS eventdescription, E.title AS eventtitle`
      + ` From Lift L Inner Join City C1 ON L.targetid = C1.cityid Inner Join City C2 ON L.startid = C2.cityid`
      + ` Inner Join Customer CU On L.userid = CU.customerid Left Outer Join Event E On L.eventid = E.eventid`
      + ` Left Outer Join EventFacultyMapping EF On E.eventid = EF.eventid Left Outer Join Faculty F On EF.facultyid = F.facultyid`
      + ` Where L.day=${datetime.day} AND L.month=${datetime.month} AND L.year=${datetime.year}`;
    if (isEventSearch === true) {
      getPossibleCandidatesQuery += ` AND L.eventid IS NOT NULL AND F.facultyid IN (${facultyIds})`;
    } else {
      getPossibleCandidatesQuery += ` AND L.eventid IS NULL`;
    }
    getPossibleCandidatesQuery += ` Group by L.liftid, L.userid, CU.username, CU.email, L.startid, startcity, startstate, startlatitude, startlongitude, L.targetid, targetcity, targetstate, targetlatitude, targetlongitude, L.passengers,`
      + ` L.price, L.day, L.month, L.year, L.hour, L.minutes, L.eventid, eventdescription, eventtitle`;
    const possibleCandidatesResult = await client.query(getPossibleCandidatesQuery);
    const possibleCandidates = possibleCandidatesResult.rows;
    console.log(possibleCandidates);
    // Get Lift Recommendations for user based on distance
    let distanceCalculator = new DistanceCalculator(place.latitude, place.longitude);
    let lifts = distanceCalculator.locationBasedLiftRecommenderAlgorithm(possibleCandidates, radius);
    // Build response
    let response = [];
    for (var i = 0 ; i < lifts.length ; i++) {
      if (lifts[i].eventid === null) {
        response.push({
          lift: lifts[i],
          faculties: null
        });
      } else {
        const getFacultiesForLiftQuery = `Select F.facultyid, F.name From EventFacultyMapping EF`
          + ` Inner Join Event E On EF.eventid = E.eventid Inner Join Faculty F On EF.facultyid = F.facultyid`
          + ` Where E.eventid = ${lifts[i].eventid}`;
        const result = await client.query(getFacultiesForLiftQuery);
        const faculties = result.rows;
        response.push({
          lift: lifts[i],
          faculties: faculties
        })
      }
    }
    console.log(response);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {post} /lifts/book Post Booking
 * @apiGroup Lift Service
 * @apiName PostBooking
 * @apidescription Route for posting a Booking Request on a specified Lift by a specified user.
 * @apiParam {Integer} userId ID of the user, who wants to book the lift.
 * @apiParam {Integer} liftId ID of the lift, the user wants to book.
 */
Router.post("/book", async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const liftId = req.body.liftId;
  const client = await pool.connect();
  try {
    const bookingQuery = `Insert Into Booking(userid, liftid, accepted) Values (${userId}, ${liftId}, 'false');`;
    await client.query(bookingQuery);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {delete} /lifts/book Delete Booking
 * @apiGroup Lift Service
 * @apiName DeleteBooking
 * @apidescription Route for deleting a Booking-Request of a user.
 * @apiParam {Integer} userId ID of the user, who wants to delete the booking of a lift.
 * @apiParam {Integer} liftId ID of the lift, the user wants to delete the booking from.
 */
Router.delete("/book", async (req, res) => {
  console.log(req.body);
  if (req.body.userId === undefined || req.body.liftId === undefined) {
    res.status(400).send({error: 'Die Anfrage-Nachricht war fehlerhaft aufgebaut.'});
  }
  const userId = req.body.userId;
  const liftId = req.body.liftId;
  const client = await pool.connect();
  try {
    const deleteBookingQuery = `Delete From Booking Where userid=${userId} AND liftid=${liftId}`;
    await client.query(deleteBookingQuery);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Leider ist ein internes Serverproblem aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {get} /lifts/book/input Get Post Input
 * @apiGroup Lift Service
 * @apiName GetPostInput
 * @apidescription Route for getting Lift-Requests of a user.
 * @apiParam {Integer} userId ID of the user.
 * @apiSuccess {Object[]} requestinput Array of Booking-Request of other users.
 * @apiSuccess {Integer} requestinput.liftid ID of the lift the user wants to book.
 * @apiSuccess {String} requestinput.startcity Start Point of the lift.
 * @apiSuccess {String} requestinput.targetcity Target Point of the lift.
 * @apiSuccess {Integer} requestinput.userid ID of the user, who wants to book the lift.
 * @apiSuccess {String} requestinput.username Name of the user, who wants to book the lift.
 * @apiSuccess {String} requestinput.email Contact Email of the user, who wants to book the lift.
 * @apiSuccess {Boolean} requestinput.accepted True, if user is invited to the lift.
 * @apiSuccess {Integer} requestinput.eventid ID of the event of the lift. Null, if lift is a private trip.
 * @apiSuccess {String} requestinput.eventtitle Name of the event of the lift. Null, if lift is a private trip.
 * @apiSuccess {Integer} requestinput.day Day.
 * @apiSuccess {Integer} requestinput.month Month.
 * @apiSuccess {Integer} requestinput.year Year.
 * @apiSuccess {Integer} requestinput.hour Hour.
 * @apiSuccess {Integer} requestinput.minutes Minutes.
 */
Router.get("/book/input", async (req, res) => {
  const userId = req.query.userId;
  const client = await pool.connect();
  try {
    const getLiftInputQuery = `Select L.liftid, S.city AS startcity, T.city AS targetcity, L.day, L.month, L.year, L.hour, L.minutes, B.accepted, L.eventid, E.title AS eventtitle, B.userid, C.username, C.email From Booking B Inner Join (Select * From Lift Where userid=${userId} And date >= current_date) L On B.liftid = L.liftid`
      + ` Inner Join Customer C On B.userid = C.customerid Inner Join City S On L.startid=S.cityid Inner Join City T On L.targetid=T.cityid Left Outer Join Event E On L.eventid = E.eventid`
      + ` Order by L.day, L.month, L.year, L.hour, L.minutes`;
    const result = await client.query(getLiftInputQuery);
    console.log(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {get} /lifts/book/output Get Post Output
 * @apiGroup Lift Service
 * @apiName GetPostOutput
 * @apidescription Route for getting Booking-Requests sent by the specified user to other users.
 * @apiParam {Integer} userId ID of the user.
 * @apiSuccess {Object[]} requestoutput Array of Booking-Request sent from the specified user to other users.
 * @apiSuccess {Integer} requestoutput.liftid ID of the lift the user wants to book.
 * @apiSuccess {String} requestoutput.startcity Start Point of the lift.
 * @apiSuccess {String} requestoutput.targetcity Target Point of the lift.
 * @apiSuccess {Integer} requestoutput.userid ID of the user, who advertised the lift.
 * @apiSuccess {String} requestoutput.username Name of the user, who advertised the lift.
 * @apiSuccess {String} requestoutput.email Contact Email of the user, who advertised the lift.
 * @apiSuccess {Boolean} requestoutput.accepted True, if user is invited to the lift.
 * @apiSuccess {Integer} requestoutput.eventid ID of the event of the lift. Null, if lift is a private trip.
 * @apiSuccess {String} requestoutput.eventtitle Name of the event of the lift. Null, if lift is a private trip.
 * @apiSuccess {Integer} requestoutput.day Day.
 * @apiSuccess {Integer} requestoutput.month Month.
 * @apiSuccess {Integer} requestoutput.year Year.
 * @apiSuccess {Integer} requestoutput.hour Hour.
 * @apiSuccess {Integer} requestoutput.minutes Minutes.
 */
Router.get("/book/output", async (req, res) => {
  if (req.query.userId === undefined) {
    res.status(400).send({error: 'Die Anfrage-Nachricht war fehlerhaft aufgebaut.'});
  }
  const userId = req.query.userId;
  
  const client = await pool.connect();
  try {
    const getLiftOutputQuery = `Select L.liftid, S.city AS startcity, T.city AS targetcity, C.username, C.email, L.day, L.month, L.year, L.hour, L.minutes, L.price, B.accepted, L.eventid, E.title AS eventtitle`
      + ` From (Select * From Booking Where userid=${userId}) B Inner Join (Select * From Lift Where date >= current_date) L Using(liftid) Inner Join Customer C On L.userid = C.customerid`
      + ` Inner Join City S On L.startid=S.cityid Inner Join City T On L.targetid = T.cityid Left Outer Join Event E On L.eventid=E.eventid`
      + ` Order by L.day, L.month, L.year, L.hour, L.minutes`;
    const result = await client.query(getLiftOutputQuery);
    console.log(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Interner Server-Fehler aufgetreten.');
  } finally {
    client.release();
  }
});

/**
 * @api {post} /lifts/book/accept Accept Booking Request
 * @apiGroup Lift Service
 * @apiName AcceptBookingRequest
 * @apidescription Route for accepting a Lift-Request made by a other user.
 * @apiParam {Integer} userId ID of the user, who has sent the booking request.
 * @apiParam {Integer} liftId ID of the lift, the user has sent a booking request for.
 * @apiSuccess {Boolean} rejected True, if Booking Acception was rejected, else false.
 * @apiSuccess {String} rejectionReason If rejected is true, here is the reason why it was rejected.
 */
Router.post("/book/accept", async (req, res) => {
  console.log(req.body);
  if (req.body.userId === undefined || req.body.liftId === undefined) {
    res.status(400).send({error: 'Die Anfrage-Nachricht war fehlerhaft aufgebaut.'});
  }
  const userId = req.body.userId;
  const liftId = req.body.liftId;

  const client = await pool.connect();
  try {
    const countAcceptedBookingsQuery = `Select COUNT(B.userid) AS bookings From Booking B Where accepted=true AND B.liftid=${liftId}`;
    const result1 = await client.query(countAcceptedBookingsQuery);
    const maxPassengersQuery = `Select passengers AS maxbookings From Lift Where liftid=${liftId}`;
    const result2 = await client.query(maxPassengersQuery);
    const result = {...result1.rows[0], ...result2.rows[0]};
    if (result.bookings === undefined || result.maxbookings === undefined) {
      res.status(500).send({error: 'Service konnte Ihre Anfrage nicht erfolgreich abarbeiten.'});
    }
    result.bookings = parseInt(result.bookings, 10);
    if (isNaN(result.bookings)) {
      console.log('Bookings Column could not be converted to a number.');
      res.status(500).send({error: 'Service konnte Ihre Anfrage nicht erfolgreich abarbeiten.'});
    }
    if (result.bookings >= 0 && result.bookings < result.maxbookings) {
      // Accept the booking process
      const acceptBookingQuery = `Update Booking Set accepted=true Where userid=${userId} AND liftid=${liftId}`;
      await client.query(acceptBookingQuery);
      res.send({
        rejected: false,
        rejectionReason: null
      });
    } else {
      // Dont accept the booking process
      res.send({
        rejected: true,
        rejectionReason: 'Maximale Anzahl an Buchungen bereits erreicht. Laden Sie erst einen anderen Teilnehmer aus, bevor Sie diesen einladen können.'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {post} /lifts/book/refuse Refuse Booking Request
 * @apiGroup Lift Service
 * @apiName RefuseBookingRequest
 * @apidescription Route for refusing Booking-Requests from a other user.
 * @apiParam {Integer} userId ID of the user, who has sent the booking request.
 * @apiParam {Integer} liftId ID of the lift, the user has sent a booking request for.
 */
Router.post("/book/refuse", async (req, res) => {
  console.log(req.body);
  if (req.body.userId === undefined || req.body.liftId === undefined) {
    res.status(400).send({error: 'Die Anfrage-Nachricht war fehlerhaft aufgebaut.'});
  }
  const userId = req.body.userId;
  const liftId = req.body.liftId;
  const client = await pool.connect();
  try {
    const updateBookingQuery = `Update Booking Set accepted=false Where userid=${userId} AND liftid=${liftId}`;
    await client.query(updateBookingQuery);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

module.exports = Router;