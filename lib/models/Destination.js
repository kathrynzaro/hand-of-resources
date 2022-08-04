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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * from destinations
      WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Destination(rows[0]);
  }

  static async insert({ name, type, city, state }) {
    const { rows } = await pool.query(
      `INSERT INTO destinations (name, type, city, state)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [name, type, city, state]
    );
    return new Destination(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const destination = await Destination.getById(id);
    if (!destination) return null;
    const updatedData = { ...destination, ...newAttributes };
    const { rows } = await pool.query(
      `UPDATE destinations
      SET name = $2, type = $3, city = $4, state = $5
      WHERE id = $1
      RETURNING *`,
      [
        id,
        updatedData.name,
        updatedData.type,
        updatedData.city,
        updatedData.state,
      ]
    );
    return new Destination(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE from destinations
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Destination(rows[0]);
  }
}

module.exports = { Destination };
