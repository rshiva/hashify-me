import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Contact } from "./components/contact";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Contact />,
    document.body.appendChild(document.createElement('div')),
  )
})