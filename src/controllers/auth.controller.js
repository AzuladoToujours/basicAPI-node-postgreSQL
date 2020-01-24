const dbQuery = require('../config');
const Helper = require('../helpers/auth.helper');
const moment = require('moment');

exports.SignUp = async (req, res) => {
  try {
    const userExist = await dbQuery.query(
      'SELECT * FROM users WHERE email = $1',
      [req.body.email]
    );

    if (userExist.rows[0]) {
      return res.status(403).json({
        error: 'Email is already signed up! '
      });
    }
  } catch (e) {
    console.log(e);
  }

  const hashed_password = Helper.hashPassword(req.body.password);
  const created_date = moment(new Date());

  const createUserQuery =
    'INSERT INTO users( name, email, hashed_password, created_date ) VALUES ($1, $2, $3, $4) returning *';
  const values = [req.body.name, req.body.email, hashed_password, created_date];

  try {
    const response = await dbQuery.query(createUserQuery, values);

    const name = req.body.name;
    const email = req.body.email;

    res.status(200).json({
      message: 'User signed up succesfuly',
      user: {
        name,
        email,
        hashed_password,
        created_date
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

exports.SignIn = async (req, res) => {
  try {
    const response = await dbQuery.query(
      'SELECT * FROM users WHERE email = $1',
      [req.body.email]
    );

    if (!response.rows[0]) {
      return res.status(403).json({
        error: 'Email is not signed up '
      });
    }

    if (
      !Helper.comparePassword(
        response.rows[0].hashed_password,
        req.body.password
      )
    ) {
      return res.status(400).send({ message: 'Incorrect Password ' });
    }

    const token = Helper.generateToken(response.rows[0].id);
    res.cookie('t', token, { expire: new Date() + 999 });
    const id = response.rows[0].id;
    const name = response.rows[0].name;
    const email = response.rows[0].email;
    return res.status(200).send({ token, user: { id, name, email } });
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
};
