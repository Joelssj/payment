import { Webhook } from '../../domain/Webhook';
import { WebhookRepository } from '../../domain/WebhookRepository';
import { query } from '../../../database/mysql/mysql';

export class MySQLWebhookRepository implements WebhookRepository {
    
    // Método para guardar un nuevo webhook en la base de datos
    async saveWebhook(webhook: Webhook): Promise<void> {
        const sql = "INSERT INTO webhooks (id, type, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
        const params = [
            webhook.id,
            webhook.type,
            JSON.stringify(webhook.data), // Convertir `data` a JSON antes de guardar
            webhook.createdAt,
            webhook.updatedAt,
        ];
        try {
            await query(sql, params);
            console.log(`Webhook with id ${webhook.id} saved successfully.`);
        } catch (error) {
            console.error(`Error saving webhook with id ${webhook.id}:`, error);
            throw new Error("Error saving webhook to the database.");
        }
    }

    // Método para obtener un webhook por su ID
    async getWebhookById(id: string): Promise<Webhook> {
        const sql = "SELECT * FROM webhooks WHERE id = ?";
        try {
            const [rows]: any = await query(sql, [id]);
            if (rows.length === 0) {
                throw new Error(`Webhook with id ${id} not found`);
            }

            const webhook = rows[0];
            return new Webhook(
                webhook.id,
                webhook.type,
                JSON.parse(webhook.data), // Convertir `data` de JSON a objeto al recuperar
                new Date(webhook.created_at),
                new Date(webhook.updated_at)
            );
        } catch (error) {
            console.error(`Error fetching webhook with id ${id}:`, error);
            throw error;
        }
    }

    // Método para obtener todos los webhooks
    async getAllWebhooks(): Promise<Webhook[]> {
        const sql = "SELECT * FROM webhooks";
        try {
            const [rows]: any = await query(sql, []);
            return rows.map((row: any) => new Webhook(
                row.id,
                row.type,
                JSON.parse(row.data), // Convertir `data` de JSON a objeto al recuperar
                new Date(row.created_at),
                new Date(row.updated_at)
            ));
        } catch (error) {
            console.error("Error fetching all webhooks:", error);
            throw new Error("Error fetching all webhooks from the database.");
        }
    }
}
