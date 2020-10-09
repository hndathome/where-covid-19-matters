import React, { useEffect, useState } from "react"
import axios from 'axios'
import Layout from "../components/Layout"
import Table from "../components/Table"

export default function Home() {
  const [currentUSValues, setCurrentUSValues] = useState({});
  const [lastUpdateET, setlastUpdateET] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const covidTrackingUrl = `https://api.covidtracking.com/v1/us/current.json`
        const response = await axios.get(covidTrackingUrl, { headers: { 'Accept': 'application/json' } });
        let last = new Date(response.data[0].lastUpdateET || response.data[0].lastModified || response.data[0].datechecked);
        setlastUpdateET(last.toLocaleString());
        setCurrentUSValues(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <main>
        <div className="container">
          <div className="row featurette first-featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">Where COVID-19 Matters</h2>
              <p className="lead">This Gatsby built website allows you to enter multiple zip codes and returns COVID-19 statistics, links to state COVID-19 websites, and if available where to get COVID-19 testing. Find out COVID-19 facts where it matters to you, whether for travel or for family and friends living across the United States.</p>
              <p><a className="btn btn-primary btn-lg" href="/zipcodelist" role="button">Enter zip codes &raquo;</a></p>
            </div>
            <div className="col-md-5">
              {Object.keys(currentUSValues).length !== 0 &&
                <>
                  <h4>Current US Numbers<span style={{ float: "right", fontSize: ".8rem" }}>Last update: {lastUpdateET}</span></h4>
                  <div className="table-responsive">
                    <Table currentUSValues={currentUSValues} />
                  </div>
                </>
              }
            </div>
          </div>
          <hr className="featurette-divider"></hr>
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
          {/* <hr className="featurette-divider"></hr> */}
        </div>
      </main>
      <footer className="container">
        {/* <p>&copy; Company 2017-2018</p> */}
      </footer>
    </Layout>
  )
}
