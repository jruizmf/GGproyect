export default interface OrderDtoModel
{
    id: number,
    order_name:string,
    order_ships_by: string,
    order_arrives:Date,
    order_start: Date,
    order_end:Date,
    is_event:boolean,
    amount: number,
    state_name:string,
    quantity:number
}