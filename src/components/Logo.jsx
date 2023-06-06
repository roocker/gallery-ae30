import '../styles/logo.css';
import {motion} from 'framer-motion';

function Logo (){
  return (
  <motion.h1>
    <a className="link">
      <span>AE30 Architekten - Kratochwil Gerhard, Waldbauer Peter, Zeinitzer Klaus</span>
    <svg className="logo">
      <use id="use_logo" className="svg-logo-use" href="/logo.svg#logo_symbol" title="asdf" />
    </svg>
    </a>
  </motion.h1> 
  )}
  // <img src="/logo.svg#logo_symbol" alt=""/>
// <img src="/ae30-logo.svg" alt="AE30 Architekten - Kratochwil Gerhard, Waldbauer Peter, Zeinitzer Klaus" />

export default Logo
