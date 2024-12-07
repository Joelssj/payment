// domain/Webhook.ts
export class Webhook {
    constructor(
        public id: string,
        public type: string,
        public data: any,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}

