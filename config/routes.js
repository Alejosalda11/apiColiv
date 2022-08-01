const router = require('express').Router()
const { isUserAuthorized, isAdminAuthorized } = require('./policies')
const { 
  HomeController, UserController, ModelController, InputController, AuthController,
  AdminController, InvetoryController, EspacioController, ReservationController,
  ServiceController, EventController,
} = require('../api/controllers')

// Home
router.get('/test', HomeController.test)
router.get('/test/auth/user', isUserAuthorized, HomeController.testAuth)
router.get('/test/auth/admin', isAdminAuthorized, HomeController.testAuth)

// Auth
router.post('/auth/login/user', AuthController.UserLogin)
router.post('/auth/login/admin', AuthController.AdminLogin)

// User
router.get('/user', UserController.fetch)
router.get('/user/table', UserController.fetchVueTable)
router.post('/user', UserController.create)
router.put('/user', UserController.update)
router.delete('/user/:_id', UserController.delete)
router.get('/user/:_id', UserController.getOne)

// Admin
router.get('/admin', AdminController.fetch)
router.post('/admin', AdminController.create)
router.put('/admin', AdminController.update)
router.delete('/admin/:_id', AdminController.delete)
router.get('/admin/:_id', AdminController.getOne)

// Invetory
router.get('/inventory', InvetoryController.fetch)
router.post('/inventory', InvetoryController.create)
router.put('/inventory', InvetoryController.update)
router.delete('/inventory/:_id', InvetoryController.delete)
router.get('/inventory/:_id', InvetoryController.getOne)

// Espacio
router.get('/espacio', EspacioController.fetch)
router.post('/espacio', EspacioController.create)
router.put('/espacio', EspacioController.update)
router.delete('/espacio/:_id', EspacioController.delete)
router.get('/espacio/:_id', EspacioController.getOne)

// Reservation
router.get('/reservation', ReservationController.fetch)
router.post('/reservation', ReservationController.create)
router.put('/reservation', ReservationController.update)
router.delete('/reservation/:_id', ReservationController.delete)
router.get('/reservation/:_id', ReservationController.getOne)

// Service
router.get('/service', ServiceController.fetch)
router.post('/service', ServiceController.create)
router.put('/service', ServiceController.update)
router.delete('/service/:_id', ServiceController.delete)
router.get('/service/:_id', ServiceController.getOne)

// Event
router.get('/event', EventController.fetch)
router.post('/event', EventController.create)
router.put('/event', EventController.update)
router.delete('/event/:_id', EventController.delete)
router.get('/event/:_id', EventController.getOne)

// Input
router.get('/input', InputController.fetch)
router.get('/inputs/table/:model', InputController.fetchVueTable)
router.post('/input', InputController.create)
router.put('/input', InputController.update)
router.delete('/input/:_id', InputController.delete)
router.get('/input/:_id', InputController.getOne)

// Model
router.get('/model', ModelController.listModels)
router.get('/model/table', ModelController.listModelsVueTable)
router.get('/model/:schemaName', ModelController.getModel)
router.get('/model/table/:schemaName', ModelController.getModelVueTable)
router.post('/model/field/add', ModelController.addField)
router.post('/model/field/remove', ModelController.removeField)

module.exports = router