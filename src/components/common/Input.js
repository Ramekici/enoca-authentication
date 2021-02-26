import React, { useReducer, useEffect, useState } from 'react'
import './Input.css';
import Eye from '../svg/Eye';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_FOCUS = 'INPUT_FOCUS';
const INPUT_RESET = 'INPUT_RESET';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_FOCUS:
            return {
                ...state,
                touched: true
            }
        case INPUT_RESET:
                return {
                    value:'',
                    isValid:  false,
                    touched: false,
                }
        default:
            return state;
    }
};

const Input = (props) => {

    const [inputState, dispatchInputState] = useReducer(inputReducer, {
        value: props.initvalue ? props.initialValue : '',
        isValid: props.initialValid ? props.initialValid : false,
        touched: false,
    })

    const [error, setError] = useState('');

    const { onChangeInput, name, completed } = props;
    const {touched} = inputState;

    useEffect(()=>{
        onChangeInput(name, inputState.value, inputState.isValid);
    },[name, inputState.value, inputState.isValid]);

    useEffect(() => {
        if (touched && props.initvalue.length === 0) {
            setError("Bu alan boş bırakılamaz.");
        }
    }, [touched, props.initvalue.length ]);

    useEffect(()=>{
        dispatchInputState({
            type: INPUT_RESET
        })
    },[completed])

    const onChangeHandler = (event) => {

        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,24}$/;
        let isValid = true;

        
        if (props.email && !emailRegex.test(event.target.value.toLowerCase())) {
            isValid = false;
            setError("E-posta adresini doğru giriniz.");
        }
       
        if ((props.name === "password" || props.name === "rePassword") && 
        !passwordRegex.test(event.target.value)) {
            isValid = false;
            setError("Şifre, minimum sekiz karakter ve en az bir harf ile rakam içermelidir");
        }
        if ((props.name === "name" || props.name === "surName") && 
        !nameRegex.test(event.target.value.trim())) {
            isValid = false;
            setError("Alan minimum üç karakter ve özel karakter ile rakam içermemelidir.");
        }
        if (props.min !== null && +event.target.value < props.min) {
            isValid = false;
        }
        if (props.max !== null && +event.target.value > props.max) {
            isValid = false;
        }
        if(props.name === "rePassword" && event.target.value !== props.passwordvalue){
             isValid = false;
             setError(`Şifreler birbiri ile uyuşmamaktadır.`);
        }
        if (props.required && event.target.value.trim().length === 0) {
            isValid = false;
            setError("Bu alan boş bırakılamaz.");
        }

        dispatchInputState({
            type: INPUT_CHANGE,
            value: event.target.value,
            isValid: isValid
        })
    }

    const lostFocusHandler = () => {
        dispatchInputState({
            type: INPUT_FOCUS
        })
    }


    return (
        <div className="input-group" >
            <input
                className={(!inputState.isValid && inputState.touched) ? "input-invalid" :""}
                {...props}
                value={inputState.value}
                onChange={onChangeHandler}
                onFocus={lostFocusHandler} />
            {(props.name === 'password' || props.name === 'rePassword') &&
                <Eye
                    changePasswordType={props.onChangePasswordType}
                    show={props.type === 'password' ? true : false}
                />}
            {!inputState.isValid && inputState.touched &&
                <div className="input-invalid-feedback" style={{ display: "block" }}> {error} </div>}
        </div>

    )
}



export default Input;