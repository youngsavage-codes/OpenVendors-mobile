export const getOpacityFromDistance = (distanceKm: number) => {
  const maxDistance = 10; // km
  const opacity = 1 - distanceKm / maxDistance;
  return Math.max(0.1, Math.min(opacity, 0.6));
};
