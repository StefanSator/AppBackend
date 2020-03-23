const express = require('express');
const pool = require('../DBConnection');

const Router = express.Router();

const TYPES = {
  LIKE: 1,
  DISLIKE: -1
};

/**
 * @api {get} /meals?weekDay=:weekDay&calendarWeek=:calendarWeek&year=:year Get Mensa Meals
 * @apiGroup Meal Service
 * @apiName GetMeals
 * @apidescription Route for getting meals for a specified date.
 * @apiParam {String} weekDay Day of current week. Valid Params: Mo, Tu, We, Th, Fr.
 * @apiParam {Integer} calendarWeek Calendar Week.
 * @apiParam {Integer} year Year.
 * @apiSuccess {Object[]} meals List of meals for the specified date.
 * @apiSuccess {Integer} meals.mealid ID of the meal.
 * @apiSuccess {String} meals.mealname Name of the meal.
 * @apiSuccess {String} meals.category Category of the meal.
 * @apiSuccess {String} meals.studentprice Student Price.
 * @apiSuccess {String} meals.employeeprice Employee Price.
 * @apiSuccess {String} meals.guestprice Guest Price.
 * @apiSuccess {Integer} meals.day Day of month.
 * @apiSuccess {String} meals.weekday Weekday.
 * @apiSuccess {Integer} meals.calendarweek Calendar Week.
 * @apiSuccess {Integer} meals.month Month.
 * @apiSuccess {Integer} meals.year Year.
 * @apiSuccess {String} meals.date Date String.
 * @apiSuccess {String} meals.likes Number of likes of the meal.
 * @apiSuccess {String} meals.dislikes Number of dislikes of the meal.
 */
