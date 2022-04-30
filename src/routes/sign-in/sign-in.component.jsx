import './sign-in.styles.scss';
import { Fragment } from 'react';
import {     
    signInWithGooglePopup,    
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import  SignUpForm  from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {

    const logGoogleUser = async () => {
        //const response = await signInWithGooglePopup();
        //console.log(response);
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    
    return (
        <Fragment>
            <h1> SignIN Component</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button> 
            <SignUpForm/>          
        </Fragment>
        
    )
}

export default SignIn;