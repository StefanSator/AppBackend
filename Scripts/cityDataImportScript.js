/* Script written for automatic import of de_cities.json into Heroku Postgres Database */

var cities = require('./de_cities.json');
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

async function createCityTable() {
    try {
        const client = await pool.connect();
        let query = 'Create Table City (cityId Serial Primary Key, city VARCHAR(200) NOT NULL, admin VARCHAR(200) NOT NULL, country VARCHAR(200) NOT NULL, '
            + "latitude Decimal NOT NULL, longitude Decimal NOT NULL);";
        await client.query(query);
        client.release();
    } catch (error) {
        console.error(error);
    }
};

async function insertDataIntoCityTable() {
    try {
        const client = await pool.connect();
        for (var i = 0; i < cities.length; i++) {
            let query = `Insert Into City(city, admin, country, latitude, longitude) VALUES `
                + `('${cities[i].city}', '${cities[i].admin}', '${cities[i].country}', ${cities[i].lat}, ${cities[i].lng});`;
            await client.query(query);
        }
        client.release();
    } catch (error) {
        console.error(error);
    }
};

async function main() {
    try {
        await createCityTable();
        console.log("City Table created.");
        await insertDataIntoCityTable();
        console.log("Data into Table inserted.");
    } catch (err) {
        console.error(err);
    }
};

main();