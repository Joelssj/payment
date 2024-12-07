import express from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { CreatePaymentUseCase } from '../../application/CreatePaymentUseCase';
import { MySQLPaymentRepository } from '../adapters/MySQLPaymentRepository';
import { MercadoPagoClient } from '../adapters/MercadoPagoClient';
import { ProcessWebhookUseCase } from '../../application/ProcessWebhookUseCase';
import { EmailService } from '../services/EmailService';

// Crear las instancias necesarias para inyectar en el controlador
const paymentRepository = new MySQLPaymentRepository();
const mercadoPagoClient = new MercadoPagoClient();
const emailService = new EmailService();
const createPaymentUseCase = new CreatePaymentUseCase(mercadoPagoClient, paymentRepository, emailService);
const processWebhookUseCase = new ProcessWebhookUseCase(paymentRepository, emailService);

// Instanciar el controlador
const paymentController = new PaymentController(createPaymentUseCase, paymentRepository, processWebhookUseCase);

const router = express.Router();

// Ruta para crear un pago
router.post('/create', (req, res) => paymentController.createPayment(req, res));

// Ruta para obtener el estado de un pago
router.get('/status/:id', (req, res) => paymentController.getPaymentStatus(req, res));

// Ruta para el webhook de Mercado Pago
router.post('/webhook/mercadopago', (req, res) => paymentController.handleWebhook(req, res));

export default router;
