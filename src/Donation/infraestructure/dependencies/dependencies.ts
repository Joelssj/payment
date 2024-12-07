import { MercadoPagoClient } from '../../../MercadoPago/infrastructure/adapters/MercadoPagoClient';
import { DonationRepository } from '../../domain/DonationRepository';
import { MySQLDonationRepository } from '../api-rest/adapter/MySQLDonationRepository';
import { CreateDonationUseCase } from '../../application/CreateDonationUseCase';
import { DonationController } from '../api-rest/controller/DonationController';


const mercadoPagoClient = new MercadoPagoClient(); // Crear una instancia de MercadoPagoClient
const donationRepository = new MySQLDonationRepository();

const createDonationUseCase = new CreateDonationUseCase(mercadoPagoClient, donationRepository);
export const donationController = new DonationController(createDonationUseCase);