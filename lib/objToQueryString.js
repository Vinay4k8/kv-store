export default function objectToQueryString(obj) {
    const queryParams = [];
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        if (Array.isArray(value)) {
          // Handle arrays of objects
          for (let i = 0; i < value.length; i++) {
            for (const subKey in value[i]) {
              if (value[i].hasOwnProperty(subKey)) {
                const subValue = value[i][subKey];
                queryParams.push(`${key}[${i}][${subKey}]=${encodeURIComponent(subValue)}`);
              }
            }
          }
        } else if (typeof value === 'object') {
          // Handle nested objects
          for (const subKey in value) {
            if (value.hasOwnProperty(subKey)) {
              const subValue = value[subKey];
              queryParams.push(`${key}[${subKey}]=${encodeURIComponent(subValue)}`);
            }
          }
        } else {
          // Handle other types
          queryParams.push(`${key}=${encodeURIComponent(value)}`);
        }
      }
    }
  
    return queryParams.join('&');
  }
  

