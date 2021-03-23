import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import EditModal from "../Modal/editModal";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteModal from "../Modal/deleteModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
  },
  media: {
    height: "30%",
    paddingTop: "86.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  description: {
    height: "80px",
    overflow:"auto"
  
  }
}));

export default function ProductCard({
  id,
  setCard,
  card,
  imageUrl,
  name,
  count,
  description,
  comments = [],
  weight,
  updateCardItem,
  setOpen,
  wId,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [deleteCard, setDeleteCard] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [commentar,setCommentar] = React.useState(false);

  React.useEffect(() => {
  },[commentar])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addComment = () => {
    comments.push(value)
    setValue("");
  };

  const removeComment = (comment) => {
    for(let i = 0; i <= comments.length;i++){
      if(comments[i] === comment) {
        comments.splice(i,1)
      }
    }
  setCommentar(!commentar)
  };

  const changeCardInformation = (
    changeUrl,
    name,
    description,
    count,
    weight = "",
    id,
    wId
  ) => {
    updateCardItem(id, {
      imageUrl: changeUrl,
      name: name,
      description,
      count,
      weight,
      id,
      wId, 
      comments
    });
    setOpenEdit(false);
  }; 

  return (
    <>
      {openEdit && (
        <EditModal
          open={openEdit}
          setOpen={setOpenEdit}
          changeCardInformation={changeCardInformation}
          id={id}
          name={name}
          url={imageUrl}
          count={count}
          description={description}
          weight={weight}
          weirdId={wId}
          comments={comments}
        />
      )}
      {deleteCard && (
        <DeleteModal
        setCloseCard={setOpen}
          id={wId}
          card={card}
          setCard={setCard}
          open={deleteCard}
          setDeleteCard={setDeleteCard}
        />
      )}
      <Card className={classes.root}>
        <CardHeader
          style={{ height: "70px" }}
          action={
            <IconButton aria-label="settings">
              <Box>
                <DeleteIcon onClick={() => setDeleteCard(true)} />
              </Box>
            </IconButton>
          }
          title={name}
        />
        <CardMedia  className={classes.media} image={imageUrl} />
        <CardContent >
          <Typography 
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {`Weight ${weight}`}
            <br></br>
            <br></br>
            <b>{`${count} pieces left.`}</b>
          </Typography>
          <Box ml={3}>
            <Button
              style={{ width: "150px" }}
              onClick={() => setOpenEdit(true)}
              color="inherit"
              variant="outlined"
            >
              Edit
            </Button>
          </Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            {comments.map((elem) => {
              return (
                <Box key={Date.now()} style={{ position: "relative" }}>
                  {" "}
                  <Typography paragraph>
                    {elem}{" "}
                    <DeleteIcon
                      style={{ position: "absolute", right: "-4%" }}
                      onClick={() => removeComment(elem)}
                    />{" "}
                  </Typography>
                </Box>
              );
            })}
          </CardContent>
          <Box m={2}>
            <TextField
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              fullWidth
              id="standard-basic"
              label="Leave your comment"
            />
          </Box>
          <Box m={1}>
            <Button
              onClick={addComment}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
            >
              {" "}
              Send{" "}
            </Button>
          </Box>
        </Collapse>
      </Card>
    </>
  );
}
