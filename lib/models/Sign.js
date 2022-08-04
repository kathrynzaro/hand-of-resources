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
}

module.exports = { Sign };
