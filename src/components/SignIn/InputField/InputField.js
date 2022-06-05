import styles from './InputField.module.css';

import {useState} from 'react';

export default function InputField({
    onChangeHandler,
    inputName,
    inputValue,
    isValid,
}) {

    let [isActive, setIsActive] = useState(false);

    function onFocusHandler() {
        setIsActive(true);
    }

    function onBlurHandler() {
        setIsActive(false);
    }

    let spanActiveClasses = [styles.inputHeading].join(' ');
    let spanInactiveClasses = [styles.inputHeading, styles.inputHeadingNoInput].join(' ');
    let inputContainerActiveClasses = [styles.inputContainer, styles.inputContainerActive].join(' ');
    let inputContainerInactiveClasses = [styles.inputContainer].join(' ');

    return (
        <div className={isActive ? inputContainerActiveClasses : inputContainerInactiveClasses}>
            <div className={styles.isValidIcon}>
                {isValid === undefined ? '' : (isValid === true ? <i class="fa-solid fa-circle-check"></i> : <i class="fa-solid fa-circle-xmark"></i>)}
            </div>
            <label htmlFor={inputName}>
                <span className={inputValue.length > 0 ? spanActiveClasses : spanInactiveClasses}>{inputName}</span>
            </label>
            <input onFocus={onFocusHandler} 
                onBlur={onBlurHandler}  
                className={inputValue.length > 0 ? '' : styles.inputFieldNoInput} 
                value={inputValue} onChange={onChangeHandler} 
                type={inputName === 'password' ? 'password' : 'text'}
                name={inputName}
                id={inputName}
                autoComplete='off'
                required
            />
            <input autoComplete="on" style={{ display: 'none' }}
            id="fake-hidden-input-to-stop-google-address-lookup"></input>
         </div>
    )
}