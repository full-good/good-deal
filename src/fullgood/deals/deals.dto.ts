export class Deal {
    nameDeal: string;
    name:string;
    phone:string;
    mail: string;
    city: string;
    website: string;
    logo:string;
    status:Status;
  }

  
  export enum Status{
    CONNECTED,
    DETACHED,
    BLOCKED
  }
  
