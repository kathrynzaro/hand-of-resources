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
  it('#GET /shows/:id should return a single show', async () => {
    const res = await request(app).get('/shows/6');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '6',
      title: 'Stranger Things',
      streaming: 'Netflix',
      favorite_episode: 'The Mall Rats',
      year: 2016,
    });
  });
  it('#POST /shows should create a new show', async () => {
    const res = await request(app).post('/shows').send({
      title: 'The Bear',
      streaming: 'Hulu',
      favorite_episode: 'Brigade',
      year: 2022,
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '7',
      title: 'The Bear',
      streaming: 'Hulu',
      favorite_episode: 'Brigade',
      year: 2022,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
