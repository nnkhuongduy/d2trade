const comparator = (prop, desc = true) => (a, b) => {
  const order = desc ? 1 : -1;

  if (a[prop] < b[prop])
    return -1 * order

  if (a[prop] > b[prop])
    return 1 * order;

  return 0 * order;
}

export default comparator