export default function queryStringToObject(queryString) {
  const result = {};

  // Decode the URL-encoded query string
  queryString = decodeURIComponent(queryString);

  // Split the query string by '&' to separate key-value pairs
  const keyValuePairs = queryString.split('&');

  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    const keys = key.split('[').map((part) => part.replace(']', '')); // Split keys by '[' and remove ']'

    let currentObject = result;

    keys.forEach((keyPart, index) => {
      if (index === keys.length - 1) {
        if (keyPart === 'images') {
          // Handle the "images" property as an array
          currentObject[keyPart] = currentObject[keyPart] || [];
          currentObject[keyPart].push({ fileUrl: decodeURIComponent(value) });
        } else {
          currentObject[keyPart] = decodeURIComponent(value);
        }
      } else {
        if (!currentObject[keyPart]) {
          // If the key is an array (e.g., images[0]), initialize it as an array
          if (/^\d+$/.test(keys[index + 1])) {
            currentObject[keyPart] = [];
          } else {
            currentObject[keyPart] = {};
          }
        }
      }
      currentObject = currentObject[keyPart];
    });
  });

  return result;
}