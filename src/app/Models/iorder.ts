export interface Iorder {
    _id:string,
    userId?: string,
    cartId?: string,
    shippingAddress?: any,
    paymentmethod?:string,
    shippingPrice?: number,
    taxPrice?: number,
    totalPrice:number,
    isPaid?: boolean,
    paidAt?: Date,
    isDelivered?: boolean,
    deliveredAt?:Date,
    isCancelled?: boolean,
    orderItems:any,
    createdAt:Date
}
