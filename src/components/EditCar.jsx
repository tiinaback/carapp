import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function EditCar(props){

    //state:
    const [car, setCar] = useState({brand: '', model:'', color: '', fuel: '', year: '', price: ''});
    const [open, setOpen] = useState(false); //is dialog open?

    const handleClickOpen = () => {
        setOpen(true)
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            year: props.params.data.year,
            price: props.params.data.price,
        })
    }

    const handleInputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value })
    }

    const handleClose = (event, reason) => {
        if(reason != 'backdropClick')
        setOpen(false)
    }

    const handleSave = () => {
        console.log(props.params.data._links.car.href);
        props.updateCar(props.params.data._links.car.href, car);
        setOpen(false); 
    }


    return (
        <>
        <Button size="small" onClick={handleClickOpen}>Edit car</Button>
        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>New Car</DialogTitle>
            <DialogContent>
                <TextField
                margin="dense"
                label='Brand'
                name='brand'
                value={car.brand}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>
                <TextField
                margin="dense"
                label='Model'
                name='model'
                value={car.model}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>
                <TextField
                margin="dense"
                label='Color'
                name='color'
                value={car.color}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>
                <TextField
                margin="dense"
                label='Fuel'
                name='fuel'
                value={car.fuel}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>
                <TextField
                margin="dense"
                label='Year'
                name='year'
                value={car.year}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>
                <TextField
                margin="dense"
                label='Price'
                name='price'
                value={car.price}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}