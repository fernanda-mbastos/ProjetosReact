import {Link} from "react-router-dom"

import Container from "./Container"

import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'

function Navbar() {
  return(
    <nav className={styles.navbar}>
      <Container>
        <ul className={styles.list}>
          <li><Link to='/'><img src={logo} alt='Costes' /></Link></li>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/Contato'>Contato</Link></li>
          <li><Link to='/Empresa'>Empresa</Link></li>
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar