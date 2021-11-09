import React from 'react'

export default function LayoutPhone(props) {
  const {header, children} = props
  return (
    <div className="d-flex flex-column disable-select vh-100">
        <div className="flex-shrink-0 flex-grow-0">
          {header}
        </div>
        <div className="flex-shrink-1 flex-grow-1 overflow-hidden">
          {children}
        </div>
      </div>
  )
}