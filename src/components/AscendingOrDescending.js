export const AscendingOrder = ({ array, objectKey }) => {
  array.sort((a, b) => {
    const x = a[objectKey];
    const y = b[objectKey];
    if (x > y) {
      return -1;
    }
    if (x < y) {
      return 1;
    }
    return 0;
  });
};

export const DescendingOrder = ({ array, objectKey }) => {
  array.sort((a, b) => {
    const x = a[objectKey];
    const y = b[objectKey];
    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    return 0;
  });
};

export { AscendingOrder, DescendingOrder };
