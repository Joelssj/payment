import { Request, Response } from "express";
import { ProcessWebhookUseCase } from "../../application/ProcessWebhookUseCase";  // Caso de uso para procesar el webhook

export class WebhookController {
    private readonly processWebhookUseCase: ProcessWebhookUseCase;

    constructor(processWebhookUseCase: ProcessWebhookUseCase) {
        this.processWebhookUseCase = processWebhookUseCase;
    }

    async handleWebhook(req: Request, res: Response): Promise<Response> {
        try {
            const { type, data } = req.body;

            // Llama al caso de uso para procesar el evento del webhook
            await this.processWebhookUseCase.run(type, data.id);

            return res.status(200).send("Webhook recibido y procesado correctamente");
        } catch (error: any) {
            console.error("Error al procesar el webhook:", error);
            return res.status(500).send("Error al procesar el webhook");
        }
    }
}
