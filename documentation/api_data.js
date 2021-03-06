define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "/Users/stefansator/Desktop/Bachelorarbeit/Sources/MitfahrgelegenheitenBackend/Routes/doc/main.js",
    "groupTitle": "/Users/stefansator/Desktop/Bachelorarbeit/Sources/MitfahrgelegenheitenBackend/Routes/doc/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/customers?email=:email",
    "title": "Get Customer",
    "group": "Customer_Service",
    "name": "GetCustomer",
    "description": "<p>Route which returns customer information.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of a registered user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "customerid",
            "description": "<p>Customer ID of the registered customer.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the customer.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./CustomerService.js",
    "groupTitle": "Customer_Service"
  },
  {
    "type": "post",
    "url": "/customers/validate",
    "title": "Check Login",
    "group": "Customer_Service",
    "name": "LoginCustomer",
    "description": "<p>Route for validating the login of a Customer.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of a registered user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Raw password of a registered user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "successful",
            "description": "<p>Tells if Users login form is correct. If this is false don't allow user to log into the app.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "sessiontoken",
            "description": "<p>Token returned from Service. Used by the backend to identify a user. Store this, because it is needed for identifying a registered user in subsequent rest calls. Returns -1 if validation was unsuccessful.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./CustomerService.js",
    "groupTitle": "Customer_Service"
  },
  {
    "type": "post",
    "url": "/customers",
    "title": "Register Customer",
    "group": "Customer_Service",
    "name": "RegisterCustomer",
    "description": "<p>Route for registration of a new Customer.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user to register.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Raw password of the user to register.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Unique Email of the user to register.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "customerid",
            "description": "<p>Token returned from Service. Used by the backend to identify a user. Store this, because it is needed for identifying a registered user in subsequent rest calls.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./CustomerService.js",
    "groupTitle": "Customer_Service"
  },
  {
    "type": "post",
    "url": "/lifts/book/accept",
    "title": "Accept Booking Request",
    "group": "Lift_Service",
    "name": "AcceptBookingRequest",
    "description": "<p>Route for accepting a Lift-Request made by a other user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the user, who has sent the booking request.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "liftId",
            "description": "<p>ID of the lift, the user has sent a booking request for.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "rejected",
            "description": "<p>True, if Booking Acception was rejected, else false.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rejectionReason",
            "description": "<p>If rejected is true, here is the reason why it was rejected.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "delete",
    "url": "/lifts/book",
    "title": "Delete Booking",
    "group": "Lift_Service",
    "name": "DeleteBooking",
    "description": "<p>Route for deleting a Booking-Request of a user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the user, who wants to delete the booking of a lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "liftId",
            "description": "<p>ID of the lift, the user wants to delete the booking from.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "get",
    "url": "/lifts/destination/cities?state=:state",
    "title": "Get Cities",
    "group": "Lift_Service",
    "name": "GetCities",
    "description": "<p>Route for getting all cities for a specified federal state.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>Name of the federal state. Valid state names are returned from the Get States Route.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "cities",
            "description": "<p>List containing all cities of the state.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "cities.cityid",
            "description": "<p>ID of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cities.city",
            "description": "<p>Name of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cities.state",
            "description": "<p>Name of the federal state, which the city belongs to.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cities.latitude",
            "description": "<p>Latitude of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cities.longitude",
            "description": "<p>Longitude of the city.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "get",
    "url": "/lifts/event/faculties",
    "title": "Get Faculties",
    "group": "Lift_Service",
    "name": "GetFaculties",
    "description": "<p>Route for getting all faculties of OTH Regensburg.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "faculties",
            "description": "<p>List containing all faculties of OTH Regensburg.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "faculties.facultyid",
            "description": "<p>ID of the faculty.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "faculties.name",
            "description": "<p>Name of the faculty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "get",
    "url": "/lifts/destination/states",
    "title": "Get States",
    "group": "Lift_Service",
    "name": "GetFederalStates",
    "description": "<p>Route for getting all federal states of Germany.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "states",
            "description": "<p>List containing federal states of Germany.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "states.state",
            "description": "<p>Name of the state.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "get",
    "url": "/lifts/book/input",
    "title": "Get Post Input",
    "group": "Lift_Service",
    "name": "GetPostInput",
    "description": "<p>Route for getting Lift-Requests of a user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "requestinput",
            "description": "<p>Array of Booking-Request of other users.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestinput.liftid",
            "description": "<p>ID of the lift the user wants to book.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestinput.startcity",
            "description": "<p>Start Point of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestinput.targetcity",
            "description": "<p>Target Point of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestinput.userid",
            "description": "<p>ID of the user, who wants to book the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestinput.username",
            "description": "<p>Name of the user, who wants to book the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestinput.email",
            "description": "<p>Contact Email of the user, who wants to book the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "requestinput.accepted",
            "description": "<p>True, if user is invited to the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestinput.eventid",
            "description": "<p>ID of the event of the lift. Null, if lift is a private trip.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestinput.eventtitle",
            "description": "<p>Name of the event of the lift. Null, if lift is a private trip.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestinput.day",
            "description": "<p>Day.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestinput.month",
            "description": "<p>Month.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestinput.year",
            "description": "<p>Year.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestinput.hour",
            "description": "<p>Hour.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestinput.minutes",
            "description": "<p>Minutes.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "get",
    "url": "/lifts/book/output",
    "title": "Get Post Output",
    "group": "Lift_Service",
    "name": "GetPostOutput",
    "description": "<p>Route for getting Booking-Requests sent by the specified user to other users.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "requestoutput",
            "description": "<p>Array of Booking-Request sent from the specified user to other users.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestoutput.liftid",
            "description": "<p>ID of the lift the user wants to book.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestoutput.startcity",
            "description": "<p>Start Point of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestoutput.targetcity",
            "description": "<p>Target Point of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestoutput.userid",
            "description": "<p>ID of the user, who advertised the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestoutput.username",
            "description": "<p>Name of the user, who advertised the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestoutput.email",
            "description": "<p>Contact Email of the user, who advertised the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "requestoutput.accepted",
            "description": "<p>True, if user is invited to the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestoutput.eventid",
            "description": "<p>ID of the event of the lift. Null, if lift is a private trip.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requestoutput.eventtitle",
            "description": "<p>Name of the event of the lift. Null, if lift is a private trip.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestoutput.day",
            "description": "<p>Day.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestoutput.month",
            "description": "<p>Month.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestoutput.year",
            "description": "<p>Year.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestoutput.hour",
            "description": "<p>Hour.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "requestoutput.minutes",
            "description": "<p>Minutes.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "post",
    "url": "/lifts/destination/recommendedprice",
    "title": "Get Recommended Price",
    "group": "Lift_Service",
    "name": "GetRecommendedPrice",
    "description": "<p>Route for getting the recommended price for a lift advertisement. Based on distance and number of passengers. Distance calculated by Vincenty Algorithm.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "point1",
            "description": "<p>Start of the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "point1.lat",
            "description": "<p>Latitude of point1.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "point1.lng",
            "description": "<p>Longitude of point1.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "point2",
            "description": "<p>Start of the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "point2.lat",
            "description": "<p>Latitude of point2.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "point2.lng",
            "description": "<p>Longitude of point2.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "passengers",
            "description": "<p>Number of passengers.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "price",
            "description": "<p>Price Recommendation for the lift.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "post",
    "url": "/lifts/book",
    "title": "Post Booking",
    "group": "Lift_Service",
    "name": "PostBooking",
    "description": "<p>Route for posting a Booking Request on a specified Lift by a specified user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the user, who wants to book the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "liftId",
            "description": "<p>ID of the lift, the user wants to book.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "post",
    "url": "/lifts/new",
    "title": "Post Lift",
    "group": "Lift_Service",
    "name": "PostLift",
    "description": "<p>Route for posting a new Lift.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "lift",
            "description": "<p>Object containing information about the lift to post.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.user",
            "description": "<p>ID of the user who wants to post the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "lift.start",
            "description": "<p>Start City of the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.start.cityId",
            "description": "<p>ID of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lift.start.cityName",
            "description": "<p>Name of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lift.start.state",
            "description": "<p>State, which the city belongs to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lift.start.lat",
            "description": "<p>Latitude of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lift.start.lng",
            "description": "<p>Longitude of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "lift.target",
            "description": "<p>Target City of the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.target.cityId",
            "description": "<p>ID of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lift.target.cityName",
            "description": "<p>Name of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lift.target.state",
            "description": "<p>State, which the city belongs to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lift.target.lat",
            "description": "<p>Latitude of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lift.target.lng",
            "description": "<p>Longitude of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.passengers",
            "description": "<p>Number of passengers in the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.price",
            "description": "<p>Price for the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "lift.event",
            "description": "<p>Event for which the lift is advertised. Can also be null.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lift.event.eventTitle",
            "description": "<p>Title of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lift.event.eventDescription",
            "description": "<p>Description of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "lift.event.faculties",
            "description": "<p>List of faculties, for which the event is interesting.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.event.faculties.facultyId",
            "description": "<p>ID of the faculty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lift.event.faculties.name",
            "description": "<p>Name of the faculty.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "lift.datetime",
            "description": "<p>Datetime Informations regarding the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.datetime.day",
            "description": "<p>Day, e.g. 12.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.datetime.month",
            "description": "<p>Month, e.g. 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.datetime.year",
            "description": "<p>Year, e.g. 2019.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.datetime.hour",
            "description": "<p>Hour, e.g. 8.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "lift.datetime.minutes",
            "description": "<p>Minutes, e.g. 30.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lift.datetime.dateString",
            "description": "<p>String representing the date of the lift. Format: DDMMYYYY.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "post",
    "url": "/lifts/book/refuse",
    "title": "Refuse Booking Request",
    "group": "Lift_Service",
    "name": "RefuseBookingRequest",
    "description": "<p>Route for refusing Booking-Requests from a other user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the user, who has sent the booking request.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "liftId",
            "description": "<p>ID of the lift, the user has sent a booking request for.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "post",
    "url": "/lifts/search",
    "title": "Search Lifts",
    "group": "Lift_Service",
    "name": "SearchLifts",
    "description": "<p>Route for getting Lift Recommendations specified through a submitted search request.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "searchrequest",
            "description": "<p>Search Request for searching the lifts.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "searchrequest.place",
            "description": "<p>Destination of the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "searchrequest.place.cityId",
            "description": "<p>ID of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchrequest.place.cityName",
            "description": "<p>Name of the city.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchrequest.place.state",
            "description": "<p>State, which the place belongs to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "searchrequest.place.lat",
            "description": "<p>Latitude of the Destination.</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "searchrequest.place.lng",
            "description": "<p>Longitude of the Destination.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "searchrequest.datetime",
            "description": "<p>Datetime Informations regarding the lift.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "searchrequest.datetime.day",
            "description": "<p>Day, e.g. 12.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "searchrequest.datetime.month",
            "description": "<p>Month, e.g. 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "searchrequest.datetime.year",
            "description": "<p>Year, e.g. 2019.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "searchrequest.datetime.hour",
            "description": "<p>Hour, e.g. 8.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "searchrequest.datetime.minutes",
            "description": "<p>Minutes, e.g. 30.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchrequest.datetime.dateString",
            "description": "<p>String representing the date of the lift. Format: DDMMYYYY.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "searchrequest.isEventSearch",
            "description": "<p>True, if user wants to search for lifts to events. False, if user wants to search for private lifts.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "searchrequest.faculties",
            "description": "<p>Events interesting for the specified Faculties, should be searched.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "searchrequest.faculties.facultyId",
            "description": "<p>ID of the faculty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchrequest.faculties.name",
            "description": "<p>Name of the faculty.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "searchrequest.radius",
            "description": "<p>Radius Search for lifts within the specified radius.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "searchresponse",
            "description": "<p>Array containing lifts fulfilling the search request.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "searchresponse.lift",
            "description": "<p>Lift, which fullfills the search request.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.userid",
            "description": "<p>ID of the Advertiser of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.lift.username",
            "description": "<p>Name of the Avertiser of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.lift.email",
            "description": "<p>Email of the Advertiser of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.passengers",
            "description": "<p>Number of passengers.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.price",
            "description": "<p>Price of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.startid",
            "description": "<p>ID of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.lift.startcity",
            "description": "<p>Name of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.lift.startstate",
            "description": "<p>State, which the city belongs to.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "searchresponse.lift.startlatitude",
            "description": "<p>Latitude of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "searchresponse.lift.startlongitude",
            "description": "<p>Longitude of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.targetid",
            "description": "<p>ID of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.lift.targetcity",
            "description": "<p>Name of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.lift.targetstate",
            "description": "<p>State, which the city belongs to.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "searchresponse.lift.targetlatitude",
            "description": "<p>Latitude of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "searchresponse.lift.targetlongitude",
            "description": "<p>Longitude of the city.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.eventid",
            "description": "<p>ID of the event.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.lift.eventdescription",
            "description": "<p>Description of the Event of the lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.lift.eventtitle",
            "description": "<p>Title of the Event of the Lift.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.day",
            "description": "<p>Day of the trip.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.month",
            "description": "<p>Month of the trip.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.year",
            "description": "<p>Year of the trip.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.hour",
            "description": "<p>Hour of the day.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.lift.minutes",
            "description": "<p>Minutes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "searchresponse.faculties",
            "description": "<p>Faculties, for which the Lift is interesting. Null, if lift reason is a private trip.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "searchresponse.faculties.facultyId",
            "description": "<p>ID of the faculty.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "searchresponse.faculties.name",
            "description": "<p>Name of the faculty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./LiftService.js",
    "groupTitle": "Lift_Service"
  },
  {
    "type": "delete",
    "url": "/meals/likes",
    "title": "Delete All Likes",
    "group": "Meal_Service",
    "name": "DeleteAllLikes",
    "description": "<p>Route for deleting all likes or dislikes for a specified User.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "sessionId",
            "description": "<p>ID of the logged in user. Is at the moment the userId, which was returned from the backend during the login.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "successful",
            "description": "<p>True, if deleting the Like was successful.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./MealService.js",
    "groupTitle": "Meal_Service"
  },
  {
    "type": "delete",
    "url": "/meals/likes",
    "title": "Delete Like",
    "group": "Meal_Service",
    "name": "DeleteLike",
    "description": "<p>Route for deleting likes or dislikes for a specified Meal</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "sessionId",
            "description": "<p>User ID of the logged in user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "mealId",
            "description": "<p>ID of the meal to like or dislike</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "successful",
            "description": "<p>True, if deleting the Like was successful.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./MealService.js",
    "groupTitle": "Meal_Service"
  },
  {
    "type": "get",
    "url": "/meals/userlikes?userid=:userid",
    "title": "Get All Likes of Customer",
    "group": "Meal_Service",
    "name": "GetAllLikes",
    "description": "<p>Route for getting all Meals which a specified user liked or dislikes.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userid",
            "description": "<p>ID of a registered user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "mealid",
            "description": "<p>ID of a meal.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "state",
            "description": "<p>State of the user. 0: neutral. 1: likes the meal. -1: dislikes the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "likes",
            "description": "<p>Total number of likes of the specified meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dislikes",
            "description": "<p>Total number of dislikes of the specified meal.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./MealService.js",
    "groupTitle": "Meal_Service"
  },
  {
    "type": "get",
    "url": "/meals/likes?mealid=:mealid&userid=:userid",
    "title": "Get Like State",
    "group": "Meal_Service",
    "name": "GetLikeState",
    "description": "<p>Route for getting number of likes and dislikes of a specified meal. It also returns the status of the user, which explains if user likes / dislikes or is neutral (not liked, but also not disliked) to the specified Meal.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userid",
            "description": "<p>ID of a registered user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "mealid",
            "description": "<p>ID of a meal.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "state",
            "description": "<p>State of the user. 0: neutral. 1: likes the meal. -1: dislikes the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "likes",
            "description": "<p>Total number of likes of the specified meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dislikes",
            "description": "<p>Total number of dislikes of the specified meal.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./MealService.js",
    "groupTitle": "Meal_Service"
  },
  {
    "type": "get",
    "url": "/meals?weekDay=:weekDay&calendarWeek=:calendarWeek&year=:year",
    "title": "Get Mensa Meals",
    "group": "Meal_Service",
    "name": "GetMeals",
    "description": "<p>Route for getting meals for a specified date.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "weekDay",
            "description": "<p>Day of current week. Valid Params: Mo, Tu, We, Th, Fr.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "calendarWeek",
            "description": "<p>Calendar Week.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "year",
            "description": "<p>Year.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "meals",
            "description": "<p>List of meals for the specified date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meals.mealid",
            "description": "<p>ID of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.mealname",
            "description": "<p>Name of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.category",
            "description": "<p>Category of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.studentprice",
            "description": "<p>Student Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.employeeprice",
            "description": "<p>Employee Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.guestprice",
            "description": "<p>Guest Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meals.day",
            "description": "<p>Day of month.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.weekday",
            "description": "<p>Weekday.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meals.calendarweek",
            "description": "<p>Calendar Week.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meals.month",
            "description": "<p>Month.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "meals.year",
            "description": "<p>Year.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.date",
            "description": "<p>Date String.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.likes",
            "description": "<p>Number of likes of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.dislikes",
            "description": "<p>Number of dislikes of the meal.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./MealService.js",
    "groupTitle": "Meal_Service"
  },
  {
    "type": "get",
    "url": "/meals/popular?weekday=:weekday&calendarweek=:calendarweek&year=:year",
    "title": "Get Most Popular and Unpopular Meal",
    "group": "Meal_Service",
    "name": "GetMostPopular",
    "description": "<p>Route for getting the most popular Meal and the most unpopular Meal of the specified Date.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "weekday",
            "description": "<p>Day of current week. Valid Params: Mo, Tu, We, Th, Fr.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "calendarweek",
            "description": "<p>Calendar Week.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "year",
            "description": "<p>Year.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "popular",
            "description": "<p>Most popular Meal of current day.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "popular.mealid",
            "description": "<p>ID of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.mealname",
            "description": "<p>Name of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.category",
            "description": "<p>Category of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.studentprice",
            "description": "<p>Student Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.employeeprice",
            "description": "<p>Employee Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.guestprice",
            "description": "<p>Guest Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "popular.day",
            "description": "<p>Day of month.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.weekday",
            "description": "<p>Weekday.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "popular.calendarweek",
            "description": "<p>Calendar Week.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "popular.month",
            "description": "<p>Month.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "popular.year",
            "description": "<p>Year.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.date",
            "description": "<p>Date String.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.likes",
            "description": "<p>Number of likes of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.dislikes",
            "description": "<p>Number of dislikes of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popular.like_rank",
            "description": "<p>Rank of the meal regarding its likes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "unpopular",
            "description": "<p>Most unpopular Meal of current day.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "unpopular.mealid",
            "description": "<p>ID of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.mealname",
            "description": "<p>Name of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.category",
            "description": "<p>Category of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.studentprice",
            "description": "<p>Student Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.employeeprice",
            "description": "<p>Employee Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.guestprice",
            "description": "<p>Guest Price.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "unpopular.day",
            "description": "<p>Day of month.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.weekday",
            "description": "<p>Weekday.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "unpopular.calendarweek",
            "description": "<p>Calendar Week.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "unpopular.month",
            "description": "<p>Month.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "unpopular.year",
            "description": "<p>Year.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.date",
            "description": "<p>Date String.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.likes",
            "description": "<p>Number of likes of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.dislikes",
            "description": "<p>Number of dislikes of the meal.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unpopular.dislike_rank",
            "description": "<p>Rank of the meal regarding its dislikes.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./MealService.js",
    "groupTitle": "Meal_Service"
  },
  {
    "type": "post",
    "url": "/meals/likes",
    "title": "Post Like",
    "group": "Meal_Service",
    "name": "PostLike",
    "description": "<p>Route for posting likes or dislikes for a specified Meal.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of a registered user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "mealId",
            "description": "<p>ID of the meal to like or dislike</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the Like. Like: 1. Dislike: -1.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "successful",
            "description": "<p>True, if posting the Like was successful.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./MealService.js",
    "groupTitle": "Meal_Service"
  }
] });
