const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /restaurants should return a list of restaurants', async () => {
    const res = await request(app).get('/restaurants');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(6);
  });
  it('#GET /restaurants/:id should return a single restaurant', async () => {
    const res = await request(app).get('/restaurants/4');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '4',
      name: 'Creepy\'s',
      location: 'SE Morrison St, Portland',
      fav_order: 'Double Smashie',
    });
  });
});
