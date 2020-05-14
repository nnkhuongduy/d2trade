import React from 'react'
import NumberFormat from 'react-number-format'

const NumberFormatCustom = ({ inputRef, onChange, ...props }) => (
  <NumberFormat
    {...props}
    getInputRef={inputRef}
    onValueChange={(values) => {
      onChange({
        target: {
          value: values.floatValue
        }
      })
    }}
    thousandSeparator
    isNumericString
    decimalScale={2}
    allowNegative={false}
  />
)

export default NumberFormatCustom