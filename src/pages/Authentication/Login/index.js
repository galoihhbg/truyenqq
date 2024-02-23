import styles from '../Authen.module.scss'
import classNames from 'classnames/bind'

import Cookies from 'universal-cookie';

import { Form } from 'react-bootstrap';
import { useState, useRef } from 'react';
import axios from 'axios';
import Button from '../../../components/Button'
import images from '../../../assets/images';
import Validator from '../Validator';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

const cookies = new Cookies()

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [login, setLogin] = useState(false);

  const location = useLocation()
  const state = location.state;

  const [focusOn, setFocusOn] = useState({
      username: false,
      password: false,
  })

  const [validated, setValidated] = useState({
      username: false,
      password: false,
  })

  const [errors, setErrors] = useState({
      username: [],
      password: [],
  })

  // eslint-disable-next-line
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
  })

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
              url: "https://api-truyenqq-ciciii.onrender.com/login",
              data: {
                username,
                password,
              },
            };
  
          axios(configuration)
            .then((result) => {
              setLogin(true);

              // set the cookie
              cookies.set("TOKEN", result.data.token, {
                //all routes that cookie is available
                path: "/",
              });

              cookies.set('USER-DATA', result.data.userData, {
                path: '/',
              })


              // redirect user to the auth page
              window.location.href = state.from;
            })
            .catch((error) => {
              console.log(error)
              error = new Error();
            });
      }
    }

    return ( 
        <div className={cx('wrapper')}>
            <h2 className={cx('form-name')}>Login</h2>
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

                {/* submit button */}
                <Button primary classnames={'auth-form-submit'} onClick={(e) => handleSubmit(e)}>
                    Login
                </Button>
                <div className={cx('nav')}>
                    <Link className={cx('switch-tab-button')} to={'/'}> {<FontAwesomeIcon icon={faAnglesLeft} />} <span>Back to Home</span> </Link> 
                    <Link className={cx('switch-tab-button')} to={'/register'}> <span>Move to Register</span> {<FontAwesomeIcon icon={faAnglesRight} />} </Link>
                </div>
                {/* {login ? (
                <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                <p className="text-danger">You Are Not Logged in</p>
                )} */}
            </Form>
            <Link to={'/'} className={cx('logo')}>
                <img src={images.logoBigSize} alt='Sừng Xanh logo' />
            </Link>
        </div>
     );
}

export default Login;