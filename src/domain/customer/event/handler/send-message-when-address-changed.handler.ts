import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";


export class SendMessageWhenAddressChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
             console.log(
            `Endereço do cliente: ${event.eventData._id}, ${event.eventData._name} 
             alterado para: ${event.eventData.address._street},
             ${event.eventData.address._number}, 
             ${event.eventData.address._zip}, 
             ${event.eventData.address._city},`,
          );
    }
}