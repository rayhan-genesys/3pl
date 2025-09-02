export type Services = "pick" | "packaging";

export type PickServiceTable = {
  orderId: string;
  date: string;
  items: string;
  initialFee: string;
  additionalItemFee: string;
  amount: string;
};

export type PackagingServiceTable = {
  orderId: string;
  date: string;
  boxType: string;
  amount: string;
};

export type ShippingServiceTable = {
  orderId: string;
  date: string;
  carrier: string;
  method: string;
  amount: string;
};

export type StorageServiceTable = {
  locationType: string;
  date: string;
  items: string;
  amount: string;
};

export type ReceivingEventServiceTable = {
  date: string;
  poNumber: string;
  type: string;
  details: string;
  amount: string;
};

export type ValueAddedServiceTable = {
  orderId: string;
  date: string;
  service: string;
  details: string;
  amount: string;
};

export type AdHocServiceTable = {
  date: string;
  description: string;
  amount: string;
};
