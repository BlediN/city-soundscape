const API_BASE = '/api/events'

const handleResponse = async (response) => {
	if (!response.ok) {
		throw new Error(`Failed to fetch events: ${response.status}`)
	}

	return response.json()
}

const EventsAPI = {
	getAllEvents: async () => handleResponse(await fetch(API_BASE)),
	getEventsById: async (id) => handleResponse(await fetch(`${API_BASE}/${id}`)),
	getEventsByLocation: async (slug) => handleResponse(await fetch(`/api/locations/${slug}/events`))
}

export default EventsAPI
