import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import { db } from '../../../services/firebase'


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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DeleteModal({ open, setDeleteCard, id, card, setCard }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [x, setX] = React.useState(false);

  React.useEffect(() => {
  }, [x])

  const closeCard = (id) => {
    setX(!x)
    setCard(() =>
      card.filter(elem => elem.weirdId !== id)
    )
    db.collection('products').doc(id).delete()
    console.log({ id })
    setDeleteCard(false)
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h4" color="textSecondary" component="h2">
        Delete this Card?
      </Typography>
      <Box mt={2} ml={1}>
        <Button
          onClick={() => closeCard(id)}
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
};