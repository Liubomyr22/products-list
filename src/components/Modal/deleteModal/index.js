import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Card, Typography } from "@material-ui/core";
import {db}  from '../../../services/firebase'


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

export default function DeleteModal({open,setDeleteCard,id,card,setCard }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [x,setX] = React.useState('');

  React.useEffect(() => {
    db.collection("products")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().id === id) {
              setX(doc.id)
              }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  },[id])

  
  const  closeCard = (id = x) => { 
     db.collection('products').doc(id).delete()
      setDeleteCard(false)
      setCard(card)
    };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h4" color="textSecondary" component="h2">
        Delete this Card?
      </Typography>
      <Box mt={2} ml={1}>
        <Button
          onClick={() => closeCard()}
          color="inherit"
          variant="outlined"
        >
          Delete
        </Button>
        <Button
          onClick={() => setDeleteCard(false)}
          style={{ marginLeft: "10px" }}
          color="inherit"
          variant="outlined"
        >
          Cancel
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setDeleteCard(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}