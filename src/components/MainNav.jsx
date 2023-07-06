import { motion, AnimatePresence } from 'framer-motion'
import Backdrop from '../components/Backdrop'
import '../styles/nav.css'
import { stateMainNav } from '../states';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';

function MainNav (props){

  const menuURLs = props.menu_urls;
  const menuNames = props.menu_names;
  console.log('MainNav', menuURLs, menuNames);

  const tMenu = useStore(stateMainNav);
  const toggleMenu = () => {
    stateMainNav.set(!tMenu)
  }; 
  const handleClose = () => {
    stateMainNav.set(false);
  }

  /* let tSmallWindow = false;
  window.innerWidth > 816 ? tSmallWindow = true : tSmallWindow = false;
  console.log("HALLO", tSmallWindow) */

  useEffect(() => {

    const handleKeyDown = (event) => {
      switch(event.key) {
        case 'm':
          toggleMenu();
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },);


  return(

    <AnimatePresence initial={false}>
    {tMenu && (
      <Backdrop classname="backdrop_menue" onClick={handleClose} >
      <motion.nav
      id="mainnav"
      className={tMenu ? '' : 'menue_hidden'}
      variants="animation_slidein"
      initial="i"
      key={tMenu}
      animate="a"
      exit="e"
      >

      <div className="menue-icons">
      <button className="button-icon" type="button" title="Hauptmenü schließen" aria-label="Hauptmenü schließen" onClick={handleClose}>
      <svg className="svg-icon">
      <use id="icon-close" className="svg-icon-use" href="/svg.svg#close" />
      </svg>
      </button>
      </div>

      <ul className="menue">
      {menuNames.map((name, index) =>(
        <li key={index}><a href={`../${menuURLs[index]}`}>{name}</a></li>
      ))}
      </ul>

      </motion.nav>
      </Backdrop>
    )}
    </AnimatePresence>
  )
}
export default MainNav
