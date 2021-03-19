import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 300,
        height: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function NewCardModal({ addCard, open, setOpen }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [url, setUrl] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [pieces, setPiecses] = React.useState('');
    const [weight, setWeight] = React.useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form>
                <Input value={url}
                    onChange={(e) => {
                        setUrl(e.target.value)
                    }}
                    style={{ margin: "8px" }} fullWidth placeholder="Enter image URL " inputProps={{ 'aria-label': 'description' }} />
                <Input value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    style={{ margin: "8px" }} fullWidth placeholder="Enter the name of product " inputProps={{ 'aria-label': 'description' }} />
                <Input value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    style={{ margin: "8px" }} fullWidth placeholder="Enter description" inputProps={{ 'aria-label': 'description' }} />
                <Input value={pieces}
                    onChange={(e) => {
                        setPiecses(e.target.value)
                    }}
                    style={{ margin: "8px" }} fullWidth placeholder="Enter how many pieces is left" inputProps={{ 'aria-label': 'description' }} />
                <Input value={weight}
                    onChange={(e) => {
                        setWeight(e.target.value)
                    }}
                    style={{ margin: "8px" }} fullWidth placeholder="Enter weight of product" inputProps={{ 'aria-label': 'description' }} />
            
            <Box mt={2} ml={1}>
                <Button onClick={(e) => {
                    e.preventDefault();
                    addCard(url,name,description,pieces,weight)}} color="inherit" variant="outlined">Add</Button>
                <Button onClick={handleClose} style={{ marginLeft: '10px' }} color="inherit" variant="outlined">Cancel</Button>
            </Box>
            </form>
        </div>
    );

    return (
        <div>
            {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}