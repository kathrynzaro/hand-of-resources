const pool = require('../utils/pool');

class Cemetery {
  id;
  name;
  city;
  state;
  established;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.established = row.established;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from cemeteries'
    );
    return rows.map((row) => new Cemetery(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * from cemeteries
      WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Cemetery(rows[0]);
  }

  static async insert({ name, city, state, established }) {
    const { rows } = await pool.query(
      `INSERT INTO cemeteries (name, city, state, established)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [name, city, state, established]
    );
    return new Cemetery(rows[0]);
  }
}

module.exports = { Cemetery };
