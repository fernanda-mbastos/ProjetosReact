import { useState, useEffect } from 'react'

import styles from './Message.module.css'

function Message({type, msg}) {

  const [visible, setVisible] = useState(false) // altera a visibilidade da msg apos 3s, comeca nao exibindo (false)

  useEffect(() => { // utilizado para definir o timer da condicao, sempre ligado a alguem

    if(!msg) { // se nao tem msg, nao exibe nada
      setVisible(false)
      return
    }

    setVisible(true) // se tem msg ja passa para ca, nao precisa do else

    const timer = setTimeout(() => { // timer para eliminar a msg
      setVisible(false) // apaga a msg
    }, 3000)

    return () => clearTimeout(timer) // encerra a sessao com uma arrow function para "limpar" o timer

  }, [msg])

  return(
    <> {/*fragment ajuda no if, elimina a aparicao da msh*/} 
      {visible && (
        // classe dinamica que vem das props
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}  
    </>
  )
}

export default Message