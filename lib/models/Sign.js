const pool = require('../utils/pool');

class Sign {
  id;
  name;
  symbol;
  element;
  ruling_planet;
  modality;
  dates;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.symbol = row.symbol;
    this.element = row.element;
    this.ruling_planet = row.ruling_planet;
    this.modality = row.modality;
    this.dates = row.dates;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from signs'
    );
    return rows.map((row) => new Sign(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * from signs
      WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Sign(rows[0]);
  }
}

module.exports = { Sign };
