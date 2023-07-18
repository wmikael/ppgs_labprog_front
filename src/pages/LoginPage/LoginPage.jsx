import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';


export function LoginPage() {
  const [username, setUsername] = useState("");
  const [senha, setPassword] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/authentication', {  // substitua com a URL da sua API
        email: username,
        password: senha
      });

      // armazene o user id e o token no local storage
      localStorage.setItem('userID', response.data.userID);
      localStorage.setItem('token', response.data.token);

      // redirecione para a página inicial ou outra página
       history.push('/');
    } catch (error) {
      // exiba uma mensagem de erro
      if (error.response) {
        // O pedido foi feito e o servidor respondeu com um status fora do intervalo de 2xx
        alert(error.response.data.message);
      } else if (error.request) {
        // O pedido foi feito, mas não houve resposta
        alert('O servidor não respondeu. Por favor, tente novamente mais tarde.');
      } else {
        // Algo aconteceu na configuração do pedido que acionou um erro
        alert('Ocorreu um erro ao fazer o login. Por favor, tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required onChange={e => setUsername(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}