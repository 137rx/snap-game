const api_url = "https://deckofcardsapi.com/api/deck"

export const addUsedPile = async (deckId: string, cardCode: string) => {
    const response = await fetch(`${api_url}/${deckId}/pile/used/add/?cards=${cardCode}`);
  
    if (!response.ok) {
      throw new Error(`Failed to add to used pile: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };

  export const drawCard = async (deckId: string) => {
    const response = await fetch(`${api_url}/${deckId}/draw/?count=1`);
  
    if (!response.ok) {
      throw new Error(`Failed to draw cards: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };

  export const listUsedPile = async (deckId: string) => {
    const response = await fetch(`${api_url}${deckId}/pile/used/list`);
  
    if (!response.ok) {
      throw new Error(`Failed to list used pile: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };

  export const newDeck = async () => {
    const response = await fetch(`${api_url}/new/shuffle/?deck_count=1`);
  
    if (!response.ok) {
      throw new Error(`Failed to draw new deck: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };

  export const resetDeck = async (deckId: string) => {
    const response = await fetch(`${api_url}/${deckId}/return/`);
  
    if (!response.ok) {
      throw new Error(`Failed to reset deck: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  }; 