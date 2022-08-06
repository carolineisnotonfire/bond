import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../generated/graphql';


interface Props{

}
export const Login: React.FC = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={ async e => {
        e.preventDefault();
        console.log("formulário enviado");
        const response = await login({
          variables:{
            email,
            password
          }
        });

        console.log(response);

        navigate('/');
      }}
    >
      <div>
        <TextField
          id="standard-basic"
          label="E-mail"
          value={email}
          variant="standard"
          type="email"
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Senha"
          value={password}
          variant="standard"
          type="password"
          placeholder="Senha"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <Button variant="outlined" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  );
};
