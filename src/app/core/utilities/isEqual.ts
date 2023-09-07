export const isEqual = (value1: any, value2: any) => {
  // Check if the types of the values are the same
  if (typeof value1 !== typeof value2) {
    return false;
  }

  // If the values are objects or arrays, recursively compare their properties/elements
  if (typeof value1 === 'object') {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      // If both are arrays, compare their elements
      if (value1.length !== value2.length) {
        return false;
      }
      for (let i = 0; i < value1.length; i++) {
        if (!isEqual(value1[i], value2[i])) {
          return false;
        }
      }
      return true;
    } else {
      // If both are objects, compare their properties
      const keys1 = Object.keys(value1 || {});
      const keys2 = Object.keys(value2 || {});

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        if (!isEqual(value1[key], value2[key])) {
          return false;
        }
      }

      return true;
    }
  }

  // For primitive types, perform a simple comparison
  return value1 === value2;
};

