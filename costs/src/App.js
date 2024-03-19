import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Contato from './components/pages/Contato'
import Empresa from './components/pages/Empresa'
import Projects from './components/pages/Projects'
import NovoProjeto from './components/pages/NovoProjeto'
import Project from './components/pages/Project'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'


function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>        
          <Route exact path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/empresa' element={<Empresa />} /> 
          <Route path='/contato' element={<Contato />} /> 
          <Route path='/novoprojeto' element={<NovoProjeto />} />    
          <Route path='/project/:id' element={<Project />} />        
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;