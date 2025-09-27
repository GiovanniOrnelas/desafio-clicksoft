import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'administrators';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .primary()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1758832084851_create_administrators_table.js.map