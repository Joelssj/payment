import { Request, Response } from "express";
import { CreatePaymentUseCase } from "../../application/CreatePaymentUseCase";
import { PaymentRepository } from "../../domain/PaymentRepository";
import { ProcessWebhookUseCase } from "../../application/ProcessWebhookUseCase";

export class PaymentController {
    private readonly createPaymentUseCase: CreatePaymentUseCase;
    private readonly paymentRepository: PaymentRepository;
    private readonly processWebhookUseCase: ProcessWebhookUseCase;

    constructor(
        createPaymentUseCase: CreatePaymentUseCase,
        paymentRepository: PaymentRepository,
        processWebhookUseCase: ProcessWebhookUseCase
    ) {
        this.createPaymentUseCase = createPaymentUseCase;
        this.paymentRepository = paymentRepository;
        this.processWebhookUseCase = processWebhookUseCase;
    }

    // Método para crear un pago
    async createPayment(req: Request, res: Response): Promise<Response> {
        try {
            const { userUuid, correo, amount } = req.body;

            // Verificar que amount esté presente
            if (amount === undefined || amount === null) {
                return res.status(400).json({ error: "El monto (amount) es necesario para crear el pago." });
            }

            // Iniciar el proceso de pago y generar el link de Mercado Pago
            const paymentLink = await this.createPaymentUseCase.run(userUuid, correo, amount);

            return res.status(201).json({
                message: "Pago iniciado con éxito, sigue el link para completar el pago",
                paymentLink
            });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Método para obtener el estado del pago
    async getPaymentStatus(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            // Obtener el estado del pago usando el repositorio directamente
            const paymentStatus = await this.paymentRepository.getPaymentStatus(id);

            return res.status(200).json(paymentStatus);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    // Método para manejar el webhook de Mercado Pago
    async handleWebhook(req: Request, res: Response): Promise<Response> {
        try {
            const { type, data } = req.body;

            // Verificar que `data` y `data.id` están presentes antes de proceder
            if (!data || !data.id) {
                return res.status(400).json({ error: "El cuerpo del webhook no contiene la propiedad 'data' o 'id'" });
            }

            // Procesar el evento del webhook usando el caso de uso
            await this.processWebhookUseCase.run(type, data.id);

            return res.status(200).send("Webhook recibido y procesado correctamente");
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}


































// import { Request, Response } from "express";
// import { CreatePaymentUseCase } from "../../application/CreatePaymentUseCase";
// import { PaymentRepository } from "../../domain/PaymentRepository";
// import { ProcessWebhookUseCase } from "../../application/ProcessWebhookUseCase";

// export class PaymentController {
//     private readonly createPaymentUseCase: CreatePaymentUseCase;
//     private readonly paymentRepository: PaymentRepository;
//     private readonly processWebhookUseCase: ProcessWebhookUseCase;

//     constructor(
//         createPaymentUseCase: CreatePaymentUseCase,
//         paymentRepository: PaymentRepository,
//         processWebhookUseCase: ProcessWebhookUseCase
//     ) {
//         this.createPaymentUseCase = createPaymentUseCase;
//         this.paymentRepository = paymentRepository;
//         this.processWebhookUseCase = processWebhookUseCase;
//     }

//     // Método para crear un pago
//     async createPayment(req: Request, res: Response): Promise<Response> {
//         try {
//             const { leadId, email, amount } = req.body;

//             // Verificar que amount esté presente
//             if (amount === undefined || amount === null) {
//                 return res.status(400).json({ error: "El monto (amount) es necesario para crear el pago." });
//             }

//             // Iniciar el proceso de pago y generar el link de Mercado Pago
//             const paymentLink = await this.createPaymentUseCase.run(leadId, email, amount);

//             return res.status(201).json({
//                 message: "Pago iniciado con éxito, sigue el link para completar el pago",
//                 paymentLink
//             });
//         } catch (error: any) {
//             return res.status(400).json({ error: error.message });
//         }
//     }

//     // Método para obtener el estado del pago
//     async getPaymentStatus(req: Request, res: Response): Promise<Response> {
//         try {
//             const { id } = req.params;

//             // Obtener el estado del pago usando el repositorio directamente
//             const paymentStatus = await this.paymentRepository.getPaymentStatus(id);

//             return res.status(200).json(paymentStatus);
//         } catch (error: any) {
//             return res.status(404).json({ error: error.message });
//         }
//     }

//     // Método para manejar el webhook de Mercado Pago
//     async handleWebhook(req: Request, res: Response): Promise<Response> {
//         try {
//             const { type, data } = req.body;

//             // Verificar que `data` y `data.id` están presentes antes de proceder
//             if (!data || !data.id) {
//                 return res.status(400).json({ error: "El cuerpo del webhook no contiene la propiedad 'data' o 'id'" });
//             }

//             // Procesar el evento del webhook usando el caso de uso
//             await this.processWebhookUseCase.run(type, data.id);

//             return res.status(200).send("Webhook recibido y procesado correctamente");
//         } catch (error: any) {
//             return res.status(500).json({ error: error.message });
//         }
//     }
// }

