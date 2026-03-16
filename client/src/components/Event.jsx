import React from 'react'
import '../css/Event.css'

const formatCountdown = (eventDate, hasPassed) => {
    const difference = eventDate.getTime() - Date.now()
    const absoluteDifference = Math.abs(difference)
    const totalMinutes = Math.floor(absoluteDifference / (1000 * 60))
    const days = Math.floor(totalMinutes / (60 * 24))
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
    const minutes = totalMinutes % 60

    const parts = []

    if (days > 0) {
        parts.push(`${days}d`)
    }

    if (hours > 0 || days > 0) {
        parts.push(`${hours}h`)
    }

    parts.push(`${minutes}m`)

    return hasPassed ? `Passed ${parts.join(' ')} ago` : `Starts in ${parts.join(' ')}`
}

const Event = ({ event }) => {
    const eventDate = new Date(event.event_date)
    const hasPassed = eventDate.getTime() < Date.now()
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(eventDate)
    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    }).format(eventDate)
    const countdown = formatCountdown(eventDate, hasPassed)

    return (
        <article className={`event-information ${hasPassed ? 'past' : 'upcoming'}`}>
            <img src={event.image} alt={event.title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    {event.location_name && <p className='event-location'>{event.location_name}</p>}
                    <p>{formattedDate}<br />{formattedTime}</p>
                    <p>{event.genre}</p>
                    <p className={hasPassed ? 'negative-time-remaining' : 'time-remaining'}>{countdown}</p>
                    <p>{event.description}</p>
                </div>
            </div>
        </article>
    )
}

export default Event