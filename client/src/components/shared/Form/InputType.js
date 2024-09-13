import React from 'react'

const InputType = ({lableFor,lableText,inputType,value,name,onchange}) => {

  return (
    <>
      <div className="mb-1 ">
              <label htmlFor={lableFor} className="form-label">
                {lableText}
                </label>
              <input type={inputType}
              className="form-control"
              //  id="exampleInputEmail1"
               name={name}
               value={value}
               onChange={onchange}
               />
      </div>
    </>
  )
}

export default InputType
