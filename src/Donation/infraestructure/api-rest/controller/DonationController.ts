import { Request, Response } from 'express';
import { CreateDonationUseCase } from '../../../application/CreateDonationUseCase';


export class DonationController {
    constructor(private createDonationUseCase: CreateDonationUseCase) {}

    async createDonation(req: Request, res: Response): Promise<Response> {
        const { donorEmail, recipientUserId, amount } = req.body;
        try {
            const { donation, preferenceUrl } = await this.createDonationUseCase.execute(donorEmail, recipientUserId, amount);
            return res.status(201).json({ donation, preferenceUrl });
        } catch (error) {
            console.error("Error in createDonation:", error); // Registra el error en la consola para depuración
            return res.status(500).json({ error: error || 'An unknown error occurred' });
        }
    }
}
