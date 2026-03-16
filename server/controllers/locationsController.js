import { pool } from '../config/database.js'

const handleServerError = (res, error, message) => {
    console.error(message, error)
    res.status(500).json({ error: message })
}

export const getAllLocations = async (_, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(rows)
    } catch (error) {
        handleServerError(res, error, 'Unable to fetch locations.')
    }
}

export const getLocationBySlug = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM locations WHERE slug = $1', [req.params.slug])

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Location not found.' })
        }

        return res.status(200).json(rows[0])
    } catch (error) {
        return handleServerError(res, error, 'Unable to fetch this location.')
    }
}