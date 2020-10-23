// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import * as React from 'react'
import * as ReactDOM from 'react-dom'

type Props = {
  name: string;
}

export const Hello: React.FC<Props> = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="Saurabh" />,
    document.body.appendChild(document.createElement('div')),
  )
})
