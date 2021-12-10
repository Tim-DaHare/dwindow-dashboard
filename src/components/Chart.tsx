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

const Chart: React.FC = () => {
    const [sensorData, setSensorData] = useState<SensorReading[]>([]);

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
        const response = await fetch('http://raspberrypidehaas.local:8000/data-readings')
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

    return (
        <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Sensor Data Overview</h6>
                    <div className="dropdown no-arrow">
                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="chart-area">
                    <ResponsiveContainer height='100%' width='100%'>
                        <LineChart
                            data={sensorData}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <XAxis dataKey="measured_at" />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line type="monotone" dataKey="temprature" stroke="#FF5F7E" yAxisId={0} />
                            <Line type="monotone" dataKey="eco2" stroke="#FFAB4C" yAxisId={1} />
                            <Line type="monotone" dataKey="tvoc" stroke="#B000B9" yAxisId={2} />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chart