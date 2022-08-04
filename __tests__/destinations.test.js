const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /destinations should return a list of destinations', async () => {
    const res = await request(app).get('/destinations');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Palace Playland',
        type: 'Amusement Park',
        city: 'Old Orchard Beach',
        state: 'Maine',
      },
      {
        id: '2',
        name: 'Vicki\'s Diner',
        type: 'Restaurant',
        city: 'Westfield',
        state: 'New Jersey',
      },
      {
        id: '3',
        name: 'Revolution Hotel',
        type: 'Hotel',
        city: 'Boston',
        state: 'Massachusetts',
      },
      {
        id: '4',
        name: 'Railroad Park Resort',
        type: 'Hotel',
        city: 'Dunsmuir',
        state: 'California',
      },
      {
        id: '5',
        name: 'Camp 18',
        type: 'Restaurant',
        city: 'Elsie',
        state: 'Oregon',
      },
      {
        id: '6',
        name: 'Washington Park',
        type: 'Park',
        city: 'Portland',
        state: 'Oregon',
      },
    ]);
  });
  afterAll(() => {
    pool.end();
  });
});
