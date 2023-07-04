import { motion, AnimatePresence } from 'framer-motion'
import Backdrop from '../components/Backdrop'
import '../styles/nav.css'

function MainNav (props){

  const menueItems = props.menue_items;

  return(
    <AnimatePresence initial={false}>
    <Backdrop onClick={handleClose}>
    <nav
    id="mainnav"
    className=""
    variants="animation_slidein"
    initial="i"
    animate="a"
    exit="e"
    >

    <div class="menue-icons">
      <button class="button-icon" type="button" title="Hauptmenü schließen" aria-label="Hauptmenü schließen" menu-toggle>
        <svg class="svg-icon">
          <use id="icon-close" class="svg-icon-use" xlink:href="/svg.svg#close" />
        </svg>
      </button>
    <!-- Menü Toggle Button -->
    </div>

    <ul className="menue">
    menueItems.map((item) =>{
      <li><a href={item.url}>{item.name}</a></li>
    })
    </ul>

    </nav>
    </Backdrop>
    </AnimatePresence>

  )
}
export default MainNav
