import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

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
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DeleteModal({ id, closeCard, open, setOpen }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
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
          onClick={() => setOpen(false)}
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
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
