import { useEffect, useRef } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";


export default function Carlist() {

    //state variables
    const [cars, setCars] = useState([{brand: '', model: '', color: '', fuel: '', year: '', price: ''}]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false); // is snackbar open?
   
    //columns for cars ag-grid
    const columns = [
        { headerName: 'Brand', field: 'brand', sortable: true, filter: true },
        { headerName: 'Model', field: 'model', sortable: true, filter: true },
        { headerName: 'Color', field: 'color', sortable: true, filter: true, width: 150},
        { headerName: 'Fuel', field: 'fuel', sortable: true, filter: true, width: 100 },
        { headerName: 'Year', field: 'year', sortable: true, filter: true, width: 100 },
        { headerName: 'Price', field: 'price', sortable: true, filter: true, width: 100 },
        { 
            cellRenderer: params =>
                <Button size="small" color="error" onClick = {() => deleteCar(params)}>
                    Delete 
                </Button>,
                width: 120
        },
        {
            cellRenderer: params => <EditCar params={params} updateCar={updateCar}/>,
            width: 120
        }
    ]

    const gridRef = useRef();

    //call getCars() function when rendering the component very first time
    useEffect(() => getCars(), [])

    //app is using carrestapi application which is deployed to heroku, affress below
    const REST_URL = 'https://carrestapi.herokuapp.com/cars';
    const getCars = () => {
        fetch(REST_URL)
        .then(response => response.json())
        .then(responseData => 
             setCars(responseData._embedded.cars))
        .catch(error => console.error(error));
    
    }

    const deleteCar = (params) => {
        console.log("params: " + params.data._links.car.href);
        fetch(params.data._links.car.href, {method: 'DELETE'})
        .then(response => {
            if (response.ok){
                setMsg('Car is deleted successfully!');
                setOpen(true);
                getCars();
            } else {
                alert('Something went wrong!');
            }
        })
        .catch(error => console.error(error));

    }

    // REST API call
    const addCar = (car) => {
        //alert("Lisään auton kohta REST-rajapinnan avulla tietokantaan");
        fetch(REST_URL, {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
         })
         .then(response => {
            if (response.ok){
                getCars();
            }else {
                alert('Something went wrong!')
            }
         })
         .catch(err => console.error(err))
    }

    const updateCar = (REST_URL, updatedCar) => {
        fetch(REST_URL, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if(response.ok){
                setMsg('Car updated successfully');
                setOpen(true);
                getCars();
            } else
                alert('Something went wrong' + response.statusText)
        })
        .catch(err => console.error(err))
    }

    return (
        <>
            <AddCar addCar={addCar}/>
            <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto'}}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    animateRows={true}
                    rowSelection="single"
                    pagination ={true}
                    paginationPageSize={10}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}>
                </AgGridReact>

                <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}>

                </Snackbar>
            </div>
        </>
    )

}