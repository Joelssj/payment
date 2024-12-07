import express from 'express';
import { PaymentController } from '../controller/PaymentController';
import { ProcessWebhookUseCase } from '../../application/ProcessWebhookUseCase';
import { MySQLDonationRepository } from '../../../Donation/infraestructure/api-rest/adapter/MySQLDonationRepository';
import { MySQLWebhookRepository } from '../adapter/MySQLWebhookRepository';
import { MercadoPagoClient } from '../../../MercadoPago/infrastructure/adapters/MercadoPagoClient';

const router = express.Router();

// Cambiado a MySQLDonationRepository
const donationRepository = new MySQLDonationRepository();
const webhookRepository = new MySQLWebhookRepository();
const mercadoPagoClient = new MercadoPagoClient();

// Usa `donationRepository` en `ProcessWebhookUseCase`
const processWebhookUseCase = new ProcessWebhookUseCase(donationRepository, webhookRepository, mercadoPagoClient);
const paymentController = new PaymentController(processWebhookUseCase);

router.post('/mercadopago', (req, res) => paymentController.handleWebhook(req, res));

export default router;


