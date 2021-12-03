exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex("book").del();
  await knex("book").insert([
    {
      title: "Libro 1",
      author: "Autore 1",
      id: "1",
      total: 1,
      borrowed: 1,
    },
    {
      title: "Libro 2",
      author: "Autore 2",
      id: "2",
      total: 34,
      borrowed: 12,
    },
    {
      title: "Libro 3",
      author: "Autore 3",
      id: "3",
      total: 5,
      borrowed: 2,
    },
  ]);
};
