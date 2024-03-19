import { useNavigate } from 'react-router-dom'
//import { v4 as uuidv4 } from 'uuid'

import styles from './NovoProjeto.module.css'
import ProjetoForm from '../projeto/ProjetoForm'

function NovoProjeto() {

  const navigate = useNavigate()

  function createPost(project) {

    // iniciando custo e servico
    //project.id = uuidv4();
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
      navigate("/projects", {state: { message: "Projeto criado com sucesso!" }});
    })
    .catch((err) => console.log(err))

  }

  return (
  <div className={styles.novoprojeto_container}>
    <h1>Criar Projeto</h1>
    <p>Crise seu projeto para depois adicionar seus serviço.</p>
    <ProjetoForm handleSubmit={createPost} btnText='Criar projeto'/>
  </div>
  )
}

export default NovoProjeto