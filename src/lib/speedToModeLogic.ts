export const speedToMode = (speedKmh: number): 'walk' | 'bike' | 'bus' | 'car' | 'train' => {
  // Simple heuristic for MVP/V2 based on average speeds
  if (speedKmh < 7) {
    return 'walk';
  } else if (speedKmh < 25) {
    return 'bike';
  } else if (speedKmh < 45) {
    // City speeds are tricky. We default to bus to encourage eco-friendliness, 
    // but in reality this requires ML + stops analysis.
    return 'bus';
  } else if (speedKmh < 100) {
    return 'car';
  } else {
    return 'train';
  }
};
