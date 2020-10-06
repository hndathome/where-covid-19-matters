import React from "react"
import Layout from "../components/Layout"

//`https://api.covidtracking.com/v1/us/current.json`
export default function Home() {
  return (
    <Layout>
      <main>
        <div className="container">
          <div className="jumbotron">
            <div className="container">
              <h1 className="display-3">Where COVID-19 Matters</h1>
              <p>This Gatsby built website allows you to enter multiple zip codes and returns COVID-19 statistics, links to state COVID-19 websites, and if available where to get COVID-19 testing. Find out COVID-19 facts where it matters to you, whether for travel or for family and friends living across the United States.</p>
              <p><a className="btn btn-primary btn-lg" href="/zipcodelist" role="button">Enter zip codes &raquo;</a></p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              {/* <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p> */}
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              {/* <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p> */}
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              {/* <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p> */}
            </div>
          </div>
          <hr />
        </div>
      </main>
      <footer className="container">
        {/* <p>&copy; Company 2017-2018</p> */}
      </footer>
    </Layout>
  )
}
