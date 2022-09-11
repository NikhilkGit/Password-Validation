import React, { useEffect, useState } from 'react'
import './password.css'

function ChangePassword() {
    const [input, setInput] = useState({oldPassword:'',newPassword:'',confirmPassword:''})
    const [error, setError] = useState({oldPassword:'',newPassword:'',confirmPassword:''})

 const handleFieldChange = (event) => {
        let inputs = input
        console.log(inputs)
        let errors = error
        inputs[event.target.name] = event.target.value
        errors[event.target.name] = ""
        setInput({...input,inputs})
        setError({...error,errors})
    }

 const handleSubmit = (e) => {
        e.preventDefault()
        if (validateInput()) {
            setInput({oldPassword:'',newPassword:'',confirmPassword:''})
        }
    }
   
    const validateInput = () => {
        let inputs = input
        let errors = {}
        let isValid = true
       
        //validation for old password
        if (!inputs["oldPassword"]) {
            isValid = false
            errors["oldPassword"] = 'please enter old password'
        }

        //validation for new password
        if (!inputs["newPassword"]) {
            isValid = false
            errors["newPassword"] = 'please enter new password'
        } else if (typeof inputs["newPassword"] !== "undefined") {
            let pattern = new RegExp( "/^(?=.*[!@#$%*+=?&])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%*+=?&|]{8,15}$/")
            console.log('type', typeof inputs['newPassword'])
            if (!pattern.test(inputs["newPassword"])) {
                isValid = false
                errors["newPassword"] = 'password should contain one uppercase , special character and numerics'
            }
        } else if (
            inputs['confirmPassword'] &&
            inputs["newPassword"] !== inputs['confirmPassword']
        ) {
            isValid = false
            errors["confirmPassword"] = 'please enter same value'
        } else {
            isValid = false
            errors["confirmPassword"] = inputs['confirmPassword']
                ? ""
                : errors['confirmPassword']
        }

        //validation for confirm password
        if (!inputs["confirmPassword"]) {
            isValid = false
            errors["confirmPassword"] = 'please enter confirm password'
        } else if (
            inputs["newPassword"] &&
            inputs['confirmPassword'] !== inputs["newPassword"]
        ) {
            isValid = false
            errors["confirmPassword"] = 'please enter same value'
        }

        setError(errors)
        return isValid
    }

  return (
      <div className="row change-password bg-info">
        <div className="col-12 col-lg-8 ">
            <form>
                <div className='form-grounp'>
                    <input
                        type="password"
                        autoComplete="off"
                        className= "form-control"
                        placeholder='enter old password'
                        value={input.oldPassword}
                        name="oldPassword"
                        id="formControlInput1"
                        autoFocus={true}
                        onChange={(e) => handleFieldChange(e)}/>
                    <label 
                        className="error"
                        htmlFor="formControlInput1">
                    {error.oldPassword}
                    </label>
                </div>
                <div className='form-grounp'>
                    <input
                        type="password"
                        autoComplete="off"
                        className= "form-control"
                        placeholder='enter new password'
                        value={input.newPassword}
                        name="newPassword"
                        id="formControlInput2"
                        onChange={(e) => handleFieldChange(e)}/>
                    <label 
                        className="error"
                        htmlFor="formControlInput2">
                        {error.newPassword}
                    </label>
                </div>
                <div className='form-grounp'>
                    <input
                        type="password"
                        autoComplete="off"
                        className= "form-control"
                        placeholder='enter confirm password'
                        value={input.confirmPassword}
                        name="confirmPassword"
                        id="formControlInput3"
                        onChange={(e) => handleFieldChange(e)}/>
                    <label 
                        className="error"
                        htmlFor="formControlInput3">
                            {error.confirmPassword}
                    </label>
                </div>
                <div>
                    <button
                        className="submit-button rounded-pill check-btn hvr-sweep-to-right update-btn-change"
                        onClick={(event) => handleSubmit(event)}>
                                    Submit
                    </button>
                </div>
            </form>
        </div>
      </div>
  )
}

export default ChangePassword
