// @ts-ignore
import mercadopago from "mercadopago";

export class MercadoPagoClient {
    constructor() {
        mercadopago.configure({
            access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
        });
    }

    async createPayment(email: string, amount: number): Promise<any> {
        console.log("Email recibido:", email);
        console.log("Amount recibido:", amount);

        const preference = {
            items: [
                {
                    title: "Suscripción a Servicio Premium",
                    quantity: 1,
                    currency_id: "MXN",
                    unit_price: amount,
                }
            ],
            payer: {
                email: email,
            },
            back_urls: {
                success: "https://tuapp.com/pago-exitoso",
                failure: "https://tuapp.com/pago-fallido",
                pending: "https://tuapp.com/pago-pendiente",
            },
            auto_return: "approved",
        };

        console.log("Preference data:", preference);
        const response = await mercadopago.preferences.create(preference);
        console.log("Respuesta de Mercado Pago:", response.body);

        return {
            id: response.body.id,
            init_point: response.body.init_point,
            status: response.body.status,
        };
    }

    // Método ajustado para obtener el estado del pago
    async getPaymentStatus(paymentId: string): Promise<string> {
        try {
            console.log("Solicitando estado para el pago ID:", paymentId);
            const response = await mercadopago.payment.get(paymentId);
            console.log("Respuesta de Mercado Pago:", response.body);
            return response.body.status;
        } catch (error) {
            console.error("Error al obtener el estado del pago:", {
                message: error,
                status: error,
                cause: error,
                errorStack: error // Agrega información completa del stack de error
            });
            if (error === 404) {
                console.error(`El pago con ID ${paymentId} no fue encontrado en Mercado Pago. Verifica si el ID es correcto y pertenece al entorno adecuado.`);
            } else {
                console.error("Error desconocido al obtener el estado del pago.");
            }
            throw new Error("No se pudo obtener el estado del pago.");
        }
    }
}



