import { pool } from '../config/database.js'

const baseEventQuery = `
    SELECT
        events.id,
        events.title,
        events.description,
        events.genre,
        events.image,
        events.event_date,
        events.location_id,
        locations.name AS location_name,
        locations.slug AS location_slug
    FROM events
    JOIN locations ON events.location_id = locations.id
`

const handleServerError = (res, error, message) => {
    console.error(message, error)
    res.status(500).json({ error: message })
}

export const getAllEvents = async (_, res) => {
    try {
        const { rows } = await pool.query(`${baseEventQuery} ORDER BY events.event_date ASC`)
        res.status(200).json(rows)
    } catch (error) {
        handleServerError(res, error, 'Unable to fetch events.')
    }
}

export const getEventById = async (req, res) => {
    try {
        const { rows } = await pool.query(`${baseEventQuery} WHERE events.id = $1`, [req.params.id])

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Event not found.' })
        }

        return res.status(200).json(rows[0])
    } catch (error) {
        return handleServerError(res, error, 'Unable to fetch this event.')
    }
}

export const getEventsByLocationSlug = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `${baseEventQuery} WHERE locations.slug = $1 ORDER BY events.event_date ASC`,
            [req.params.slug]
        )

        res.status(200).json(rows)
    } catch (error) {
        handleServerError(res, error, 'Unable to fetch events for this location.')
    }
}