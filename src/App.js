import React, { useEffect } from 'react';
import { db } from './services/firebase';
import { AppBar, Container, Toolbar, Box, Typography, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from '../src/components/Card/index'
import NewCardModal from './components/Modal/newCardModal';
import Input from '@material-ui/core/Input'


// const products = [
//   {
//     id: 1,
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Qtbnh_hgDEqlAsjmhBMtHnF7OMJDfFtfBw&usqp=CAU',
//     name: 'MASTER OF G Series MUDMASTER',
//     count: 4,
//     size: {
//       width: 200,
//       height: 200
//     },
//     description: 'From the MASTER OF G Series MUDMASTER, the watch that is designed and engineered to withstand rough land environments, come carbon resin models that incorporate a new type of structure.',
//     weight: '92g',
//     comments: ['The top layer is transparent, resulting in a bezel that shows the embedded carbon material. ', ' Manually obtained altitude points can be plotted on your route']
//   },
//   {
//     id: 2,
//     imageUrl: 'data:image/jpeg;base64,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ERAREQEREBERAREQEREBERAREQKHvIBTxLpe2cCqo7QdGt+YH4iVjE7BqYkK1d3qAXyBmLCmrW0UH1RoNB2CaztDZ1HELkrIrjlfip7VI1U94ldOHCdReC9UczYaC55yooTbpuvqMw85H19z3P3UP5chPiUIM03LOMndAyc7jE/5FM/nqD63n1o7j2/yKY/PVP0Imp9GOyOj7oFAwu69VfVyU+9Kaq37RuZ9X3Pz61GZz3kmXrJOQkCvbDwVbDvTpmq5pC4WmSSiEK1io5aFuHbLzsVg2ZwQbWTTWxGrfUfCR2H2VSrsFqgkLdwAzJc8LHKQSNTpLDQopTUJTUIo0CqAqgdwEK+kREgREQEREBERAREQEREBERAREQEREBERASsYtuu3vH6mWeVHaD2qP7zfxGB2zRmnl6SOklR6s05zTydJOekgerNOQ08nSTstSBObGPWPgfqJLyF2C1yfD+Yk1IpERAREQEREBERAREQEREBERAREQEREBERASkbae1Zx3n6y7zP956uXE1B4H4gH+csD59LHSyPGInP2iVEh0sdLPB9oj7QIEh0s5WrI77RO6YiBcd2DfMZPSubnNcVD7o/iv/KWOZUiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgJXd8sBSakarL110DXINuw24+cRAz8ReImkdlE7ZBOYgMgn1oUwWAPaBz7ZzEDTtnYVKVMLTXKOPM3J4kk6memImVIiICIiAiIgIiICIiB//Z',
//     name: 'SAMSUNG Galaxy Watch Active - Silver',
//     count: 41,
//     size: {
//       width: 200,
//       height: 200
//     },
//     description: 'Voice commands / smartphone notifications.Contactless payments via Samsung Pay.Health & fitness tracking with heart rate monitor & GPS',
//     weight: '72g',
//     comments: ['Battery life: Up to 90 hours', 'Compatible with iOS / Android']
//   },
//   {
//     id: 3,
//     imageUrl: 'data:image/jpeg;base64,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',
//     name: 'TIMEWEAR Analogue Watch',
//     count: 42,
//     size: {
//       width: 200,
//       height: 200
//     },
//     description: 'This stylish Timewear men’s watch comes with a black analog dial which beautifully offsets the silver time markers and watch hands. The classic analog display offers a clean and uncluttered interface that is easy to read.',
//     weight: '100g',
//     comments: ['Beautifully designed, this silver coloured analog watch with leather bands from Timewear blends classic elegance with modern styling', 'The watch is water resistant, which makes it all the more functional']
//   },
//   {
//     id: 4,
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP7qyGI2kTeivgcDwsHoNjDTskIsafvXfbMQ&usqp=CAU',
//     name: 'A Lange & Söhne',
//     count: 22,
//     size: {
//       width: 200,
//       height: 200
//     },
//     description: 'Many regard the Saxon watchmaking house as Germany’s answer to Patek Philippe – and recent auctions show that serious money is being paid for both early, complicated pocket watches and the more special pieces produced since Lange’s “new era” began after German reunification.',
//     weight: '110g',
//     comments: [' While the city ring and the crown-based synchronisation mechanism have both been retained', ' There’s a new movement that powers day and night indicators for each dial and a nifty system to flag locations that use daylight saving time.']
//   },
//   {
//     id: 5,
//     imageUrl: 'https://media.gq-magazine.co.uk/photos/5fca182892ebf1a23ff74a42/master/w_1024%2cc_limit/04112020_Watches_30.jpg',
//     name: 'Bell & Ross',
//     count: 33,
//     size: {
//       width: 200,
//       height: 200
//     },
//     description: 'If you’ve been following the watch trends of 2020, you’ll know that “integrated bracelets” are where it’s at. Bell & Ross responded with its BR-05 range, which starts with a £3,600 model on rubber and rises to the all-gold range-topper at £27,000. A new chronograph version has just been released too.',
//     weight: '90g',
//     comments: ['The watch can come on a black and yellow “carbon effect” calfskin strap or a steel bracelet.', ' Limited to 999 examples']
//   },
//   {
//     id: 6,
//     imageUrl: 'https://media.gq-magazine.co.uk/photos/5fca183292ebf1a23ff74a46/master/w_1024%2cc_limit/04112020_Watches_32.jpg',
//     name: 'Breguet',
//     count: 48,
//     size: {
//       width: 200,
//       height: 200
//     },
//     description: 'Breguet is so revered in the watch world that the brand doesn’t need to boost its image through sponsorship – but it is the main backer of Race For Water, a foundation dedicated to preserving H2O. To spread the word, a self-sufficient, Breguet-funded yacht is sailing the world as part of a programme called Odyssey 2017-2021.',
//     weight: '131g',
//     comments: [' Meanwhile, in the world of fine watches, the new Tradition Quantième Rétrograde 7597 deserves top honours.', 'Displaying the extreme levels of fit and finish for which Breguet is famous.']
//   },
// ]
// const comments = [
//   {
//     id: 3,
//     productId: 1,
//     description: 'some text here',
//     date: Date.now()
//   },
//   {
//     id: 3,
//     productId: 1,
//     description: 'some text here',
//     date: Date.now()
//   },
//   {
//     id: 3,
//     productId: 1,
//     description: 'some text here',
//     date: Date.now()
//   },
//   {
//     id: 3,
//     productId: 1,
//     description: 'some text here',
//     date: Date.now()
//   },
//   {
//     id: 3,
//     productId: 1,
//     description: 'some text here',
//     date: Date.now()
//   },
//   {
//     id: 3,
//     productId: 1,
//     description: 'some text here',
//     date: Date.now()
//   }
// ]
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
  },
  cardsContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: theme.spacing(23),
  },
  input: {
    background: "#999"
  }

}));

