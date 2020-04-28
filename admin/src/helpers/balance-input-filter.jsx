export const balanceInputFilter = value => {
  const valueLocalized = parseInt(value.replace(/,/g, '')).toLocaleString('en-US')

  if (value === "")
    return value

  if (parseInt(value.replace(/,/g, '')).toString().length < 17) {
    if (value.length === 1 && value === "-")
      return value;
    if (!isNaN(value.slice(-1)))
      return valueLocalized;
  }

  return value.slice(0, value.length - 1)
}