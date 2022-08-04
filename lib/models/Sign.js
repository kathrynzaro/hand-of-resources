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

  static async insert({ name, symbol, element, ruling_planet, modality, dates }) {
    const { rows } = await pool.query(
      `INSERT INTO signs (name, symbol, element, ruling_planet, modality, dates)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [name, symbol, element, ruling_planet, modality, dates]
    );
    return new Sign(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const sign = await Sign.getById(id);
    if (!sign) return null;
    const updatedData = { ...sign, ...newAttributes };
    const { rows } = await pool.query(
      `UPDATE signs
      SET name = $2, symbol = $3, element = $4, ruling_planet = $5, modality = $6, dates = $7
      WHERE id = $1
      RETURNING *`,
      [
        id,
        updatedData.name,
        updatedData.symbol,
        updatedData.element,
        updatedData.ruling_planet,
        updatedData.modality,
        updatedData.dates,
      ]
    );
    return new Sign(rows[0]);
  }
}

module.exports = { Sign };
