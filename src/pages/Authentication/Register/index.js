import styles from '../Authen.module.scss'
import classNames from 'classnames/bind'

import { Form } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Button from '../../../components/Button'
import Validator from '../Validator';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import images from '../../../assets/images';

const cx = classNames.bind(styles)

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("")
    // eslint-disable-next-line
    const [register, setRegister] = useState(false);

    const [focusOn, setFocusOn] = useState({
        username: false,
        password: false,
        confirm_password: false,
        email: false,
    })

    const [validated, setValidated] = useState({
        username: false,
        password: false,
        confirm_password: false,
        email: false,
    })

    const [errors, setErrors] = useState({
        username: [],
        password: [],
        confirm_password: [],
        email: [],
    })

    const [validator, setValidator] = useState({
        username:{
            ref : useRef(),
            rules : [
                Validator.isRequired,
                Validator.minLength
            ],
            requires: {
                minLength: 6
            },
        },
        password: {
            ref: useRef(),
            rules : [
                Validator.isRequired,
                Validator.minLength
            ],
            requires: {
                minLength: 6
            },
        },
        confirm_password: {
            ref: useRef(),
            rules : [
                Validator.isRequired,
                Validator.isConfirmed
            ],
            requires: {
                
            },
        },
        email: {
            ref: useRef(),
            rules: [
                Validator.isRequired,
                Validator.isEmail,
            ],
        }
    })

    useEffect(() => {
        setValidator(prevValidator => ({
            ...prevValidator,
            confirm_password: {
              ...prevValidator.confirm_password,
              requires: {
                ...prevValidator.confirm_password.requires,
                confirmRef: prevValidator.password.ref
              }
            }
          }));
    }, [])

    const handleFocus = (e, input) => {

        e.preventDefault();
        setFocusOn(prev => ({
            ...prev,
            [input.ref.current.name]: true
        }))
    }

    const validate = (input) => {
        //validate input
        let newErrors = [];
        input.rules.map((rule) => {
          const a = rule(input);
          if (a !== undefined) {
            newErrors.push(a);
          }
          return null;
        });

        //push errors to validator object
        setErrors(prev => ({
            ...prev,
            [input.ref.current.name]: newErrors
        }));

        setValidated(prev => ({
            ...prev,
            [input.ref.current.name]: true
        }))
        
        //return blur state to input
        setFocusOn(prev => ({
            ...prev,
            [input.ref.current.name]: false
        }))
    }

    const handleBlur = (e, input) => {
        //prevent default event
        e.preventDefault();
        
        validate(input)
    }

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make sure that all the inputs are validated
        for (let key in validated) {
            if (!validated[key]) {
                validate(validator[key])
            }
        }

        var isValid = true;

        for (let key in errors) {
            if (errors[key].length >0) {
                isValid = false
                break;
            }
        }

        // submit the form if everything is valid
        if (isValid) {
            const configuration = {
                method: "post",
                url: "http://localhost:4000/register",
                data: {
                  username,
                  password,
                  email
                },
              };
    
            axios(configuration)
              .then((result) => {
                setRegister(true);
              })
              .catch((error) => {
                error = new Error();
              });
        }
      }


    return ( 
        <div className={cx('wrapper')}>
            <h2 className={cx('form-name')}>Register</h2>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                {/* email */}
                <Form.Group className={cx('mb-4')} controlId="formBasicUsername">
                    <Form.Label className={cx('form-label', 'mb-1')}>Username</Form.Label>
                    <Form.Control
                        ref={validator.username.ref}
                        className={cx('form-input')}
                        type="username"
                        name="username"
                        value={username}
                        onFocus={(e) => handleFocus(e, validator.username)}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={(e) => handleBlur(e, validator.username)}
                        placeholder="Enter username"
                    />
                    {!focusOn.username ? <Form.Text className="text-danger">{errors.username[0]}</Form.Text> : ''}
                </Form.Group>

                {/* password */}
                <Form.Group className={cx('mb-4')} controlId="formBasicPassword">
                    <Form.Label className={cx('form-label', 'mb-1')}>Password</Form.Label>
                    <Form.Control
                        ref={validator.password.ref}
                        className={cx('form-input')}
                        type="password"
                        name="password"
                        value={password}
                        onFocus={(e) => handleFocus(e, validator.password)}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => handleBlur(e, validator.password)}
                        placeholder="Password"
                    />
                   {!focusOn.password ? <Form.Text className="text-danger">{errors.password[0]}</Form.Text> : ''}
                </Form.Group>

                {/* confirm password */}
                <Form.Group className={cx('mb-4')} controlId="formBasicConfirmPassword">
                    <Form.Label className={cx('form-label', 'mb-1')}>Confirm Password</Form.Label>
                    <Form.Control
                        disabled={(password.length < validator.password.requires.minLength) || errors.password.length > 0}
                        ref={validator.confirm_password.ref}
                        className={cx('form-input')}
                        type="password"
                        name="confirm_password"
                        value={passwordConfirm}
                        onFocus={(e) => handleFocus(e, validator.confirm_password)}
                        confirmValue={password}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        onBlur={(e) => handleBlur(e, validator.confirm_password)}
                        placeholder="Confirm Password"
                    />
                    {!focusOn.confirm_password ? <Form.Text className="text-danger">{errors.confirm_password[0]}</Form.Text> : ''}
                </Form.Group>

                {/* email */}
                <Form.Group className={cx('mb-4')} controlId="formBasicEmail">
                    <Form.Label className={cx('form-label', 'mb-1')}>Email</Form.Label>
                    <Form.Control
                        ref={validator.email.ref}
                        className={cx('form-input')}
                        type="email"
                        name="email"
                        value={email}
                        onFocus={(e) => handleFocus(e, validator.email)}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => handleBlur(e, validator.email)}
                        placeholder="Enter email"
                    />
                    {!focusOn.email ? <Form.Text className="text-danger">{errors.email[0]}</Form.Text> : ''}
                </Form.Group>

                {/* submit button */}
                <Button primary classnames={'auth-form-submit'} onClick={(e) => handleSubmit(e)}>
                    Register
                </Button>
                <div className={cx('nav')}>
                    <Link className={cx('switch-tab-button')} to={'/'}> {<FontAwesomeIcon icon={faAnglesLeft} />} <span>Back to Home</span> </Link> 
                    <Link className={cx('switch-tab-button')} to={'/login'}> <span>Move to Login</span> {<FontAwesomeIcon icon={faAnglesRight} />} </Link>
                </div>
                {/* {register ? (
                <p className="text-success">You Are Registered Successfully</p>
                ) : (
                <p className="text-danger">You Are Not Registered</p>
                )} */}
            </Form>
            <Link to={'/'} className={cx('logo')}>
                <img src={images.logoBigSize} alt='Sừng Xanh logo' />
            </Link>
        </div>
     );
}

export default Register;