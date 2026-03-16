import express from 'express'
import { getEventsByLocationSlug } from '../controllers/eventsController.js'
import { getAllLocations, getLocationBySlug } from '../controllers/locationsController.js'

const router = express.Router()

router.get('/', getAllLocations)
router.get('/:slug', getLocationBySlug)
router.get('/:slug/events', getEventsByLocationSlug)

export default router