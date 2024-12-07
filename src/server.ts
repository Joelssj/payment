import { Signale } from "signale";
import express from "express";
import paymentRoutes from './MercadoPago/infrastructure/routes/PaymentRoutes';
import webhookRoutes from '../../Pagos/src/Webhook/infraestructure/routes/webhookRoutes';
import { donationRouter } from "./Donation/infraestructure/routes/DonationRoutes";
import 'dotenv/config';
import cors from 'cors';

const app = express();
const signale = new Signale();
app.use(express.json());
app.use(cors());
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/webhook', webhookRoutes);
app.use('/api/v1/donation', donationRouter);


const port = 3002;
const host = '0.0.0.0';

app.listen(port, host, () => {
  signale.success("Server online in port 3010");
});


