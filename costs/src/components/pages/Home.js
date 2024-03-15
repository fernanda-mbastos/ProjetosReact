import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton';

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem vindo ao <span>Costs</span></h1>
      <p>Projeto criado no curso do canal Hora de Codar. Gerencie seus projetos agora mesmo!</p>
      <LinkButton to='/novoprojeto' text='Criar projeto' />
      <img src={savings} alt='costs' />
    </section>                                                         
  )
}

export default Home;