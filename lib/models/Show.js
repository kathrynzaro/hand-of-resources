const pool = require('../utils/pool');

class Show {
  id;
  title;
  streaming;
  favorite_episode;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.streaming = row.streaming;
    this.favorite_episode = row.favorite_episode;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from shows'
    );
    return rows.map((row) => new Show(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * from shows
      WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Show(rows[0]);
  }

  static async insert({ title, streaming, favorite_episode, year }) {
    const { rows } = await pool.query(
      `INSERT INTO shows (title, streaming, favorite_episode, year)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [title, streaming, favorite_episode, year]
    );
    return new Show(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const show = await Show.getById(id);
    if (!show) return null;
    const updatedData = { ...show, ...newAttributes };
    const { rows } = await pool.query(
      `UPDATE shows
      SET title = $2, streaming = $3, favorite_episode = $4, year = $5
      WHERE id = $1
      RETURNING *`,
      [
        id,
        updatedData.title,
        updatedData.streaming,
        updatedData.favorite_episode,
        updatedData.year,
      ]
    );
    return new Show(rows[0]);
  }
}

module.exports = { Show };
