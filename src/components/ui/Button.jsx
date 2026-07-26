import React from 'react'

const Button = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`btn font-mono font-bold ${active ? 'btn-active' : 'btn-outline'}`}
    >
      {label}
    </button>
  )
}

export default Button