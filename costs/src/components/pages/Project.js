import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../projeto/ProjetoForm'
import ServiceForm from '../service/ServiceForm'
import Message from '../layout/Message'

function Project() {  
  const { id }  = useParams() // hook para pegar o id da url
  const [project, setProject] = useState([]) // criar o projeto
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMesage] = useState()
  const [type, setType] = useState()
  
  // resgata o projeto do banco
  useEffect(() => {
    // simula o carregamento da edição do projeto, nao tem nome do projeto durante 1s, entao carrega o loading via if ternário no return
   setTimeout(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then(resp => resp.json())
    .then((data) => { 
      setProject(data) // resgata o projeto 
    })
    .catch((err) => console.log(err))
   }, 1000)

  }, [id]) // monitora o id do projeto (parametro de referencia)

  // metodo para edição do projeto
  function editPost(project) {

    setMesage('') // para sempre aparecer a msg quando altera algo

    // budger validation
    if(project.budget < project.cost) {
      setMesage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false // para tudo, não atualiza o projeto
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH', // so atualiza no banco o que mandar
      headers: {
        'Content-type': 'application-json'
      },
      body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProject(data) // altera com os novos dados
      setShowProjectForm(false) // tira o formulário de exibição
      setMesage('Projeto atualizado!')
      setType('succes')
    })
    .catch((err) => console.log(err))
  }

  // metodo para mostrar o formulario de edição. Troca o estado para o negativo do showProjectForm
  function toggleProjectForm() {
    setShowProjectForm(!showServiceForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return(
    <> {/* fragmento para auxiliar o if ternário, se tem ou não projeto */}
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass='column'>
            {message && <Message type={type} msg={message}/>}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {/* alterna os botoes a depender do estado do showProject, que vem do onClick */}
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                {/* tambem alterna a exibição a depender do estado do showProject */}
                {!showProjectForm ? ( 
                  <div className={styles.project_info}>
                    <p>
                      <span>Categoria: </span>{project.category.name}
                    </p>
                    <p>
                      <span>Total do orçamento: </span>R$ {project.budget}
                    </p>
                    <p>
                      <span>Total utilizado: </span>R$ {project.cost}
                    </p>                    
                  </div>                  
                ) : (
                  <div className={styles.project_info}>
                    {/*props definidas noa ProjectForm. O projectData eh o próprio project que veio do fetch com o GET*/}
                    <ProjectForm handleSubmit={editPost} btnText='Concluir edição' projectData={project}/>
                  </div>                  
                )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
              {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass='start'>
              <p>itens de servicos</p>

            </Container>
          </Container>
        </div>  
      ) : (
        <Loading />)}
    </>
  )
}

export default Project