function App() {
  const [open, setOpen] = React.useState(false);
  const [card, setCard] = React.useState([]);
  const [search, setSearch] = React.useState('')
  
  React.useEffect(() => {
    db.collection('products').get().then( snapshot => {
      const products = []
      snapshot.forEach( doc => {
        const data = doc.data()
        products.push(data)
      //  console.log(data)
      })
      setCard(products)
    })
    .catch( error => console.log(error))
  },[])


  const classes = useStyles();

  const updateCardItem = (id, data) => {
    setCard(cardsData => cardsData.map(card => card.id === id ? data : card))
  }
 
  const addCard = (url, name, description, pieces = "", weight = "", comments = []) => {
    // setCard([
    //   ...card,
    //   {
    //     id: card.length + 1,
    //     imageUrl: url,
    //     name,
    //     description,
    //     count: pieces,
    //     weight,
    //     comments
    //   }

    // ])
    db.collection('products').add(
      {
        id: card.length + 1,
            imageUrl: url,
            name,
            description,
            count: pieces,
            weight,
            comments
      }
    )
    setOpen(false)
  }

  const filterByName = () => {
    const arr = []
    card.forEach((todo) => {
      if (todo.name.toLowerCase().startsWith(search) || todo.name.toUpperCase().startsWith(search) || todo.count.toString().startsWith(search.toString())) {
        arr.push(todo)
      }
    })
    setCard(arr);
  }
  React.useEffect(() => {
    if (search.length === 0) {
      db.collection('products').get().then( snapshot => {
        const products = []
        snapshot.forEach( doc => {
          const data = doc.data()
          products.push(data)
         

        })
        setCard(products)
      })
    }
  },[search])

  return (
    <>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Box p={1}>
              <Input className={classes.input} id="outlined-basic" label="Search by name"  variant="filled"
                InputLabelProps={{
                  shrink: true,
                }}
                value={search} onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value)
                }}
              />
            </Box>
            <Box ml={1}>
              <Button onClick={() => filterByName()} color="inherit" variant="outlined">Sort</Button>
            </Box>
            <Box ml={2} >
              <Button onClick={() => setOpen(true)} color="inherit" variant="outlined">New</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <main className={classes.cardsContent}>
          {card.map(elem => {
            return <Box key={elem.id} mr={3} padding={2}>
              <ProductCard key={elem.id} imageUrl={elem.imageUrl}
                name={elem.name}
                count={elem.count}
                size={elem.size}
                description={elem.description}
                comments={elem.comments}
                weight={elem.weight}
                id={elem.id}
                setCard={setCard}
                card={card}
                updateCardItem={updateCardItem}
              />
            </Box>
          })}
        </main>
      </Container>
      {open && <NewCardModal addCard={addCard} open={open} setOpen={setOpen} />}

    </>
  );
}

export default App;
