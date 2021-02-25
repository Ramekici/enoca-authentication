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


const RegisterPage = () => {

  const [typePos, setTypePos] = useState(true);
  const [typePosRe, setTypePosRe] = useState(true);
  const [checkPos, setCheckPos] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputVal: {
      name: '',
      surName: '',
      email: '',
      password: '',
      rePassword: '',
    },
    inputValidities: {
      name: false,
      surName: false,
      email: false,
      password: false,
      rePassword: false,
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
  }, [dispatchFormState]);


  const onSubmitHandler = (event) => {
    event.preventDefault();

  }

  const onCheckbox = (event) => {
    setCheckPos(event.target.checked);
  }


  return (

    <form className="auth-content-body" onSubmit={onSubmitHandler}>
      <div style={{ margin: "1rem 0" }}>
        E-posta adresi ile üye ol.
      </div>
      <div className="auth-ad-soyad">
        <div className="auth-ad">
          <Input
            name="name"
            type="text"
            placeholder="Adı"
            onChangeInput={onChangeInputHandler}
            required
            initvalue={formState.inputVal.name}
            minLength={3}
            maxLength={24}
          />
        </div>
        <div className="auth-ad">
          <Input
            name="surName"
            type="text"
            placeholder="Soyadı"
            onChangeInput={onChangeInputHandler}
            required
            initvalue={formState.inputVal.surName}
            minLength={3}
            maxLength={24}
          />
        </div>
      </div>
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
        initvalue={formState.inputVal.password}
        onChangePasswordType={() => setTypePos(prev => !prev)}
      />
      <Input
        name="rePassword"
        type={typePosRe ? 'password' : 'text'}
        placeholder="Şifre Onayı"
        minLength={6}
        onChangeInput={onChangeInputHandler}
        required
        initvalue={formState.inputVal.rePassword}
        passwordValue = {formState.inputVal.password}
        onChangePasswordType={() => setTypePosRe(prev => !prev)}
      />
      <div className="checkbox-input">
        <input type="checkbox" onChange={onCheckbox} checked={checkPos} />
        <label htmlFor="checkbox" className="checkbox-label" >
          Önemli kampanyalardan haberdar olmak için <span style={{ fontWeight: "bolder" }}> Rıza Metni </span> kapsamında elektronik ileti almak istiyorum.
       </label>
      </div>
      <button className="auth_submit_button"
        disabled={!formState.formIsValid || !checkPos}
        type="submit">
        Üye Ol
      </button>
    </form>
  )
}
export default RegisterPage;