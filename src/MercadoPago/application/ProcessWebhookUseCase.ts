import { PaymentRepository } from "../domain/PaymentRepository"; 
import { EmailService } from "../infrastructure/services/EmailService";  
export class ProcessWebhookUseCase {
    private readonly paymentRepository: PaymentRepository;
    private readonly emailService: EmailService;

    constructor(paymentRepository: PaymentRepository, emailService: EmailService) {
        this.paymentRepository = paymentRepository;
        this.emailService = emailService;
    }

    async run(eventType: string, paymentId: string): Promise<void> {
        try {
            if (eventType === "payment") {
                const payment = await this.paymentRepository.getPaymentById(paymentId);
    
                if (payment && payment.status !== "approved") {
                    await this.paymentRepository.updatePaymentStatus(paymentId, "approved");
    
                    await this.emailService.sendPaymentConfirmationEmail(payment.payerEmail);
                }
            }
        } catch (error) {
            console.error("Error procesando el webhook:", error);
            throw new Error("Error procesando el webhook");
        }
    }
    
}
