/**
 * @typedef Operation
 * @type  {object}
 * @property {string} id - The operation's id.
 * @property {string} type - The operation's type.
 * @property {number} cost - The operation's cost.
 */

/**
 * @type {Array.<Operation>}
 */
const operations = [
  {
    id: "5c8bca5a-6395-11ee-8c99-0242ac120002",
    type: "ADDITION",
    cost: 8,
  },
  {
    id: "7f2bca5a-6395-11ee-8c99-0242ac120002",
    type: "SUBTRACTION",
    cost: 12,
  },
  {
    id: "b4492954-6395-11ee-8c99-0242ac120002",
    type: "MULTIPLICATION",
    cost: 16,
  },
  {
    id: "b8c34b0e-6395-11ee-8c99-0242ac120002",
    type: "DIVISION",
    cost: 20,
  },
  {
    id: "bc415866-6395-11ee-8c99-0242ac120002",
    type: "SQUARE_ROOT",
    cost: 24,
  },
  {
    id: "bf10ad9e-6395-11ee-8c99-0242ac120002",
    type: "RANDOM_STRING",
    cost: 28,
  },
];

export default operations;
