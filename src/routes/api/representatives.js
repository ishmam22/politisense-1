import express from 'express'

const router = express.Router()
const controller = require('../../controllers/Controller')

// @route post api/representatives/:riding/getRepresentative
// @desc  get representative by riding
// @access Public
router.get('/:riding/getRepresentative', controller.getRepresentativeByRiding)

router.post('/:name/getPastRepresentativeId', controller.getPastRepresentativeId)
// @route post api/representatives/:riding/getRepresentative
// @desc  get representative by riding
// @access Public
router.get('/getCabinetMinisters', controller.getCabinetMinisters)

// @route post api/getAllRepresentatives
// @desc  get all representatives currently stored in DB
// @access Public
router.get('/getAllRepresentatives', controller.getAllRepresentatives)

router.get('/:name/getRepresentativesInfo', controller.getRepresentativesInfo)

// @route post api/getPastRepresentatives
// @desc  get all past representatives for a given riding
// @access Public
router.get('/:riding/getPastRepresentatives', controller.getPastRepresentatives)

// @route post api/:representative/getRepresentativeId
// @desc get id of representative
// @access Public
router.get(
  '/:representative/getRepresentativeId',
  controller.getRepresentativeId
)

router.get('/representative/representative/:name', controller.getImageData)

router.get('/getAllRepsFromAllParliaments', controller.getAllRepsFromAllParliaments)

module.exports = router
