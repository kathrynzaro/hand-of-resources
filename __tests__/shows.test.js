const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /shows should return a list of shows', async () => {
    const res = await request(app).get('/shows');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(6);
    const newGirl = res.body.find((show) => show.id === '2');
    expect(newGirl).toHaveProperty('year', 2011);
  });
  afterAll(() => {
    pool.end();
  });
});
