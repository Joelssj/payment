import { Donation } from '../../../domain/Donation';
import { DonationRepository } from '../../../domain/DonationRepository';
import { query } from '../../../../database/mysql/mysql';

export class MySQLDonationRepository implements DonationRepository {

  // Método para guardar una nueva donación en la base de datos
  async create(donation: Omit<Donation, 'id'>): Promise<Donation> {
    const sql = `INSERT INTO donations (amount, donorEmail, recipientUserId, createdAt, status, mercadoPagoPreferenceId)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
      donation.amount,
      donation.donorEmail,
      donation.recipientUserId,
      donation.createdAt,
      donation.status,
      donation.mercadoPagoPreferenceId
    ];

    // Ejecutar la consulta e insertar la donación
    const result: any = await query(sql, params);
    const donationId = result.insertId;

    // Retornar la donación con el ID asignado
    return new Donation(
      donationId,
      donation.amount,
      donation.donorEmail,
      donation.recipientUserId,
      donation.createdAt,
      donation.status,
      donation.mercadoPagoPreferenceId
    );
  }

  // Método para actualizar el estado y el `mercadoPagoPaymentId` de una donación
  async updateStatusAndPaymentId(id: string, status: 'pending' | 'completed' | 'failed', mercadoPagoPaymentId: string): Promise<void> {
    const sql = "UPDATE donations SET status = ?, mercadoPagoPaymentId = ? WHERE id = ?";
    const params = [status, mercadoPagoPaymentId, id];
    await query(sql, params);
  }

  // Método para buscar una donación por su ID de preferencia de MercadoPago
  async findByMercadoPagoId(mercadoPagoId: string): Promise<Donation | null> {
    const sql = "SELECT * FROM donations WHERE mercadoPagoPreferenceId = ?";
    const params = [mercadoPagoId];
    const [rows]: any = await query(sql, params);

    if (rows.length === 0) {
      return null;
    }

    const donation = rows[0];
    return new Donation(
      donation.id,
      donation.amount,
      donation.donorEmail,
      donation.recipientUserId,
      new Date(donation.createdAt),
      donation.status,
      donation.mercadoPagoPreferenceId,
      donation.mercadoPagoPaymentId
    );
  }

  // Método para buscar una donación por `mercadoPagoPaymentId` (ID de pago real)
  async findByMercadoPagoPaymentId(mercadoPagoPaymentId: string): Promise<Donation | null> {
    const sql = "SELECT * FROM donations WHERE mercadoPagoPaymentId = ?";
    const params = [mercadoPagoPaymentId];
    const [rows]: any = await query(sql, params);

    if (rows.length === 0) {
      return null;
    }

    const donation = rows[0];
    return new Donation(
      donation.id,
      donation.amount,
      donation.donorEmail,
      donation.recipientUserId,
      new Date(donation.createdAt),
      donation.status,
      donation.mercadoPagoPreferenceId,
      donation.mercadoPagoPaymentId // Asegúrate de que Donation tiene este campo
    );
  }
}
