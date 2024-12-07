export class Payment {
    constructor(
      public id: string,
      public items: any[],
      public payerEmail: string,
      public externalReference: string,
      public status: string 
    ) {}
  }
  