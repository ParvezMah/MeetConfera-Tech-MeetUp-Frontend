export type PaymentStatus =
  | "SUCCESS"
  | "FAILED"
  | "PENDING"
  | "REFUNDED";

export interface Payment {
  id: string;
  transactionId: string;
  user: {
    name: string;
    email: string;
  };
  eventTitle?: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: PaymentStatus;
  createdAt: string;
}
