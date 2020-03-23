/* 
 * Script written for importing the Meals of the next week from the Webservice of Studentenwerk Niederbayern/Oberpfalz.
 * Usage: Use this Script in Combination with Scheduling, e.g. the Heroku Scheduler.
 * Set the Scheduler to run this Script every Sunday, to get the Meals of the next week and persist them in the own DB.
 */

const pool = require('../DBConnection');
const fetch = require('node-fetch');

function getCalendarWeek(date) {
  let first = new Date(date.getFullYear(), 0, 1);
  let prev = (date - first) / 86400000;
  return Math.ceil((prev + first.getDay() + 1) / 7);
}

/* Fills the Meal Table with the meal data for the next week, retrieved from the webservice of Studentenwerk Niederbayern/Oberpfalz */
async function fillMealTableWithDataFromNextWeek() {
  //let currentDate = new Date();
  //let nextWeek = getCalendarWeek(currentDate) + 1;
  let nextWeek = 47;
  try {
    let response = await fetch('https://www.stwno.de/infomax/daten-extern/csv/UNI-R/' + nextWeek + '.csv');
    let responseText = await response.text();
    let meals = parseCSV(responseText);
    await insertIntoDatabase(meals, nextWeek);
  } catch (error) {
    console.error(error);
  }
}

/* Inserts the Meal Objects into the Meal Database */
async function insertIntoDatabase(meals, calendarWeek) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (var i = 0; i < meals.length; i++) {
      let date = parseDate(meals[i].datum);
      let postgresDateString = parseJSDateToPostgresFormat(date.toDateString());
      let weekDay = getWeekDayAsString(date);
      let query = "Insert Into Meal (mealName, category, studentPrice, employeePrice, guestPrice, day, weekDay, calendarWeek, month, year, date) "
        + "Values ('" + meals[i].name + "', '" + meals[i].warengruppe + "', " + parseFloat(meals[i].stud.replace(',', '.')) 
        + ", " + parseFloat(meals[i].bed.replace(',', '.')) + ", " + parseFloat(meals[i].gast.replace(',', '.')) + ", "
        + date.getDate() + ", '" + weekDay + "', " + calendarWeek + ", " + date.getMonth() + ", " + date.getFullYear() 
        + ", TO_DATE('" + postgresDateString + "', 'DD Mon YYYY'));";
      await client.query(query);
    }
    await client.query('COMMIT');
  } catch (error) {
    console.error(error);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
}

/* Get Date Object from german Date Format */
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

/* Parse JS Date Object to Postgres Date Format */
// Wanted Format: to_date('05 Dec 2000', 'DD Mon YYYY')
// JS Date Format: Mon Mar 04 2019
function parseJSDateToPostgresFormat(dateString) {
  var components = dateString.split(" ");
  return components[2] + " " + components[1] + " " + components[3];
}

/* Get the weekday of a date object */
function getWeekDayAsString(date) {
  let weekDayInt = date.getDay();
  switch (weekDayInt) {
    case 0:
      return "Su";
    case 1:
      return "Mo";
    case 2:
      return "Tu";
    case 3:
      return "We";
    case 4:
      return "Th";
    case 5:
      return "Fr";
    case 6:
      return "Sa";
  }
}

/* Parse CSV to Array which contains Meal Objects */
function parseCSV(csv) {
  let meals = [];
  let lines = csv.split('\n');
  if (Array.isArray(lines) && lines.length) {
    let keys = lines[0].replace(/\r/g, "").split(";");
    for (var i = 1; i < lines.length; i++) {
      let values = lines[i].replace(/\r/g, "").split(";");
      if (Array.isArray(values) && values.length > 1) {
        let meal = initializeMealObject(values, keys);
        meals.push(meal);
      }
    }
  }
  return meals;
}

function initializeMealObject(csvValues, csvKeys) {
  let meal = {};
  for (var i = 0; i < csvValues.length; i++) {
    meal[csvKeys[i]] = csvValues[i];
  }
  return meal;
}

async function main() {
  try {
    await fillMealTableWithDataFromNextWeek();
    console.log("New Meals imported in the DB.");
  } catch (error) {
    console.error(error);
  }
}

main();