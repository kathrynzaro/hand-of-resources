const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /signs should return a list of signs', async () => {
    const res = await request(app).get('/signs');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(12);
    const cancer = res.body.find((sign) => sign.id === '4');
    expect(cancer).toHaveProperty('name', 'Cancer');
  });
  it('#GET /signs/:id should return a single sign', async () => {
    const res = await request(app).get('/signs/4');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '4',
      name: 'Cancer',
      symbol: 'The Crab',
      element: 'Water',
      ruling_planet: 'Moon',
      modality: 'Cardinal',
      dates: 'June 21 to July 22',
    });
  });
  it('#POST /signs should create a new sign', async () => {
    const res = await request(app).post('/signs').send({
      name: 'Nope',
      symbol: 'The Nope',
      element: 'Nothing',
      ruling_planet: 'Pluto',
      modality: 'Cardinal',
      dates: 'Forever',
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '13',
      name: 'Nope',
      symbol: 'The Nope',
      element: 'Nothing',
      ruling_planet: 'Pluto',
      modality: 'Cardinal',
      dates: 'Forever',
    });
  });
  it('#PUT /signs/:id should update an existing sign', async () => {
    const res = await request(app).put('/signs/4').send({
      dates: 'it\'s always cancer season here',
    });
    expect(res.status).toBe(200);
    expect(res.body.dates).toBe('it\'s always cancer season here');
  });
  afterAll(() => {
    pool.end();
  });
});
