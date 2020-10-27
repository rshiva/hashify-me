// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HeroBanner } from "./components/hero_banner";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HeroBanner name="Saurabh" />,
    document.body.appendChild(document.createElement('div')),
  )
})
