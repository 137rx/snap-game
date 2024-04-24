"use client";
import { useState, useEffect } from "react"
import Button from "./components/Button"
import Card from './components/Card'
import Container from './components/Container'
import Text from './components/Text'
import Title from './components/Title'
import CardImage from './components/CardImage'
import { addUsedPile, drawCard, listUsedPile, newDeck, resetDeck } from '../app/api/apis';

export default function Home () {
  const [remaining, setRemaining] = useState()
  const [deckId, setDeckId] = useState<string | null>(null);
  const [previousCard, setPreviousCard] = useState(null); 
  const [currentCard, setCurrentCard] = useState(null);
  let counterValue = 0;
  let counterSuit = 0;

  useEffect(() => {
    const initDeck = async () => {
      const deck = await newDeck();
      setDeckId(deck.deck_id);
      setRemaining(deck.remaining);
    };

    initDeck();
  }, []); 

  const handleDraw = async () => {
    if (!deckId) return; 

    const result = await drawCard(deckId);
    const [newCard] = result.cards
    setRemaining(result.remaining);
    setPreviousCard(currentCard);
    setCurrentCard(newCard);
  
  }

  return (
 <main className="container d-flex-col col-md-3 mt-4 ">
 
    <Container direction="column">
        <Text>Cards remaining:{remaining}</Text>
        {/* <Text>Probability snap suit:{probability.suit}</Text>
        <Text>Probability snap value:{probability.value}</Text> */}

      </Container>
      <Container direction="row" >
      <Card>
        {previousCard && (
            <CardImage src={previousCard.image} alt={`${previousCard.value} of ${previousCard.suit}`} />
          ) }
        </Card>
       {/* // <p>{(previousCard !== null && currentCard !== null) && {previousCard.value === newCard.value ? "SNAP VALUE!" : previousCard.suit === newCard.suit ? "SNAP SUIT!": Null}}</p> */}

        <Text>
          {(previousCard && currentCard) && (
            previousCard.value === currentCard.value ?  (() => { counterValue += 1; return "SNAP VALUE!"; })() : 
            previousCard.suit === currentCard.suit ? (() => { counterSuit += 1; return "SNAP SUIT!"; })() : ""
          )}
        </Text>
        <Card > {currentCard && (
            <CardImage src={currentCard.image} alt={`${currentCard.value} of ${currentCard.suit}`} />
          )}</Card>
        
      </Container>
      <div>
     {remaining !== 0 ?  <Button onClick={handleDraw}>Draw</Button> :
     <> 
     {/* <Text>Value matches:{counterValue}</Text>
      <Text>Suit matches:{counterSuit}</Text> */}
      {/* <Button>Reset</Button> */}
      </>
     } 
     </div>
    
  
   </main>   
  )
}