Router.get('/', async (req, res) => {
  var weekDay = req.query.weekDay;
  var calendarWeek = req.query.calendarWeek;
  //var year = req.query.year;
  var year = 2019;

  const client = await pool.connect();
  try {
    const query = `Select M.*, COALESCE(U.likes, 0) AS likes, COALESCE(U.dislikes,0) AS dislikes From (Select * From Meal Where weekday=${weekDay}`
      + ` And calendarweek=${calendarWeek} And year=${year}) M Left Outer Join (Select SUM(Case When type=1 Then 1 Else 0 End) AS likes,`
      + ` SUM(Case When type=-1 Then 1 Else 0 End) AS dislikes, mealid From Userlike Group by mealid) U ON M.mealid = U.mealid`;
    const result = await client.query(query);
    const results = (result) ? result.rows : null;
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {post} /meals/likes Post Like
 * @apiGroup Meal Service
 * @apiName PostLike
 * @apidescription Route for posting likes or dislikes for a specified Meal.
 * @apiParam {Integer} userId ID of a registered user.
 * @apiParam {Integer} mealId ID of the meal to like or dislike
 * @apiParam {Integer} type Type of the Like. Like: 1. Dislike: -1.
 * @apiSuccess {Boolean} successful True, if posting the Like was successful.
 */
Router.post('/likes', async (req, res) => {
  var userId = req.body.userId;
  console.log('Userid: ' + userId);
  var mealId = req.body.mealId;
  console.log('MealId: ' + mealId);
  var type = req.body.type;
  if (type !== TYPES.LIKE && type !== TYPES.DISLIKE) {
    res.send({ 'successful': false })
  } else {
    const client = await pool.connect();
    try {
      // Check if like or dislike exists
      const query1 = "Select * From Userlike Where userid=" + userId + " And mealid=" + mealId;
      const result = await client.query(query1);
      if (result.rowCount !== 0) {
        console.log('Update Like in DB');
        // Update the existing row in table
        const query2 = "Update Userlike Set userid=" + userId + ", mealId=" + mealId + ", type=" + type
          + " Where userid=" + userId + " And mealid=" + mealId;
        await client.query(query2);
        res.send({ 'successful': true })
      } else {
        console.log('Insert Like Into DB.')
        // Insert new row in table
        const query3 = "Insert Into Userlike (mealid, userid, type) Values ("
          + mealId + ", " + userId + ", " + type + ")";
        await client.query(query3);
        res.send({ 'successful': true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
    } finally {
      client.release();
    }
  }
});

/**
 * @api {delete} /meals/likes Delete Like
 * @apiGroup Meal Service
 * @apiName DeleteLike
 * @apidescription Route for deleting likes or dislikes for a specified Meal
 * @apiParam {Integer} sessionId User ID of the logged in user.
 * @apiParam {Integer} mealId ID of the meal to like or dislike
 * @apiSuccess {Boolean} successful True, if deleting the Like was successful.
 */
Router.delete('/likes', async (req, res) => {
  var userId = req.query.sessionId;
  var mealId = req.query.mealId;
  console.log("UserId: " + userId);
  console.log("MealId: " + mealId);

  const client = await pool.connect();
  try {
    // Check if like or dislike exists
    const query1 = "Select * From Userlike Where userid=" + userId + " And mealid=" + mealId;
    const result = await client.query(query1);
    if (result.rowCount !== 0) {
      // Delete Meal from DB Table
      const query2 = "Delete From Userlike Where userid=" + userId + " And mealid=" + mealId;
      await client.query(query2);
      res.send({ 'successful': true });
    } else {
      // Don't need to delete Meal, because it is not in DB Table
      res.send({ 'successful': true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {delete} /meals/likes Delete All Likes
 * @apiGroup Meal Service
 * @apiName DeleteAllLikes
 * @apidescription Route for deleting all likes or dislikes for a specified User.
 * @apiParam {Integer} sessionId ID of the logged in user. Is at the moment the userId, which was returned from the backend during the login.
 * @apiSuccess {Boolean} successful True, if deleting the Like was successful.
 */
Router.delete('/alllikes', async (req, res) => {
  var userId = req.query.sessionId;

  const client = await pool.connect();
  try {
    // Delete all likes or dislikes of user
    const query = "Delete From Userlike Where userid=" + userId;
    await client.query(query);
    res.send({'successful': true});
    client.release();
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {get} /meals/likes?mealid=:mealid&userid=:userid Get Like State
 * @apiGroup Meal Service
 * @apiName GetLikeState
 * @apidescription Route for getting number of likes and dislikes of a specified meal.
 * It also returns the status of the user, which explains if user likes / dislikes
 * or is neutral (not liked, but also not disliked) to the specified Meal.
 * @apiParam {Integer} userid ID of a registered user.
 * @apiParam {Integer} mealid ID of a meal.
 * @apiSuccess {Integer} state State of the user. 0: neutral. 1: likes the meal. -1: dislikes the meal.
 * @apiSuccess {String} likes Total number of likes of the specified meal.
 * @apiSuccess {String} dislikes Total number of dislikes of the specified meal.
 */
Router.get('/likes', async (req, res) => {
  var mealId = req.query.mealid;
  var userId = req.query.userid;

  const client = await pool.connect();
  try {
    const query = "Select COALESCE(SUM(CASE WHEN type=1 THEN 1 ELSE 0 END),0) AS likes, "
      + "COALESCE(SUM(CASE WHEN type=-1 THEN 1 ELSE 0 END),0) AS dislikes FROM "
      + "(Select * From Userlike Where mealid=" + mealId + ") AS Userlike";
    const result = await client.query(query);
    let likes = result.rows[0].likes;
    let dislikes = result.rows[0].dislikes;
    const query2 = "Select type From Userlike Where mealid=" + mealId + " And userid=" + userId;
    const result2 = await client.query(query2);
    let state;
    if (result2.rowCount === 0) {
      state = 0;
    } else {
      state = result2.rows[0].type;
    }
    res.send({ likes: likes, dislikes: dislikes, state: state });
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {get} /meals/userlikes?userid=:userid Get All Likes of Customer
 * @apiGroup Meal Service
 * @apiName GetAllLikes
 * @apidescription Route for getting all Meals which a specified user liked or dislikes.
 * @apiParam {Integer} userid ID of a registered user.
 * @apiParam {Integer} mealid ID of a meal.
 * @apiSuccess {Integer} state State of the user. 0: neutral. 1: likes the meal. -1: dislikes the meal.
 * @apiSuccess {String} likes Total number of likes of the specified meal.
 * @apiSuccess {String} dislikes Total number of dislikes of the specified meal.
 */
Router.get('/userlikes', async (req, res) => {
  var userId = req.query.userid;

  const client = await pool.connect();
  try {
    const mealsQuery = `Select M.*, COALESCE(U.likes, 0) AS likes, COALESCE(U.dislikes,0) AS dislikes From `
      + `(Select MU.* From Meal MU Inner Join Userlike UL On MU.mealid=UL.mealid Where UL.userid=${userId}) M `
      + `Left Outer Join (Select SUM(Case When type=1 Then 1 Else 0 End) AS likes,`
      + ` SUM(Case When type=-1 Then 1 Else 0 End) AS dislikes, mealid From Userlike Group by mealid) U ON M.mealid = U.mealid`;
    const mealsResult = await client.query(mealsQuery);
    const likesQuery = `Select mealid From Userlike Where userid=${userId} And type=1`;
    const likesResult = await client.query(likesQuery);
    const dislikesQuery = `Select mealid From Userlike Where userid=${userId} And type=-1`;
    const dislikesResult = await client.query(dislikesQuery);
    res.send({meals: mealsResult.rows, likes: likesResult.rows, dislikes: dislikesResult.rows});
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

/**
 * @api {get} /meals/popular?weekday=:weekday&calendarweek=:calendarweek&year=:year Get Most Popular and Unpopular Meal
 * @apiGroup Meal Service
 * @apiName GetMostPopular
 * @apidescription Route for getting the most popular Meal and the most unpopular Meal of the specified Date.
 * @apiParam {String} weekday Day of current week. Valid Params: Mo, Tu, We, Th, Fr.
 * @apiParam {Integer} calendarweek Calendar Week.
 * @apiParam {Integer} year Year.
 * @apiSuccess {Object} popular Most popular Meal of current day.
 * @apiSuccess {Integer} popular.mealid ID of the meal.
 * @apiSuccess {String} popular.mealname Name of the meal.
 * @apiSuccess {String} popular.category Category of the meal.
 * @apiSuccess {String} popular.studentprice Student Price.
 * @apiSuccess {String} popular.employeeprice Employee Price.
 * @apiSuccess {String} popular.guestprice Guest Price.
 * @apiSuccess {Integer} popular.day Day of month.
 * @apiSuccess {String} popular.weekday Weekday.
 * @apiSuccess {Integer} popular.calendarweek Calendar Week.
 * @apiSuccess {Integer} popular.month Month.
 * @apiSuccess {Integer} popular.year Year.
 * @apiSuccess {String} popular.date Date String.
 * @apiSuccess {String} popular.likes Number of likes of the meal.
 * @apiSuccess {String} popular.dislikes Number of dislikes of the meal.
 * @apiSuccess {String} popular.like_rank Rank of the meal regarding its likes.
 * @apiSuccess {Object} unpopular Most unpopular Meal of current day.
 * @apiSuccess {Integer} unpopular.mealid ID of the meal.
 * @apiSuccess {String} unpopular.mealname Name of the meal.
 * @apiSuccess {String} unpopular.category Category of the meal.
 * @apiSuccess {String} unpopular.studentprice Student Price.
 * @apiSuccess {String} unpopular.employeeprice Employee Price.
 * @apiSuccess {String} unpopular.guestprice Guest Price.
 * @apiSuccess {Integer} unpopular.day Day of month.
 * @apiSuccess {String} unpopular.weekday Weekday.
 * @apiSuccess {Integer} unpopular.calendarweek Calendar Week.
 * @apiSuccess {Integer} unpopular.month Month.
 * @apiSuccess {Integer} unpopular.year Year.
 * @apiSuccess {String} unpopular.date Date String.
 * @apiSuccess {String} unpopular.likes Number of likes of the meal.
 * @apiSuccess {String} unpopular.dislikes Number of dislikes of the meal.
 * @apiSuccess {String} unpopular.dislike_rank Rank of the meal regarding its dislikes.
 */
Router.get('/popular', async (req, res) => {
  var weekDay = req.query.weekday;
  var calendarWeek = req.query.calendarweek;
  //var year = req.query.year;
  var year = 2019;

  const client = await pool.connect();
  try {
    const popularQuery = `Select F.*, RANK() OVER(Order by likes DESC) like_rank`
      + ` From (Select M.*, COALESCE(U.likes,0) AS likes, COALESCE(U.dislikes,0) AS dislikes From Meal M Left Outer Join`
      + ` (Select SUM(Case When type=1 Then 1 Else 0 End) AS likes,`
      + ` SUM(Case When type=-1 Then 1 Else 0 End) AS dislikes, mealid`
      + ` From Userlike Group by mealid) U ON M.mealid=U.mealid) F`
      + ` Where F.weekday = ${weekDay} And F.year=${year} And F.calendarweek=${calendarWeek} LIMIT 1`;
    const popularResult = await client.query(popularQuery);
    const unpopularQuery = `Select F.*, RANK() OVER(Order by dislikes DESC) dislike_rank`
      + ` From (Select M.*, COALESCE(U.likes,0) AS likes, COALESCE(U.dislikes,0) AS dislikes From Meal M Left Outer Join`
      + ` (Select SUM(Case When type=1 Then 1 Else 0 End) AS likes,`
      + ` SUM(Case When type=-1 Then 1 Else 0 End) AS dislikes, mealid`
      + ` From Userlike Group by mealid) U ON M.mealid=U.mealid) F`
      + ` Where F.weekday = ${weekDay} And F.year=${year} And F.calendarweek=${calendarWeek} LIMIT 1`;
    const unpopularResult = await client.query(unpopularQuery);
    res.send({popular: popularResult.rows[0], unpopular: unpopularResult.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Leider ist ein interner Server-Fehler aufgetreten.'});
  } finally {
    client.release();
  }
});

module.exports = Router;