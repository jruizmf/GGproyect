import OrderDtoModel from "./orderDto.model";

export class Column {
    constructor(public name: string, public tasks: OrderDtoModel[]) {}
}