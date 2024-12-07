export class Donation {
    constructor(
        public id: string,
        public amount: number,
        public donorEmail: string,
        public recipientUserId: string,
        public createdAt: Date,
        public status: 'pending' | 'completed' | 'failed',
        public mercadoPagoPreferenceId: string,
        public mercadoPagoPaymentId?: string // Agregar este campo como opcional
    ) {}
}
