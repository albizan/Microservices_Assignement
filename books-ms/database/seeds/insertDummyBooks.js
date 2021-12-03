exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex("book").del();
  await knex("book").insert([
    {
      title: "Libro 1",
      author: "Autore 1",
      id: "1",
    },
    {
      title: "Libro 2",
      author: "Autore 2",
      id: "2",
    },
    {
      title: "Libro 3",
      author: "Autore 3",
      id: "3",
    },
  ]);
};
