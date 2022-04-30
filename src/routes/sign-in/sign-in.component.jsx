import './sign-in.styles.scss';
import { Fragment } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
const SignIn = () => {
    const logGoogleUser = async () => {
        //const response = await signInWithGooglePopup();
        //console.log(response);
        const {user} = await signInWithGooglePopup();

        createUserDocumentFromAuth(user);
    }
    return (
        <Fragment>
            <h1> SignIN Component</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </Fragment>
        
    )
}

export default SignIn;