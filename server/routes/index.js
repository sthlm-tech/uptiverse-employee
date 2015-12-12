var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db model
var Employee = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {
  
  var jsonData = {
  	'name': 'Initial Uptiverse-Employee based on Node Express Bolierplate',
  	'api-status':'Err, yeah!'
  }

  // respond with json data
  res.json(jsonData)
});

// simple route to show an HTML page
router.get('/sample-page', function(req,res){
  res.render('sample.html')
})

// /**
//  * POST '/api/create'
//  * Receives a POST request of the new user and location, saves to db, responds back
//  * @param  {Object} req. An object containing the different attributes of the Person
//  * @return {Object} JSON
//  */

router.post('/api/create', function(req, res){

    console.log(req.body);

    // pull out the information from the req.body
    
    var employeeNumber = req.body.employeeNumber;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var birthDate = req.body.birthDate; 
    var email = req.body.email;
    var phone = req.body.phone; 
    var internalRoles = req.body.internalRoles.split(",");
      

    // hold all this data in an object
    // this object should be structured the same way as your db model
    var employeeObj = new  {
        employeeNumber: employeeNumber,
	firstName: firstName,
	lastName:lastName,
	birthDate: birthDate,
	email: email,
	phone: phone,
	internalRoles: internalRoles
    };


    // create a new employee model instance, passing in the object
    var employee = new Employee(employeeObj);

    // now, save that employee instance to the database
    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save    
    employee.save(function(err,data){
      // if err saving, respond back with error
      if (err){
        var error = {status:'ERROR', message: 'Error saving enpployee'};
        return res.json(error);
      }

      console.log('saved a new employee!');
      console.log(data);

      // now return the json data of the new employee
      var jsonData = {
        status: 'OK',
        employee: data
      }

      return res.json(jsonData);

    })  
});

// /**
//  * GET '/api/get/:id'
//  * Receives a GET request specifying the employee to get
//  * @param  {String} req.param('id'). The employeeId
//  * @return {Object} JSON
//  */

router.get('/api/get/:id', function(req, res){

  var requestedId = req.param('id');

  // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
  Employee.findById(requestedId, function(err,data){

    // if err or no user found, respond with error 
    if(err || data == null){
      var error = {status:'ERROR', message: 'Could not find that employee'};
       return res.json(error);
    }

    // otherwise respond with JSON data of the employee
    var jsonData = {
      status: 'OK',
      employee: data
    }

    return res.json(jsonData);
  
  })
})

// /**
//  * GET '/api/get'
//  * Receives a GET request to get all employee details
//  * @return {Object} JSON
//  */

router.get('/api/get', function(req, res){

  // mongoose method to find all, see http://mongoosejs.com/docs/api.html#model_Model.find
  Employee.find(function(err, data){
    // if err or no employees found, respond with error 
    if(err || data == null){
      var error = {status:'ERROR', message: 'Could not find employees'};
      return res.json(error);
    }

    // otherwise, respond with the data 

    var jsonData = {
      status: 'OK',
      employees: data
    } 

    res.json(jsonData);

  })

})

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the employee to update, updates db, responds back
//  * @param  {String} req.param('id'). The employeeId to update
//  * @param  {Object} req. An object containing the different attributes of the Employee
//  * @return {Object} JSON
//  */

router.post('/api/update/:id', function(req, res){

   var requestedId = req.param('id');

   var dataToUpdate = {}; // a blank object of data to update

    // pull out the information from the req.body and add it to the object to update
    var employeeNumber,firstName, lastName, birthDate, email, phone;
   

    // we only want to update any field if it actually is contained within the req.body
    // otherwise, leave it alone.
    if(req.body.employeeNumber) {
      employeeNumber = req.body.employeeNumber;
      // add to object that holds updated data
      dataToUpdate['employeeNumber'] = employeeNumber;
    }
    if(req.body.firstName) {
      firstName = req.body.firstName;
      // add to object that holds updated data
      dataToUpdate['firstName'] = firstName;
    }
    if(req.body.lastName) {
      lastName = req.body.lastName;
      // add to object that holds updated data
      dataToUpdate['lastName'] = lastName;
      
    }
    if(req.body.birthDate) {
      birthDate = req.body.birthDate;
      // add to object that holds updated data
      dataToUpdate['birthDate'] = birthDate;
    }
    
    if(req.body.email) {
        email = req.body.email;
      // add to object that holds updated data
      dataToUpdate['email'] = email;
    }

    if(req.body.phone) {
        phone = req.body.phone;
      // add to object that holds updated data
      dataToUpdate['phone'] = phone;
    }
    
    var internalRoles = []; // blank array to hold tags
    if(req.body.internalRoles){
      internalRoles = req.body.internalRoles.split(","); // split string into array
      // add to object that holds updated data
      dataToUpdate['internalRoles'] = internalRoles;
    }


    console.log('the data to update is ' + JSON.stringify(dataToUpdate));

    // now, update that employee
    // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
    Employee.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
      // if err saving, respond back with error
      if (err){
        var error = {status:'ERROR', message: 'Error updating employee'};
        return res.json(error);
      }

      console.log('updated the employee!');
      console.log(data);

      // now return the json data of the new person
      var jsonData = {
        status: 'OK',
        employee: data
      }

      return res.json(jsonData);

    })

})

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the employee to delete
 * @param  {String} req.param('id'). The employeeId
 * @return {Object} JSON
 */

router.get('/api/delete/:id', function(req, res){

  var requestedId = req.param('id');

  // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
  Employee.findByIdAndRemove(requestedId,function(err, data){
    if(err || data == null){
      var error = {status:'ERROR', message: 'Could not find that employee to delete'};
      return res.json(error);
    }

    // otherwise, respond back with success
    var jsonData = {
      status: 'OK',
      message: 'Successfully deleted id ' + requestedId
    }

    res.json(jsonData);

  })

})

module.exports = router;
