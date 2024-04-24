import { addUsedPile, drawCard, listUsedPile, newDeck, resetDeck } from '../app/api/apis';
const fetch = require('node-fetch');

describe('API tests', ()=>{
    beforeEach(() => {
        global.fetch = jest.fn(); 
      });
    
      afterEach(() => {
        global.fetch.mockClear(); 
      });

      it('should return new deck', async () => {
        const mockResponse = {
          success: true,
          deck_id: 'testdeck',
          remaining: 52,
        };
    
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });
    
        const response = await newDeck();
        expect(response.success).toBe(true);
        expect(response.deck_id).toBe('testdeck');
        expect(response.remaining).toBe(52);
    })


    it('should return status success', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });
  
      const response = await newDeck();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(response.success).toBe(true);
    })

    it('should draw a card from the deck', async () => {
      const mockResponse = {
        success: true,
        cards: [{ value: 'AS', suit: 'SPADES', image: 'someurl' }],
        remaining: 51,
      };
  
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const response = await drawCard('testdeck');
      expect(response.cards.length).toBe(1);
      expect(response.cards[0].value).toBe('AS');
      expect(response.cards[0].suit).toBe('SPADES');
      expect(response.remaining).toBe(51);
    });
    
})