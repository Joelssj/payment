import { MercadoPagoClient } from '../../MercadoPago/infrastructure/adapters/MercadoPagoClient';
import { DonationRepository } from '../domain/DonationRepository';



export class CreateDonationUseCase {
    constructor(
        private mercadoPagoClient: MercadoPagoClient,
        private donationRepository: DonationRepository
    ) {}

    async execute(donorEmail: string, recipientUserId: string, amount: number) {
        // Crear la preferencia de pago en MercadoPago usando `createPayment`
        const paymentData = await this.mercadoPagoClient.createPayment(donorEmail, amount);

        // Guardar la donación en el repositorio con estado "pending"
        const donation = await this.donationRepository.create({
            donorEmail,
            recipientUserId,
            amount,
            createdAt: new Date(),
            status: 'pending',
            mercadoPagoPreferenceId: paymentData.id
        });

        // Retorna la donación y el enlace para el pago
        return { donation, preferenceUrl: paymentData.init_point };
    }
}
