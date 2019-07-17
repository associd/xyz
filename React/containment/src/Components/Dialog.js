import React from "react"

export default function Dialog(props) {
  return (
    <section className="dialog">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </section>
  )
}
