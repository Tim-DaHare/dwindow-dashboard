import { read } from 'fs';
import { report } from 'process';
import React, { useCallback, useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, ResponsiveContainer } from 'recharts';

interface SensorReading {
    temprature: number,
    eco2: number,
    tvoc: number,
    measured_at: string,
}

const liveWeatherTemperature = 20;
const liveWeatherType = "Misty";
const liveWeatherPPM = 214;
const liveWeatherAirDensity = 64;
let morningMessage = ""


const Chart: React.FC = () => {
    const [sensorData, setSensorData] = useState<SensorReading[]>([]);
    const [date, setDate] = useState(new Date());
  
    function refreshClock() {
      setDate(new Date());
      const currentHour = date.getHours();

      if(currentHour < 12) {
        morningMessage = "Good morning"
      } else if (currentHour < 18){
        morningMessage = "Good afternoon"
      } else{
        morningMessage = "Good evening"
      }
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
          clearInterval(timerId);
        };
      }, []);
    const data = [
        { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
        { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
        { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
        { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
        { name: 'Page E', uv: 278, pv: 9800, amt: 2400, uvError: 28 },
        { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
        { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
        { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
        { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
        { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
    ];

    const updateSensorData = useCallback(async () => {
        const response = await fetch('http://127.0.0.1:8000/data-readings/')
        const json = await response.json()

        const readings: SensorReading[] = []
        for (const reading of json['data-readings']) {
            readings.push({
                temprature: reading.temprature,
                eco2: reading.eco2,
                tvoc: reading.tvoc,
                measured_at: reading.measured_at.substr(11, 5),
            })
        }

        setSensorData(readings)
    }, [])

    useEffect(() => {
        updateSensorData()
    }, [])

    const pieChart = () => {

            {/* Pie Chart */}
            {/* <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                    <div className="dropdown no-arrow">
                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="chart-pie pt-4 pb-2">
                        <canvas id="myPieChart"></canvas>
                    </div>
                    <div className="mt-4 text-center small">
                        <span className="mr-2">
                            <i className="fas fa-circle text-primary"></i> Direct
                        </span>
                        <span className="mr-2">
                            <i className="fas fa-circle text-success"></i> Social
                        </span>
                        <span className="mr-2">
                            <i className="fas fa-circle text-info"></i> Referral
                        </span>
                    </div>
                </div>
            </div>
        </div> */}

        return
    }


    return (

        
        
        <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h5 className="m-0 font-weight-bold text-primary">Sensor Data Overview</h5>
                    <div className="dropdown no-arrow">
                        {/* <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a> */}
                        {/* <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div> */}
                    
                    </div>
                </div>
                <div className="row m-0">
                <div className="col-md-6 col-sm-12 p-2">
                        <div className="card-body bg-light h-100">
                            <h2 className="font-weight-bold pl-3 pt-3">{morningMessage}!</h2>
                            <h1 className="pl-3">{date.toLocaleTimeString("nl-NL")}</h1>
                            <hr className="sidebar-divider" />

                            <h3 className="font-weight-bold text-info p-3">Live Weather:</h3>
                            <h5 className="pl-3">{liveWeatherType}</h5>
                            <h5 className="pl-3">Temperature: {liveWeatherTemperature}°C</h5>
                            <h5 className="pl-3">Air quality: Good - {liveWeatherPPM}PPM</h5>
                            <h5 className="pl-3">Air density: {liveWeatherAirDensity}%</h5>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 p-2">
                    <div className="card-body bg-light h-100">
                        <h6 className="font-weight-bold text-primary p-3">Temperature (°C)</h6>
                        <div className="chart-area">
                        <ResponsiveContainer height='100%' width='100%'>
                            <LineChart
                                data={sensorData}
                                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                            >
                                <XAxis dataKey="measured_at"/>
                                <Tooltip />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Line type="monotone" dataKey="temprature" stroke="#FF5F7E" yAxisId={0} />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6 col-sm-12 p-2">
                        <div className="card-body bg-light h-100">
                            <h6 className="font-weight-bold text-primary p-3">CO<sup>2</sup> concentration (eCO<sup>2</sup>)</h6>
                            <div className="chart-area">
                            <ResponsiveContainer height='100%' width='100%'>
                                <LineChart
                                    data={sensorData}
                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                    <XAxis dataKey="measured_at"/>
                                    <Tooltip />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Line type="monotone" dataKey="eco2" stroke="#123234" yAxisId={0} />
                                </LineChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 p-2">
                        <div className="card-body bg-light h-100">
                            <h6 className="font-weight-bold text-primary p-3">Air Quality (TVOC)</h6>
                            <div className="chart-area">
                            <ResponsiveContainer height='100%' width='100%'>
                                <LineChart
                                    data={sensorData}
                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                    <XAxis dataKey="measured_at"/>
                                    <Tooltip />
                                    <CartesianGrid stroke="#eeeeee" />
                                    <Line type="monotone" dataKey="tvoc" stroke="#341412" yAxisId={0} />
                                </LineChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chart