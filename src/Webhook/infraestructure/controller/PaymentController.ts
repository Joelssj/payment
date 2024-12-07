import { Request, Response } from "express";
import { ProcessWebhookUseCase } from "../../application/ProcessWebhookUseCase";

export class PaymentController {
    constructor(private processWebhookUseCase: ProcessWebhookUseCase) {}

    async handleWebhook(req: Request, res: Response): Promise<Response> {
        console.log("Webhook recibido:", req.body);

        try {
            // Desestructurar `type` y `data` del cuerpo del webhook
            const { type, data } = req.body;

            // Validación inicial del cuerpo del webhook
            if (type !== 'payment' || !data || !data.id) {
                console.error("El webhook no contiene 'type' válido o falta 'data.id'.");
                return res.status(400).json({ error: "El cuerpo del webhook es inválido: falta 'data.id' o 'type' no es 'payment'" });
            }

            // Ejecutar el caso de uso para procesar el webhook con el tipo y el ID de pago
            await this.processWebhookUseCase.run(type, data.id);

            // Confirmación de que el webhook fue procesado exitosamente
            console.log("Webhook procesado exitosamente.");
            return res.status(200).send("Webhook recibido y procesado correctamente");
        } catch (error: any) {
            // Manejo de errores y respuesta con mensaje específico
            console.error("Error en el webhook:", error.message || error);
            return res.status(500).json({ error: "Error al procesar el webhook", details: error.message || error });
        }
    }
}


