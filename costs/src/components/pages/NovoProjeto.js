import styles from './NovoProjeto.module.css'
import ProjetoForm from '../projeto/ProjetoForm'

function NovoProjeto() {
  return (
  <div className={styles.novoprojeto_container}>
    <h1>Criar Projeto</h1>
    <p>Crise seu projeto para depois adicionar seus serviço.</p>
    <ProjetoForm btnText='Criar projeto'/>
  </div>
  )
}

export default NovoProjeto