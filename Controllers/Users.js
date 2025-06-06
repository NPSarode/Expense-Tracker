import { db } from "../DB/DbConnection.js";

export const getUsers = async (request, response) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};

export const addUser = async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const { rows } = await db.query(`CALL user_crud('${username}', '${email}', '${password}', TRUE, 1);`);
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};

export const updateUser = async (request, response) => {
  try {
    const { id, username, email, password } = request.body;
    const { rows } = await db.query(`CALL user_crud('${username}', '${email}', '${password}', TRUE, 2, ${id});`);
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};

export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { rows } = await db.query(`CALL user_crud(${null}, ${null}, ${null}, ${null}, 3, ${id});`);
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};
