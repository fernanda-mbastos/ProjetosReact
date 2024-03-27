import {useEffect, useState} from 'react'

import styles from './ProjetoForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjetoForm({ handleSubmit, btnText, projectData}) {
  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {}) // verificar os dados do projeto (recebe do componente pai, se eles "vem" ou nao, ai puxa um objeto vazio

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      setCategories(data)
    })
    .catch((err) => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault() // nao permite que o formulario ser executado com page reloded e dps retorna a pagina, que eh o padrao do HTML
    handleSubmit(project) // executa o metodo que for passado pela prop e passo o projeto cadastrado no formulario
  }

  function handleChange(e) { // altera o nome e o obudget do projeto => faz um destructuring, e define o name como o valor passado
    setProject({...project, [e.target.name]: e.target.value })
  }

  function handleCategory(e) {
    setProject({
      ...project, 
      category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text, // seleciona o indice da categoria e retorna o nome dela
    }
    })
  }

  return(
    <form onSubmit={submit} className={styles.form}>
      <Input 
      type='text' 
      text='Nome do projeto' 
      name='name' 
      placeholder='Insira o nome do projeto'
      handleOnChange={handleChange} // metodo para "setar" o nome e budget => metodo dinamico para alterar o valor que queremos preencher 
      value={project.name ? project.name : ''}
      />
      <Input 
      type='number' 
      text='Orçamento do projeto' 
      name='budget' 
      placeholder='Insira o orçamento do projeto' 
      handleOnChange={handleChange}  
      value={project.budget ? project.budget : ''}
      />
      <Select 
      name='category_id'
      text='Selecione a categoria'
      options={categories}
      handleOnChange={handleCategory} 
      value={project.category ? project.category.id : ''} // se nao selecionar uma categoria, retorna vazio para evitar bug no select (diferente dos inputs)
      />
     <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjetoForm