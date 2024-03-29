import {useLocation} from 'react-router-dom' 

import { useState, useEffect } from 'react'

import Message from "../layout/Message"
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton' 
import ProjectCard from '../projeto/ProjectCard'

import styles from './Projects.module.css'


function Projects() {
  // state para salvar os projetos
  const [projects, setProjects] = useState([])
  // state para controlar a aparicao do loading
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation() // resgata a msg por meio do hook
  let message = ''
  if (location.state) { // se "veio" o location.state, acesso a msg que esta la
    message = location.state.message
  }

  //request para buscar os projetos no banco, preenche o array iniciamente vazio
  useEffect(() => {
    // setTimeout ficticio para atrasar o loading
    setTimeout(() => {
      fetch('http://localhost:5000/projects',{ // requisição de fetch dentro do setTimeout
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((resp) => resp.json()) // pega a resposta e transforma em json
    .then((data) => {
      setProjects(data) // "seta" os projetos por meio da API
      setRemoveLoading(true)
    }).catch((err) => console.log(err)) // para debugar a aplicacao se for necessario
    }, 500)
  }, [])

  //funcao faz um request para deletar da API, acessa o ID na rota
  function removeProject(id) {

    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },  
    }).then((resp) => resp.json())
    .then(() => {
      // filter para deletar no front o id requisitado (so mantem os que forem diferente)
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Projeto deletado com sucesso!')

    })
    .catch((err) => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to='/novoprojeto' text='Criar projeto' />
      </div>
    {/*codiciona a exibicao da msg dinamicamente, nesse caso sempre eh sucesso*/}
      {message && <Message type='sucess' msg={message} />}
      {projectMessage && <Message type='sucess' msg={projectMessage} />}
      <Container customClass='start'>
        {/* cria os cards dinamicamente, comeca com uma condicao se existe ou nao projeto. Faz um map em cima dos projetos e transforma os dados em um project. Retorna um oabjeto em jSX, entao usa () */}
        {projects.length > 0  &&
          projects.map((project) => 
          (<ProjectCard //* definir as props do Card
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id} // necessario key unica pois esta se repetindo no map
              handleRemove={removeProject} // manda a função com props
            />
          ))}
         {!removeLoading && <Loading />}
         {/*quando nao houver projetos e o louder ja estiver sido removido*/}
         {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados</p>
         )}
      </Container>
    </div>
  )
}

export default Projects;