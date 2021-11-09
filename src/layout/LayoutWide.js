import React from 'react'

export default function LayoutPhone(props) {
  const {header, children} = props
  return (
    <div className="row g-0 vh-100">
        <div className="col-md-3">
          {header}
        </div>
        <div className="col-md-9">
          {children}
        </div>
      </div>
  )
}