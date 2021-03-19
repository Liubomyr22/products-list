import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditModal({open,setOpen }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
       <form className={classes.root} noValidate autoComplete="off">
                <Input style={{ margin: "8px" }} fullWidth placeholder="Change image URL " inputProps={{ 'aria-label': 'description' }} />
                <Input style={{ margin: "8px" }} fullWidth placeholder="Change the name of product " inputProps={{ 'aria-label': 'description' }} />
                <Input style={{ margin: "8px" }} fullWidth placeholder="Change description" inputProps={{ 'aria-label': 'description' }} />
                <Input style={{ margin: "8px" }} fullWidth placeholder="Change how many pieces is left" inputProps={{ 'aria-label': 'description' }} />
                <Input style={{ margin: "8px" }} fullWidth placeholder="Change weight of product" inputProps={{ 'aria-label': 'description' }} />
            </form>
            <Box mt={2} ml={1}>
                <Button color="inherit" variant="outlined">Save</Button>
                <Button style={{marginLeft:'10px'}} color="inherit" variant="outlined">Cancel</Button>
            </Box>
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