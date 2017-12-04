export const getDuplicatesJson = () => {
  return fetch('/duplicates.json').then(function (response) {
    return response.json();
  });
}