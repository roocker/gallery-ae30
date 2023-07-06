/* 
TODO
- [ ] figcaption visual bug when text wrap
- [ ] Picture crop/resize position from CMS / Collection as optional attrib!
https://docs.astro.build/en/guides/integrations-guide/image/#picture-
https://sharp.pixelplumbing.com/api-resize
- [ ] sharp image operation (color correction?)

*/
import '../styles/grid.css';
import { AnimatePresence, motion} from "framer-motion";

// import { Picture } from '@astrojs/image/components';
// const { titleimg, titlealt, cat, subcat, title, short, link } = Astro.props;

// Pictures Aspect Ratio
const width = 3;
const height = 2;

function GridProj (props) {
  const allProjects = props.projects;
  let completedAnimations = 0;
  const totalAnimations = allProjects.length;

  return allProjects.map((proj, index) => {

    let smaller;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    vw > vh ? smaller = vh : smaller = vw;

    const min = smaller * -1;
    const max = smaller;

    const minR = -270;
    const maxR = 270;

    const randomX = Math.random() * (max-min) + min;
    // console.log(randomX);
    const randomY = Math.random() * (max-min) + min;
    // console.log(randomY);
    const randomR = Math.random() * (maxR-minR) + minR;
    // console.log(randomR);
    const randomS = Math.random() ; 
    // console.log(randomS);

    const shuffle = {
      i: {
        x: randomX,
        y: randomY,
        rotate: randomR,
        scale: .8,
      },
      a: {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          type: 'spring', stiffness: 100, damping: 20,
          delay: index * 0.3 * randomS,
        }
      },
      e: {
        x: randomX,
        y: randomY,
      },
      z1:{
        scale: 1.11,
        transition: {
          type: 'spring', stiffness: 100, damping: 20,
        },
      },
      z2:{
        scale: 7,
        originY: "50%",
        originX: "50%",
        transition: {
          type: 'spring', stiffness: 100, damping: 20,
        },
      },
    }; 

    // console.log(allProjects);

    console.log(
      "IAS",
      "title:", proj.data.title,
      "slug:", proj.slug,
      "titleimg:", proj.data.titleimg.img,
      "titlealt:", proj.data.titleimg.alt,
      "cat:", proj.data.category,
    )
  

  return (
      <motion.article
      variants={shuffle}
      initial="i"
      animate="a"
      exit="e"
      whileHover="z1"
      whileTap="z2"
      onAnimationComplete={() => {
        completedAnimations++;
        if (completedAnimations === totalAnimations) {
          window.scrollTo(0, 0);
        }
      }}
      >

      <a href={`../${proj.data.category}/${proj.slug}`}>
      <AnimatePresence
      initial={true}
      >
      <figure>

      <img 
      src={proj.data.titleimg.img}
      alt={proj.data.titleimg.alt}


      widths={[1024, 600, 500, 420, 128]} 
      sizes="(min-width: 2560px) 1024px, (min-width:1920px) 420px, (min-width:1024px) 420px, (min-width:768px) 500px, (min-width: 600px) 600px, (min-width: 420px) 420px, 420px"
      aspectRatio={`${width}:${height}`}
      background={`white`}
      position="attention"
      fit="cover"
      loading="lazy"
      decoding="async"
      class=""
      />

      <figcaption>{proj.data.title}</figcaption>
      </figure> 
      </AnimatePresence>
      </a> 
      </motion.article>
    )
  },)
}

export default GridProj;


