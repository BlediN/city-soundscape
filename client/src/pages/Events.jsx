import React, { useEffect, useState } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')
    const [sortOrder, setSortOrder] = useState('soonest')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setIsLoading(true)
                const [eventsData, locationsData] = await Promise.all([
                    EventsAPI.getAllEvents(),
                    LocationsAPI.getAllLocations()
                ])

                setEvents(eventsData)
                setLocations(locationsData)
                setError('')
            }
            catch (loadError) {
                setError('Unable to load events right now.')
            }
            finally {
                setIsLoading(false)
            }
        }

        loadEvents()
    }, [])

    const filteredEvents = events
        .filter((event) => selectedLocation === 'all' || event.location_slug === selectedLocation)
        .sort((firstEvent, secondEvent) => {
            const firstDate = new Date(firstEvent.event_date).getTime()
            const secondDate = new Date(secondEvent.event_date).getTime()

            return sortOrder === 'soonest' ? firstDate - secondDate : secondDate - firstDate
        })

    return (
        <section className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>All Events</h2>
                    <p>Browse every upcoming and past show in the plaza, then narrow the list by venue.</p>
                    <div className='events-toolbar'>
                        <label>
                            Location
                            <select value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
                                <option value='all'>All locations</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.slug}>{location.name}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Sort
                            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                                <option value='soonest'>Soonest first</option>
                                <option value='latest'>Latest first</option>
                            </select>
                        </label>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </header>

            <main>
                {isLoading && <h2>Loading events...</h2>}
                {!isLoading && filteredEvents.length === 0 && <h2>No events match the current filters.</h2>}
                {!isLoading && filteredEvents.map((event) => <Event key={event.id} event={event} />)}
            </main>
        </section>
    )
}

export default Events