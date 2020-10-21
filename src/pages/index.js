import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Table from "../components/Table"
import Chart from "../components/Chart"
import covidTracking from "../covidtracking.api"

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
              {Object.keys(currentUSValues).length === 0 &&
                <h4 className="loading">Loading<span>.</span><span>.</span><span>.</span></h4>
              }
              {Object.keys(currentUSValues).length > 0 &&
                <>
                  <h4>Current US Numbers<span style={{ float: "right", fontSize: ".8rem" }}>Last update: {lastUpdateET}</span></h4>
                  <div className="table-responsive">
                    <Table currentValues={currentUSValues} caption="The most recent COVID data for the US. The most recent data may not be from today." />
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
              <h2>US Positives</h2>
              {historicUSValues.length === 0 &&
                <h2 className="loading" style={{ textAlign: "center" }}>Loading<span>.</span><span>.</span><span>.</span></h2>
              }
              {historicUSValues.length > 0 &&
                <>
                  <Chart series={[historicUSValues]} seriesNames={[{
                    "name": `Positives`
                  }]} xValue="date" yValue="positive" />
                  <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                </>
              }
            </div>
            <div className="col-md-4">
              <h2>US Deaths</h2>
              {historicUSValues.length === 0 &&
                <h2 className="loading" style={{ textAlign: "center" }}>Loading<span>.</span><span>.</span><span>.</span></h2>
              }
              {historicUSValues.length > 0 &&
                <>
                  <Chart series={[historicUSValues]} seriesNames={[{
                    "name": `Deaths`
                  }]} xValue="date" yValue="death" />
                  <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                </>
              }
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
