//core
import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import Cookies from "js-cookie";

//gql
import SignUpUser from "@gql/signUpUser.gql";
import {data} from "autoprefixer";
import User from "@gql/user.gql";


export default function useSignUp() {

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(true);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const [password2, setPassword2] = useState('');
  const [validPassword2, setValidPassword2] = useState(true);

  const [agreement, setAgreement] = useState(true);

  const [signUpMutation] = useMutation(SignUpUser);


  const signUp = (e: React.FormEvent) => {
    e.preventDefault()
    const validName = !!name
    const validEmail = email && email.includes('@') && email.includes('.')
    const passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])")
    const validPassword = password.length >= 8 && passwordRegex.test(password)
    const validPassword2 = password === password2
    setValidName(validName)
    setValidEmail(validEmail)
    setValidPassword(validPassword)
    setValidPassword2(validPassword2)

    if (validEmail && validPassword && agreement) {
      signUpMutation({
        variables: {
          signUpData: {
            username: name,
            email,
            password
          }
        },
        update(cache, {data: {signUp}}) {
          cache.writeQuery({
            query: User,
            data: {
              getCurrentUser: signUp
            }
          });
        }
      })
        .then(r => r.data.signUp)
        .then(r => Cookies.set('token', r.token))
    }
  }

  return {
    name, setName,
    validName, setValidName,
    email, setEmail,
    validEmail, setValidEmail,
    password, setPassword,
    validPassword, setValidPassword,
    password2, setPassword2,
    validPassword2, setValidPassword2,
    agreement, setAgreement,
    signUp
  }
}