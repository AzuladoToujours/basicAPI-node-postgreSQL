const dbQuery = require('../config');

const getUsers = async (req, res) => {
  try {
    const response = await dbQuery.query('SELECT * FROM users');
    if (!response) {
      return res.status(400).end();
    }
    res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const response = await dbQuery.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [name, email]
    );

    if (!response) {
      return res.status(400).end();
    }

    res.status(200).json({
      message: 'User added successfuly',
      body: {
        user: { name, email }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await dbQuery.query('SELECT * FROM users WHERE id = $1', [
      id
    ]);

    if (!response) {
      return res.status(400).end();
    }

    res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const response = await dbQuery.query(
      'UPDATE users SET name = $1, email= $2 WHERE id = $3',
      [name, email, id]
    );

    res.status(400).json({ user: { id, name, email } });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await dbQuery.query('DELETE FROM users WHERE id = $1', [
      id
    ]);

    res.status(200).json({ message: 'User deleted succesfuly' });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
