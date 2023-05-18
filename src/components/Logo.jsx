import '../styles/logo.css';
import {motion} from 'framer-motion';

function Logo (){
  return (
  <motion.h1>
    <a class="link" menu-toggle>
      <span>AE30 Architekten - Kratochwil Gerhard, Waldbauer Peter, Zeinitzer Klaus</span>
      <div class="logo">
        <img src="/ae30-logo.svg" alt="AE30 Architekten - Kratochwil Gerhard, Waldbauer Peter, Zeinitzer Klaus" />
      </div>
    </a>
  </motion.h1> 
  )}

export default Logo
