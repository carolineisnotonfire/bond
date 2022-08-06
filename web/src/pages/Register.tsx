import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

export const Register: React.FC = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  return (
    <form
      onSubmit={ async e => {
        e.preventDefault();
        console.log("formulário enviado");
        const response = await register({
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
          Enviar
        </Button>
      </div>
    </form>
  );
};
