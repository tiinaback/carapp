import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function AddCar(props){

    //state:
    const [car, setCar] = useState({brand: '', model:'', color: '', fuel: '', year: '', price: ''});
    const [open, setOpen] = useState(false); //is dialog open?

    const handleClose = (event, reason) => {
        if(reason != 'backdropClick')
        setOpen(false)
    }

    const handleInputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        props.addCar(car);
        setOpen(false); //suljetaan dialogi
    }

    //return: addbutton & dialog (add form)
    return (
        <>
        <Button variant="outlined"
            onClick={() => setOpen(true)}>New Car</Button>
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
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}