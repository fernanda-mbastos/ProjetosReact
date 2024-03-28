// componente que traz os projetos individualmente

import { Link } from 'react-router-dom'

import styles from './ProjectCard.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs' // icones de editar e limpar

function ProjectCard({ id, name, budget, category, handleRemove}) {

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id) // passa o id para o componente superior que eh o project
  }

  return(
    <div className={styles.project_card}>
      <h2>{name}</h2>
      <p>
        <span>Orçamento: </span>R$ {budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category} {/*span eh a bolinha colorida para cada category, altera a cor dinamicamente dependendo da catergoria*/}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}> {/*vai para pagina de cada projeto*/}
          <BsPencil /> Editar 
        </Link>
        <button onClick={remove}> {/* passa a funcao remove que por sua fez passa para o componente pai*/}
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default ProjectCard