import { speedToMode } from './speedToModeLogic';

let watchId: number | null = null;
let lastPosition: GeolocationPosition | null = null;

export const startTracking = (onTripDetected: (mode: string, distanceKm: number) => void) => {
  if (!('geolocation' in navigator)) {
    console.error('Geolocation is not supported by your browser');
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      if (lastPosition) {
        // Calculate distance (Haversine formula placeholder)
        const distanceKm = calculateDistance(
          lastPosition.coords.latitude,
          lastPosition.coords.longitude,
          position.coords.latitude,
          position.coords.longitude
        );

        if (position.coords.speed !== null && position.coords.speed > 0) {
          // speed is in m/s, convert to km/h
          const speedKmh = position.coords.speed * 3.6;
          const mode = speedToMode(speedKmh);
          
          if (distanceKm > 0.5) { // Only log if moved significant distance
            onTripDetected(mode, distanceKm);
          }
        }
      }
      lastPosition = position;
    },
    (error) => console.error('Tracking error:', error),
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
  );
};

export const stopTracking = () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    lastPosition = null;
  }
};

// Simplified distance calculation
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
