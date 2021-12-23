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

let liveWeatherReadings = {
    name: "",
    mainWeather: "",
    temp: 0,
    feelsLike: 0,
    tempMin: 0,
    tempMax: 0,
    pressure: 0,
    huimidity: 0,
}

let zipCode = 1336;
let morningMessage = ""


const Chart: React.FC = () => {
    const [sensorData, setSensorData] = useState<SensorReading[]>([]);
    const [liveWeatherData, setLiveWeatherData] = useState(liveWeatherReadings);
    const [date, setDate] = useState(new Date());
  
    function refreshClock() {
      setDate(new Date());
      const currentHour = date.getHours();

      if(currentHour < 12) {
        morningMessage = "Good morning!"
      } else if (currentHour < 18){
        morningMessage = "Good afternoon!"
      } else{
        morningMessage = "Good evening!"
      }
    }


    useEffect(() => {
        refreshClock();
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
    const updateLiveWeatherData = useCallback(async () => {

        let url = '';
        if(zipCode == 0){
            url = 'https://api.openweathermap.org/data/2.5/weather?q=Netherlands&units=metric&exclude=minutely,daily&appid=12aa733d76825d884a0caf790e3bb128'

        } else {
            url = 'https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+',nl&units=metric&exclude=minutely,daily&appid=12aa733d76825d884a0caf790e3bb128'

        }
        const response = await fetch(url)
        const results = await response.json();

        const liveDataReadings = {
            name: results.name,
            mainWeather: results.weather.main,
            temp: results.main.temp,
            feelsLike: results.main.feels_like,
            tempMin: results.main.temp_min,
            tempMax: results.main.temp_max,
            pressure: results.main.pressure,
            huimidity: results.main.humidity,
        };
        console.log(liveDataReadings)

        setLiveWeatherData(liveDataReadings)
    }, [])

    useEffect(() => {
        updateSensorData();
        updateLiveWeatherData();

        const interval = setInterval(() => {
            updateSensorData()
            updateLiveWeatherData();
        }, 300000);

        return () => clearInterval(interval);
 
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
                            <h2 className="font-weight-bold pl-3 pt-3">{morningMessage}</h2>
                            <h1 className="pl-3">{date.toLocaleTimeString("nl-NL")}</h1>
                            <hr className="sidebar-divider" />
                            <h3 className="font-weight-bold text-info pl-3 pt-1">Live Weather:</h3>
                            <h6 className="pl-3 font-weight-bold">{liveWeatherData.name}</h6>
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="pl-3">Temperature: {liveWeatherData.temp}°C</h6>
                                    <h6 className="pl-3">Feels like: {liveWeatherData.feelsLike}°C</h6>
                                    <h6 className="pl-3">Min. Temperature: {liveWeatherData.tempMin}°C</h6>
                                    <h6 className="pl-3">Max. Temperature: {liveWeatherData.tempMax}°C</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="pl-3">Air Pressure: {liveWeatherData.pressure}hPa</h6>
                                    <h6 className="pl-3">Humidity: {liveWeatherData.huimidity}%</h6>
                                </div>
                            </div>
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