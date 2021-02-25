import React, { useReducer, useCallback, useState } from 'react';
import Input from './common/Input';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {

  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputVal,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      inputVal: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    }
  }
  return state;
}



const LoginPage = () => {

  const [typePos, setTypePos] = useState(true);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputVal: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false
  })

  const onChangeInputHandler = useCallback((inputIdentifier, inputValue, inputValidty) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidty,
      input: inputIdentifier
    })
  }, [dispatchFormState])



  const onSubmitHandler = (event) => {
    event.preventDefault();
    //const data = {email: formState.inputVal.email, password: formState.inputVal.password}
  };


  return (

    <form className="auth-content-body" onSubmit={onSubmitHandler}>
      <Input
        name="email"
        type="email"
        email 
        placeholder="E-posta adresi"
        onChangeInput={onChangeInputHandler}
        required
        initvalue={formState.inputVal.email}
      />
      <Input
        name="password"
        type={typePos ? 'password' : 'text'}
        placeholder="Şifre"
        minLength={6}
        onChangeInput={onChangeInputHandler}
        required
        initvalue={formState.inputVal.email}
        onChangePasswordType={() => setTypePos(prev => !prev)}
      />
      <button className="auth_submit_button"
        type="submit"
        disabled={!formState.formIsValid}> Giriş Yap </button>
        <a href="/a" style={{textDecoration:"none", fontSize:"0.925rem", color:"#F06543"}}>
          Şifremi Unuttum.
      </a>
    </form>
  )
}
export default LoginPage;
