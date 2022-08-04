const pool = require('../utils/pool');

class Restaurant {
  id;
  name;
  location;
  fav_order;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.location = row.location;
    this.fav_order = row.fav_order;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from restaurants'
    );
    return rows.map((row) => new Restaurant(row));
  }
}

module.exports = { Restaurant };
