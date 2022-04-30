import { Fragment, useState } from 'react';
import './sign-up-form.styles.scss';
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    console.log('saisie formulaire inscription',formFields);
    //reset formFields
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    //soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          alert('passwords do not match');
          return;
        }
    
        try {
          const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password
          );
    
          await createUserDocumentFromAuth(user, { displayName });
          resetFormFields();
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
          } else {
            console.log('user creation encountered an error', error);
          }
        }
      };

    // recupération des informations saisis dans le formulaire
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <Fragment className='sign-up-container'>
            <h2>Creation de Compte</h2>
            <span>Sign up with Email and Password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label="Display Name" 
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />
                
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email" 
                    value={email}/>
                
                <FormInput
                    label="Password"
                     type="password"
                     required
                     onChange={handleChange}
                     name="password"
                     value={password} />
                
                <FormInput
                    label='Confirm Password'
                     type="password"
                     required
                     onChange={handleChange}
                     name="confirmPassword"
                     value={confirmPassword} />

                <Button buttonType='google' type='submit'>S'inscrire</Button>
            </form>
        </Fragment>
    );
};

export default SignUpForm;