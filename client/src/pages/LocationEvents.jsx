import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { slug } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadLocationData = async () => {
            try {
                setIsLoading(true)
                const [locationData, eventsData] = await Promise.all([
                    LocationsAPI.getLocationBySlug(slug),
                    EventsAPI.getEventsByLocation(slug)
                ])

                setLocation(locationData)
                setEvents(eventsData)
                setError('')
            }
            catch (loadError) {
                setError('Unable to load this location right now.')
            }
            finally {
                setIsLoading(false)
            }
        }

        loadLocationData()
    }, [slug])

    if (isLoading) {
        return <section className='location-events-status'><h2>Loading venue details...</h2></section>
    }

    if (error || !location) {
        return <section className='location-events-status'><h2>{error || 'Location not found.'}</h2></section>
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <p className='location-back-link'><Link to='/'>Back to locations</Link></p>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                    <p>{location.description}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event key={event.id} event={event} />
                    ) : <h2>No events scheduled at this location yet.</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents