import { db } from "../DB/DbConnection.js";

export const getExpensesByUserId = async (request, response) => {
  try {
    const id = 1;
    const { rows } = await db.query(`select 
	E.id AS id, 
	E.amount AS amount, 
	E.description AS description, 
	C.description AS category_desc, 
	E.created_on AS created_on  
from expenses E 
JOIN categories C 
ON C.id = E.category_id 
`);
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};

export const getExpenseSummaryById = async (request, response) => {
  try {
    const id = 1;
    const { rows } = await db.query(`SELECT 
	SUM(amount) AS total_amt,
	AVG(amount) AS avg_amt,
	MAX(amount) AS max_amt,
	COUNT(amount) AS total_transactions
FROM expenses`);
    response.status(200).send({ data: rows[0] });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};

export const getCategoryWiseExpense = async (request, response) => {
  try {
    const id = 1;
    const { rows } = await db.query(`SELECT * from get_expenses_by_category();`);
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};

export const getExpensesByMonth = async (request, response) => {
  try {
    const id = 1;
    const { rows } = await db.query(`SELECT * FROM get_expenses_by_month();`);
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};

export const addExpenseByUserId = async (request, response) => {
  try {
    const { amount, category_id, user_id, description } = request.body;
    const { rows } = await db.query(
      `CALL expense_crud(${amount}, ${category_id}, ${user_id}, '${description}', ${1});`
    );
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};

export const deleteExpenseById = async (request, response) => {
  try {
    const { id } = request.params;
    const { rows } = await db.query(
      `CALL expense_crud(${null}, ${null}, ${null}, '${null}', ${3}, ${id});`
    );
    response.status(200).send({ data: rows });
  } catch (error) {
    console.log({ error });
    response.status(422).send({
      message: "Something went wrong ! Try Again.",
      innerException: error,
    });
  }
};
