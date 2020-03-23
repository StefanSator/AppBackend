/* 
 * A Script for automatic import of meal Data from calendar week 2 to 46 of year 2019 
 * into the PostgreSQL Database running on Heroku. The Meal Data is retrieved from Service
 * of Studentenwerk Niederbayern/Oberpfalz. Was written for one-time usage!
 */

const { Pool } = require("pg");
const fetch = require('node-fetch');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* Creates the Meal Table */
async function createMealTable() {
  try {
    const client = await pool.connect()
    let query = "Create Table Meal (mealId Serial Primary Key, mealName Varchar(200) NOT NULL, "
      + "category Varchar(10), studentPrice Numeric(7, 2) NOT NULL, employeePrice Numeric(7, 2) NOT NULL, guestPrice Numeric(7, 2) NOT NULL, "
      + "day Integer, weekDay Varchar(20), calendarWeek Integer, month Integer, year Integer, date Date);"
    await client.query(query);
    client.release();
  } catch (err) {
    console.error(err);
  }
}

/* 
 * Example of a Meal Object:
 * {"datum":"15.11.2019","tag":"Fr","warengruppe":"N2","name":"Chocolat de Coco (F,G)","kennz":"V","preis":"1,10 / 1,40 / 1,60","stud":"1,10","bed":"1,40","gast":"1,60"}
 */

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

/* Fills the Meal Table with the appropriate data from the webservice of Studentenwerk Niederbayern/Oberpfalz */
async function fillMealTableWithData(calendarWeek) {
  /* Fill Table with data from calendar week 2 to 46 of year 2019 */
  while (calendarWeek <= 46) {
    console.log('Calendar Week: ' + calendarWeek);
    try {
      let response = await fetch('https://www.stwno.de/infomax/daten-extern/csv/UNI-R/' + calendarWeek + '.csv');
      let responseText = await response.text();
      let meals = parseCSV(responseText);
      await insertIntoDatabase(meals, calendarWeek);
    } catch (error) {
      console.error(error);
    }
    calendarWeek++;
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
  //console.log(JSON.stringify(meals) + '\n\n');
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
  let calendarWeek = 2; // begin at calendar week 2 of year 2019
  try {
    await createMealTable();
    console.log("Meal Table created.");
    await fillMealTableWithData(calendarWeek);
    console.log("Meal Table filled with data.");
  } catch (error) {
    console.error(error);
  }
}

main();