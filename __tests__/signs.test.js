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
  afterAll(() => {
    pool.end();
  });
});
