import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Contato from './components/pages/Contato'
import Empresa from './components/pages/Empresa'
import Projetos from './components/pages/Projetos'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import NovoProjeto from './components/pages/NovoProjeto'

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>        
          <Route exact path='/' element={<Home />} />
          <Route path='/projetos' element={<Projetos />} />
          <Route path='/empresa' element={<Empresa />} /> 
          <Route path='/contato' element={<Contato />} /> 
          <Route path='/novoprojeto' element={<NovoProjeto />} />        
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;