/* eslint-disable */
export const getUserLocation = async () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.latitude, coords.longitude]);
      },
      (err) => {
        alert('No se pudo obtener tu ubicación');
        console.log(err);
        reject(err);
      }
    );
  });
