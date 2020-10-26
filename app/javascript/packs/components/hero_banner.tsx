import * as React from 'react'

type Props = {
    name: string
}

export const HeroBanner: React.FC<Props> = props => (
    <div className="text-red-600">Hello {props.name}!</div>
  )
  