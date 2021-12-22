import { FormEvent, useState } from "react";
import { Outlet, Link } from "react-router-dom";




// const onChangeTemperature = (e) => {
//     state.temperatureValue = e.target.value
// }

const Settings = () => {
    const [successMessage, setSuccessMessage] = useState<string>('')

    const sendSettings = async (e: FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement)
        // const settings = {
        //     temperatureValue: parseFloat(!),
        //     eco2Thresh: 0
        // }
    
        // console.log(settings)
        const recipeUrl = 'http://127.0.0.1:8000/set_config/';
        const postBody = {
            temprature_threshold: +data.get("temperatureValue")!,
            eco2_threshold: +data.get("co2Value")!
        };
    
        console.log(postBody)
    
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
    
        await fetch(recipeUrl, requestMetadata);
        setSuccessMessage("Configuration has been successfully updated");
        setTimeout(()=>{
            setSuccessMessage("");
        }, 5000)

        
    
    }

    
  return (
    <>
        <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <div className="col-12">
                        <h6 className="m-0 font-weight-bold text-primary">Settings</h6>
                        {successMessage && 
                            <div className="alert alert-success" role="alert">
                                    {successMessage}
                            </div>
                        }
           
                        <form onSubmit={sendSettings}>
                            <div className="row">
                                <div className="col-6 mt-3">
                                    <label htmlFor="temperatureValue" className="form-label">Temperature threshold value</label>

                                    <div className="input-group mb-3">
                                        <input type="number" name="temperatureValue" className="form-control" id="temperatureValue" defaultValue="20.1" step=".1"/>
                                        <span className="input-group-text">C°</span> 
                                    </div>
                                </div>
                                <div className="col-6 mt-3">
                                    <label htmlFor="co2Value" className="form-label">CO<sup>2</sup> threshold value</label>

                                    <div className="input-group mb-3">
                                        <input type="number" className="form-control" name="co2Value" id="co2Value"  defaultValue="400"/>
                                        <span className="input-group-text">ppm</span> 
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-dark">
                                        Set settings
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
};

export default Settings;