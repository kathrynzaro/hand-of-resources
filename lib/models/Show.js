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
}

module.exports = { Show };
