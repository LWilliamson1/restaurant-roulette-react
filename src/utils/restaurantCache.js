const CACHE_KEY_PREFIX = 'restaurant_detail_';

export function getCachedRestaurant(placeId) {
    try {
        const cached = localStorage.getItem(CACHE_KEY_PREFIX + placeId);
        return cached ? JSON.parse(cached) : null;
    } catch (e) {
        return null;
    }
}

export function setCachedRestaurant(placeId, data) {
    try {
        localStorage.setItem(CACHE_KEY_PREFIX + placeId, JSON.stringify(data));
    } catch (e) {
        // localStorage may be unavailable or full
    }
}
