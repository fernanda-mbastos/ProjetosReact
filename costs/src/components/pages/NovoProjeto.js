import { useNavigate } from 'react-router-dom' // redireciona as paginas quando da um POST

import styles from './NovoProjeto.module.css'
import ProjetoForm from '../projeto/ProjetoForm'

function NovoProjeto() {

  const navigate = useNavigate()

  function createPost(project) {

    // iniciando custo e servico com algum valor 
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: 'POST', // POST = envio de formulario
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project), // manda os dados do projeto
    })
    .then((resp) => resp.json())
    .then((data) => { // realiza o redirecionamento
      navigate("/projects", {state: { message: "Projeto criado com sucesso!" }});
    })
    .catch((err) => console.log(err))

  }

  return (
  <div className={styles.novoprojeto_container}>
    <h1>Criar Projeto</h1>
    <p>Crie seu projeto para depois adicionar seus serviços.</p>
    {/* envio o metodo por meio de props via o handleSubmit*/}
    <ProjetoForm handleSubmit={createPost} btnText='Criar projeto'/>
  </div>
  )
}

export default NovoProjeto