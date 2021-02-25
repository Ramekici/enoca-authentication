import React, { useReducer, useEffect, useState } from 'react'
import './Input.css';
import Eye from '../svg/Eye';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_FOCUS = 'INPUT_FOCUS';


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

    useEffect(() => {
        if (inputState.touched) {
            onChangeInput(name, inputState.value, inputState.isValid)
        }
    }, [onChangeInput, inputState, name])

    const onChangeHandler = (event) => {

        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        let isValid = true;
        if (props.required && event.target.value.trim().length === 0) {
            isValid = false;
            setError("Alan boş bırakılmamalıdır.");
        }
        if (props.email && !emailRegex.test(event.target.value.toLowerCase())) {
            isValid = false;
            setError("E-posta adresini doğru giriniz.");
        }
        if (props.min !== null && +event.target.value < props.min) {
            isValid = false;
        }
        if (props.max !== null && +event.target.value > props.max) {
            isValid = false;
        }
        if (props.minLength !== null && event.target.value.length < props.minLength) {
            isValid = false;
            setError(`Minimum ${props.minLength} karakter girilmelidir.`);
        }
        if (props.maxLength !== null && event.target.value.length > props.maxLength) {
            isValid = false;
            setError(`Maximum ${props.maxLength} karakter girilmelidir.`);
        }
        if(props.name === "rePassword" && event.target.value !== props.passwordValue){
             isValid = false;
             setError(`Şifreler birbiri ile uyumlu değildir.`);
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

    useEffect(() => {
        if (completed) {
            dispatchInputState({
                type: INPUT_CHANGE,
                value: '',
                isValid: false
            })
        }
    }, [completed]);


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