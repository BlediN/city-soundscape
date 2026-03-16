const API_BASE = '/api/locations'

const handleResponse = async (response) => {
	if (!response.ok) {
		throw new Error(`Failed to fetch locations: ${response.status}`)
	}

	return response.json()
}

const LocationsAPI = {
	getAllLocations: async () => handleResponse(await fetch(API_BASE)),
	getLocationBySlug: async (slug) => handleResponse(await fetch(`${API_BASE}/${slug}`))
}

export default LocationsAPI
