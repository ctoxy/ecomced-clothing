import { Fragment, useState } from 'react';
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

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
        <Fragment>
            <h1>Sign up with Email and Password</h1>
            <form onSubmit={handleSubmit}>
                <label >Display Name</label>
                <input 
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />
                <label >Email</label>
                <input
                     type="email"
                     required
                     onChange={handleChange}
                     name="email" 
                     value={email}/>
                <label >Password</label>
                <input
                     type="password"
                     required
                     onChange={handleChange}
                     name="password"
                     value={password} />
                <label >Confirm Password</label>
                <input
                     type="password"
                     required
                     onChange={handleChange}
                     name="confirmPassword"
                     value={confirmPassword} />

                <button type='submit'>S'inscrire</button>
            </form>
        </Fragment>
    );
};

export default SignUpForm;