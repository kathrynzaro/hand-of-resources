const pool = require('../utils/pool');

class Destination {
  id;
  name;
  type;
  city;
  state;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.city = row.city;
    this.state = row.state;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * from destinations
    `);
    return rows.map((row) => new Destination(row));
  }
}

module.exports = { Destination };
