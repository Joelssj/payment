import { Payment } from './Payment';

export interface PaymentRepository {
  savePayment(payment: Payment): Promise<void>; 
  getPaymentById(paymentId: string): Promise<Payment>; 
  updatePaymentStatus(paymentId: string, status: string): Promise<void>;  
  getPaymentStatus(paymentId: string): Promise<Payment>; 
}
