import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import LoginUser from "@gql/loginUser.gql";
import User from "@gql/user.gql";
import Cookies from "js-cookie";

export default function useLogin() {
  const [email, setEmail] = useState('');
  // const [validEmail, setValidEmail] = useState(true);
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const [loginMutation] = useMutation(LoginUser, {
    update(cache, {data:{login}}) {
      cache.writeQuery({
        query: User,
        data: {
          getCurrentUser: login
        }
      });
    }
  });

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validEmail = email && email.includes('@') && email.includes('.')
    setErrorEmail(validEmail ? '' : 'Некорректная почта')
    const validPassword = !!password

    setValidPassword(validPassword)

    if (validEmail && validPassword) {
      loginMutation({
        variables: {
          loginData: {
            email,
            password
          }
        }
      })
        .then(r => r.data.login)
        .then(r => Cookies.set('token', r.token))
        .catch(e => setErrorEmail(e.message))
    }
  }

  return {
    email, setEmail, errorEmail, setErrorEmail,
    password, setPassword,
    validPassword, setValidPassword,
    login
  }
}