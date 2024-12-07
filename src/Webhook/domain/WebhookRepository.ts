// domain/WebhookRepository.ts
import { Webhook } from './Webhook';

export interface WebhookRepository {
    saveWebhook(webhook: Webhook): Promise<void>;
    getWebhookById(id: string): Promise<Webhook>;
    getAllWebhooks(): Promise<Webhook[]>;
}
