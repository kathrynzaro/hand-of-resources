const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /cemeteries should return a list of cemeteries', async() => {
    const res = await request(app).get('/cemeteries');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(6);
    const rosehill = res.body.find((cemetery) => cemetery.id === '3');
    expect(rosehill).toHaveProperty('name', 'Rosehill Cemetery');
  });
  it('#GET /cemeteries/:id should return a single cemetery', async () => {
    const res = await request(app).get('/cemeteries/6');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '6',
      name: 'Hollywood Memorial Park and Cemetery',
      city: 'Union',
      state: 'New Jersey',
      established: 1909,
    });
  });
  it('#POST /cemeteries should create a new cemetery', async () => {
    const res = await request(app).post('/cemeteries').send({
      name: 'Pere Lachaise Cemetery',
      city: 'Paris',
      state: 'n/a',
      established: 1804,
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '7',
      name: 'Pere Lachaise Cemetery',
      city: 'Paris',
      state: 'n/a',
      established: 1804,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
