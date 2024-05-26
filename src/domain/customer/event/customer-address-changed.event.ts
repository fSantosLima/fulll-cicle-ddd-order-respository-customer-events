import EventInterface from "../../@shared/event/event.interface";

interface Address {
    _street: string;
    _number: number;
    _zip: string;
    _city: string;
}


export class CustomerAddressChangedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: {
        _id: string;
        _name: string;
        address: Address;
    }

    constructor(id: string, name: string, address: Address) {
        this.dataTimeOccurred = new Date();
        this.eventData = {
            _id: id,
            _name: name,
            address: address,
          };
    }
}