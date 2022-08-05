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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * from restaurants
      WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Restaurant(rows[0]);
  }
  
  static async insert({ name, location, fav_order }) {
    const { rows } = await pool.query(
      `INSERT INTO restaurants (name, location, fav_order)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, location, fav_order]
    );
    return new Restaurant(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const restaurant = await Restaurant.getById(id);
    if (!restaurant) return null;
    const updatedData = { ...restaurant, ...newAttributes };
    const { rows } = await pool.query(
      `UPDATE restaurants
      SET name = $2, location = $3, fav_order = $4
      WHERE id = $1
      RETURNING *`,
      [
        id,
        updatedData.name,
        updatedData.location,
        updatedData.fav_order,
      ]
    );
    return new Restaurant(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE from restaurants
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Restaurant(rows[0]);
  }
}

module.exports = { Restaurant };
