export const balanceInputFilter = value => {
  const valueLocalized = Number(value.replace(/,/g, '')).toLocaleString('en-US')
  const prevValue = value.slice(0, value.length - 1);

  if (value === "")
    return value

  if (prevValue.replace(/,/g, '').length < 17) {
    if (value.length === 1 && value === "-")
      return value;
    if (!isNaN(value.slice(-1))) {
      return valueLocalized;
    }
  }

  return value.slice(0, value.length - 1)
}