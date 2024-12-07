import { Router } from 'express';
import { donationController } from '../dependencies/dependencies';


const donationRouter = Router();

donationRouter.post('/donar', (req, res) => donationController.createDonation(req, res));

export { donationRouter };
