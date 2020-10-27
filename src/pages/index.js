import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Table from "../components/Table"
import Chart from "../components/Chart"
import covidTracking from "../covidtracking.api"
import { Helmet } from "react-helmet"

export default function Home() {
  const [historicUSValues, setHistoricUSValues] = useState([]);
  const [currentUSValues, setCurrentUSValues] = useState({});
  const [lastUpdateET, setlastUpdateET] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await covidTracking.getHistoricUSData();
        let last = new Date(response[0].lastUpdateET || response[0].lastModified || response[0].datechecked);
        setlastUpdateET(last.toLocaleString());
        setCurrentUSValues(response[0]);

        let usDaily = response.map(obj => {
          var temp = Object.assign({}, obj);
          var tempDate = obj.date.toString();
          temp.date = `${tempDate.slice(4, 6)}-${tempDate.slice(6, 8)}-${tempDate.slice(0, 4)}`
          return temp;
        });
        usDaily.reverse();
        setHistoricUSValues(usDaily);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Where Covid-19 Matters</title>
        <body class="my-index-body" />
        <link rel="preload" href="../assets/cdc-coronavirus-covid-19-1.jpg" as="image"></link>
        <link rel="preload" href="../assets/cdc-coronavirus-covid-19-2.jpg" as="image"></link>
        <link rel="preload" href="../assets/cdc-coronavirus-covid-19-3.jpg" as="image"></link>
      </Helmet>
      <Layout>
        <main>

          <div className="container">
            <div className="row featurette first-featurette">
              <div className="col-md-5 offset-md-7" style={{ color: "white" }}>
                <h2 className="featurette-heading">Where COVID-19 Matters</h2>
                <p className="lead">This Gatsby built website allows you to enter multiple zip codes and returns COVID-19 statistics, links to state COVID-19 websites, and if available where to get COVID-19 testing. Find out COVID-19 facts where it matters to you, whether for travel or for family and friends living across the United States.</p>
                <p><a className="btn btn-primary btn-lg" href="/zipcodelist" role="button">Enter zip codes &raquo;</a></p>
              </div>
            </div>
            <h3 className="pb-3 mb-4 font-italic border-bottom">
              US Covid-19 Data
            </h3>
            <div className="row featurette">
              {historicUSValues.length === 0 &&
                <>
                  <div className="col-lg-4">
                    <div className="card mb-4 box-shadow">
                      <div className="card-header"><strong>US Covid-19 Positives</strong></div>
                      <div className="card-body">
                        <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card mb-4 box-shadow">
                      <div className="card-header"><strong>US Covid-19 Deaths</strong></div>
                      <div className="card-body">
                        <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></small>
                      </div>
                    </div>
                  </div>
                </>
              }
              {historicUSValues.length > 0 &&
                <>
                  <div className="col-lg-4">
                    <div className="card mb-4 box-shadow">
                      <div className="card-header"><strong>US Covid-19 Positives</strong></div>
                      <div className="card-img-bottom">
                        <Chart series={[historicUSValues]} seriesNames={[{
                          "name": `Positives`
                        }]} xValue="date" yValue="positive" />
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card mb-4 box-shadow">
                      <div className="card-header"><strong>US Covid-19 Deaths</strong></div>
                      <div className="card-img-bottom">
                        <Chart series={[historicUSValues]} seriesNames={[{
                          "name": `Deaths`
                        }]} xValue="date" yValue="death" />
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></small>
                      </div>
                    </div>
                  </div>
                </>
              }
              {Object.keys(currentUSValues).length === 0 &&
                <div className="col-lg-4">
                  <div className="card mb-4 box-shadow">
                    <div className="card-header"><strong>Current US Numbers</strong></div>
                    <div className="card-body">
                      <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></small>
                    </div>
                  </div>
                </div>
              }
              {Object.keys(currentUSValues).length > 0 &&
                <div className="col-lg-4">
                  <div className="card mb-4 box-shadow">
                    <div className="card-header"><strong>Current US Numbers</strong>
                      <p>Click on the "i" icon or table row to view the Parameter's definition.</p>
                    </div>
                    <div className="table-responsive">
                      <Table className="card-body" currentValues={currentUSValues} caption="The most recent COVID data for the US. The most recent data may not be from today." />
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">Last update: {lastUpdateET}</small>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </main>
        <footer className="container">
          {/* <p>&copy; Company 2017-2018</p> */}
        </footer>
      </Layout>
    </>
  )
}
