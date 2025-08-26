import React from 'react'
import { createRoot } from 'react-dom/client'
import SegnalaForm from './components/SegnalaForm.jsx'
import Consulta from './components/Consulta.jsx'
import ContattiForm from "./components/ContattiForm.jsx";

const segnalazioneRoot = document.getElementById('react-segnala')
if (segnalazioneRoot) createRoot(segnalazioneRoot).render(<SegnalaForm />)

const consultaRoot = document.getElementById('react-consulta')
if (consultaRoot) createRoot(consultaRoot).render(<Consulta />)

const contattiRoot = document.getElementById('react-contatti');
if (contattiRoot) {
  createRoot(contattiRoot).render(<ContattiForm />);
}