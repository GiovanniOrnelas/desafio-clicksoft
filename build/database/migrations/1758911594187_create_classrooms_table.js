import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'classrooms';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('number').notNullable();
            table.integer('capacity').notNullable();
            table.integer('teacher_id').unsigned().references('id').inTable('users').notNullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
            table.boolean('active').defaultTo(true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1758911594187_create_classrooms_table.js.map