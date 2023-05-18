/*
TODO:
- [ ] body doesn't render markdown?

  */
import "../styles/modal.css";
import React from 'react';
import { motion } from 'framer-motion';

const animation_variants = {
  i: {y: -100, opacity: 0, },
  a: { y: 0, opacity: 1, },
  e: {y: 100, opacity: 0, },
}



function TextModal(props) {
  return ( 
    <motion.div
    id="textmodal"
    className="hidden"
    variants="animation_variants"
    initial="i"
    animate="a"
    exit="e" >
      <h2>{props.title}</h2>
      <dl className="textmodal_ul">
        <dt>Jahr:</dt><dd>2018 - 2022</dd>
        <dt>NFL:</dt><dd>3000m²</dd>
        <dt>Typ:</dt><dd>Neubau, Erweiterung</dd>
        <dt>Tags:</dt><dd>{props.subcategory}</dd>
      </dl>
      <details open>
        <summary>Kennwerte</summary>
    <p>
      id: {props.id} <br/>
      slug: {props.slug} <br/>
      collection: {props.collection} <br/>
      render: {props.render} <br/>

    </p>
      </details>
    <p>{props.short}</p>
    <p><a href="#">mehr...</a></p>

    <p>
    {props.body}
    </p>
    <button className="modal_btn btn_close" type="button" title="Text Pop-up schließen" aria-label="Text Pop-up schließen" tm-toggle>
          <svg className="svg-icon">
    <use id="icon-close" className="svg-icon-use" href="/svg.svg#close" />
          </svg>
        </button>
    </motion.div>
  )
}
export default TextModal
