import { Payment } from '../../domain/Payment';
import { PaymentRepository } from '../../domain/PaymentRepository';
import { query } from '../../../database/mysql/mysql';  // Conexión a la base de datos

export class MySQLPaymentRepository implements PaymentRepository {

  // Método para guardar un nuevo pago en la base de datos
  async savePayment(payment: Payment): Promise<void> {
    const sql = "INSERT INTO payments (id, items, payerEmail, externalReference, status) VALUES (?, ?, ?, ?, ?)";
    const params = [
      payment.id,
      JSON.stringify(payment.items),  // Convertir items a JSON
      payment.payerEmail,
      payment.externalReference,
      payment.status  // Asegúrate de que payment.status tenga un valor válido
    ];
    await query(sql, params);
}


  // Método para obtener un pago por su ID
  async getPaymentById(paymentId: string): Promise<Payment> {
    const sql = "SELECT * FROM payments WHERE id = ?";
    const params = [paymentId];
    const [rows]: any = await query(sql, params);

    if (rows.length === 0) {
      throw new Error(`Payment with id ${paymentId} not found`);
    }

    const payment = rows[0];
    return new Payment(
      payment.id,
      JSON.parse(payment.items),  // Convertir items de JSON a arreglo
      payment.payerEmail,
      payment.externalReference,
      payment.status
    );
  }

  // Método para actualizar el estado de un pago
  async updatePaymentStatus(paymentId: string, status: string): Promise<void> {
    const sql = "UPDATE payments SET status = ? WHERE id = ?";
    const params = [status, paymentId];
    await query(sql, params);
  }

  // Método para obtener el estado de un pago por su ID
  async getPaymentStatus(paymentId: string): Promise<Payment> {
    const sql = "SELECT * FROM payments WHERE id = ?";
    const params = [paymentId];
    const [rows]: any = await query(sql, params);

    if (rows.length === 0) {
      throw new Error(`Payment with id ${paymentId} not found`);
      
    }

    const payment = rows[0];
    return new Payment(
      payment.id,
      JSON.parse(payment.items),  // Convertir items de JSON a arreglo
      payment.payerEmail,
      payment.externalReference,
      payment.status
    );
  }
}

