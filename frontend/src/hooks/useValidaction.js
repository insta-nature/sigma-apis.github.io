import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";

export const registerValidate = () => {

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('UserName is Required.')
            .min(3, 'Username is must 3 characters.'),
        email: Yup.string()
            .required('Email is Required.')
            .email('Email is Invalid.'),
        password: Yup.string()
            .required('Password is Required.')
            // eslint-disable-next-line
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        passwordConfirmation: Yup.string()
            .label('Password Confirm')
            .required()
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });
    
    // filds validaction.
      
    
    const { register, formState: {errors} } = useForm({
        resolver: yupResolver(validationSchema)
    });

}
