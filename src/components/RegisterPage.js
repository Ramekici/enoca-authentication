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
  else if (action.type === FORM_INPUT_RESET) {
    return {
      inputVal: {
        name: '',
        surName: '',
        email: '',
        password: '',
        rePassword: ''
      },
      inputValidities: {
        name: false,
        surName: false,
        email: false,
        password: false,
        rePassword: false
      },
      formIsValid: false
    }
  }
  return state;
}


const RegisterPage = () => {

  const [typePos, setTypePos] = useState(true);
  const [typePosRe, setTypePosRe] = useState(true);
  const [checkPos, setCheckPos] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
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
    const data = {
      name: formState.inputVal.name,
      surName: formState.inputVal.surName,
      email: formState.inputVal.email,
      password: formState.inputVal.password
    };
    setIsCompleted(true);
    setCheckPos(false);
    console.log(data);
    setTimeout(()=>{
      setIsCompleted(false)
    },2000);
    return dispatchFormState({
      type: FORM_INPUT_RESET
    });
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
            completed={isCompleted.toString()}
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
            completed={isCompleted.toString()}
          />
        </div>
      </div>
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
        onChangeInput={onChangeInputHandler}
        required
        initvalue={formState.inputVal.password}
        onChangePasswordType={() => setTypePos(prev => !prev)}
        completed={isCompleted.toString()}
      />
      <Input
        name="rePassword"
        type={typePosRe ? 'password' : 'text'}
        placeholder="Şifre Onayı"
        onChangeInput={onChangeInputHandler}
        required
        initvalue={formState.inputVal.rePassword}
        passwordvalue={formState.inputVal.password}
        onChangePasswordType={() => setTypePosRe(prev => !prev)}
        completed={isCompleted.toString()}
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