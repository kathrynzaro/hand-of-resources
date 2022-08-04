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
    const canard = res.body.find((restaurant) => restaurant.id === '6');
    expect(canard).toHaveProperty('name', 'Canard');
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
  it('#POST /restaurants should create a new restaurant', async () => {
    const res = await request(app).post('/restaurants').send({
      name: 'La Moule',
      location: 'SE Clinton St, Portland',
      fav_order: 'Moules Mariniere',
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '7',
      name: 'La Moule',
      location: 'SE Clinton St, Portland',
      fav_order: 'Moules Mariniere',
    });
  });
  it('#PUT /restaurants/:id should update an existing restaurant', async () => {
    const res = await request(app).put('/restaurants/6').send({
      fav_order: 'Paris Brest',
    });
    expect(res.status).toBe(200);
    expect(res.body.fav_order).toBe('Paris Brest');
  });
  it('#DELETE /restaurants/:id should delete a restaurant', async () => {
    const res = await request(app).delete('/restaurants/5');
    expect(res.status).toBe(200);
    const restaurantRes = await request(app).get('/restaurants/5');
    expect(restaurantRes.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
