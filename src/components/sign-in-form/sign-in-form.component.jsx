import { useState } from 'react';
import './sign-in-form.styles.scss';
import { 
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {    
    email: '',
    password: '',    
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;
    console.log('saisie formulaire inscription',formFields);
    //inscription via google
    const signInWithGoogle = async () => {
      //const response = await signInWithGooglePopup();
      //console.log(response);
      const {user} = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };

    //reset formFields
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    //soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();            
    
        try {
          const response = await signInAuthUserWithEmailAndPassword(email, password);
          console.log(response);
          // raz du form aprés validation
          resetFormFields();
        } catch (error) {
          switch (error.code) {
            case 'auth/wrong-password':
              alert('password is incorrect ');
              break;
              case 'auth/user-not-found':
                alert('aucun compte email associé ');
                break;
          
            default:
              console.log(error);
              break;
          }
          
          
        }
      };

    // recupération des informations saisis dans le formulaire
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <div className='sign-in-container'>
            <h2>Déja un Compte</h2>
            <span>Sign up with Email and Password</span>
            <form onSubmit={handleSubmit}> 
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
                
                <div className="buttons-container">
                  <Button type='submit'>Sign In</Button>
                  <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google Connexion</Button>
                </div>                
            </form>
        </div>
    );
};

export default SignInForm;