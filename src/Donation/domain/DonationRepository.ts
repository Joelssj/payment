import { Donation } from './Donation';

export interface DonationRepository {
    create(data: Omit<Donation, 'id'>): Promise<Donation>;
    updateStatusAndPaymentId(id: string, status: 'pending' | 'completed' | 'failed', mercadoPagoPaymentId: string): Promise<void>;
    findByMercadoPagoId(mercadoPagoId: string): Promise<Donation | null>;
    findByMercadoPagoPaymentId(mercadoPagoPaymentId: string): Promise<Donation | null>; // Nuevo método
}
