import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlotIndexes implements MigrationInterface {
  name = 'AddSlotIndexes';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Basic indexes for common queries
    await queryRunner.query(`
        CREATE INDEX idx_slots_date ON slots (start_date);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_slots_booked ON slots (booked);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_slots_sales_manager ON slots (sales_manager_id);
    `);

    // Composite index for sales_manager lookups
    await queryRunner.query(`
        CREATE INDEX idx_slots_manager_date ON slots (sales_manager_id, start_date);
    `);

    // Index for sales_managers table
    await queryRunner.query(`
        CREATE INDEX idx_sales_managers_products ON sales_managers USING GIN (products);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_sales_managers_languages ON sales_managers USING GIN (languages);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_sales_managers_ratings ON sales_managers USING GIN (customer_ratings);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX idx_slots_date`);
    await queryRunner.query(`DROP INDEX idx_slots_booked`);
    await queryRunner.query(`DROP INDEX idx_slots_sales_manager`);
    await queryRunner.query(`DROP INDEX idx_slots_manager_date`);
    await queryRunner.query(`DROP INDEX idx_sales_managers_products`);
    await queryRunner.query(`DROP INDEX idx_sales_managers_languages`);
    await queryRunner.query(`DROP INDEX idx_sales_managers_ratings`);
  }
}
