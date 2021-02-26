import React, { useReducer, useCallback, useState } from 'react';
import Input from './common/Input';




const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const FORM_INPUT_RESET = 'FORM_INPUT_RESET';

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
  else if(action.type === FORM_INPUT_RESET) {
    return {
      inputVal: {email: "", password:""},
      inputValidities: {email: false, password: false},
      formIsValid: false
    }
  }
  return state;
}



const LoginPage = () => {

  const [typePos, setTypePos] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
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
    });
  }, [dispatchFormState])



  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {email: formState.inputVal.email, password: formState.inputVal.password};
    setIsCompleted(true);
    console.log(data);
    setTimeout(()=>{
      setIsCompleted(false)
    },2000);
    return dispatchFormState({
      type: FORM_INPUT_RESET
    });
  };


  return (

    <form className="auth-content-body" onSubmit={onSubmitHandler}>
      <Input
        name="email"
        type="email"
        email="true" 
        placeholder="E-posta adresi"
        onChangeInput={onChangeInputHandler}
        required
        initvalue={formState.inputVal.email}
        completed={isCompleted.toString()}

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
        completed={isCompleted.toString()}
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
