import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'students';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('registration', 255).notNullable();
            table.datetime('birthdate').notNullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1758763477408_create_students_table.js.map