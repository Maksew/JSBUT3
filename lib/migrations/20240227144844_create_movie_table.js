exports.up = function(knex) {
    return knex.schema.createTable('movies', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.date('release_date').notNullable();
        table.string('director').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('movies');
};
