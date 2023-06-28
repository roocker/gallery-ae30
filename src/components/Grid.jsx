import { AnimatePresence, motion} from "framer-motion";
import GridProj from '../components/GridProj.jsx';

function Grid( props ) {

return(
  allProjects.map((proj) =>
<motion.GridProj
    children={props}
    className
  )}
)
  
}
export default Grid

