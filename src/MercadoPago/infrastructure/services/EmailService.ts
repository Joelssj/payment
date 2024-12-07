import nodemailer from 'nodemailer';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Configurar el transporte con un servicio de correo
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',  // Puedes cambiarlo a otro servicio como Outlook o usar SMTP
            auth: {
                user: process.env.EMAIL_USER, // Correo electrónico del remitente (configúralo en tu .env)
                pass: process.env.EMAIL_PASS  // Contraseña del remitente (configúralo en tu .env)
            }
        });
    }

    // Método para enviar un correo de confirmación de pago
    async sendPaymentConfirmationEmail(to: string): Promise<void> {
        const mailOptions = {
            from: '"Tu App" <tucorreo@example.com>',  // El remitente
            to: to,                                   // El destinatario (correo del cliente)
            subject: 'Confirmación de Pago Exitoso',
            text: 'Tu pago ha sido procesado con éxito. Gracias por tu compra.',
            html: `<p>Tu pago ha sido procesado con éxito. Gracias por tu compra.</p>
                   <p>Por favor, <a href="https://tuapp.com/crear-contrasena">crea tu contraseña</a> para completar la activación de tu cuenta.</p>`
        };

        // Enviar el correo
        await this.transporter.sendMail(mailOptions);
    }

    // Método para enviar otros tipos de correos (puedes añadir más métodos según lo que necesites)
    async sendCustomEmail(to: string, subject: string, text: string, htmlContent: string): Promise<void> {
        const mailOptions = {
            from: '"Tu App" <tucorreo@example.com>',  // El remitente
            to: to,                                   // El destinatario (correo del cliente)
            subject: subject,
            text: text,
            html: htmlContent
        };

        // Enviar el correo
        await this.transporter.sendMail(mailOptions);
    }
}
