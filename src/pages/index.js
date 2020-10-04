import React from "react"
import { Link, Router } from "@reach/router";

export default function Home() {
  return (
    <>
      <h1>Tutorial!</h1>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="dashboard">Dashboard</Link>
      </nav>
    </>

  )
}
