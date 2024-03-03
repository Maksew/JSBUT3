exports.up = function(knex) {
    return knex.schema.createTable('favorites', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('user').onDelete('CASCADE');
        table.integer('movie_id').unsigned().references('id').inTable('movies').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('favorites');
};
