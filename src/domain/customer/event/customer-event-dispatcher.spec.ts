import { CustomerCreatedEvent } from './customer-created.event';

import EventDispatcher from '../../@shared/event/event-dispatcher';
import { SendFirstMessageWhenCustomerCreatedHandler } from './handler/send-first-message-when-customer-created.handler';
import { SendSecondMessageWhenCustomerCreatedHandler } from './handler/send-second-message-when-customer-created.handler';
import { SendMessageWhenAddressChangedHandler } from './handler/send-message-when-address-changed.handler';
import Customer from '../entity/customer';
import Address from '../value-object/address';
import { CustomerAddressChangedEvent } from './customer-address-changed.event';


describe('Customer Domain Events Tests', () => {
    it('should notify all event handlers when customer is created', () => {
        const eventDispatcher = new EventDispatcher();
        const sendFirstMessageEventHandler = new SendFirstMessageWhenCustomerCreatedHandler();
        const sendSecondMessageEventHandler = new SendSecondMessageWhenCustomerCreatedHandler();

        const spyEventHandlerFirstMessage = jest.spyOn(
            sendFirstMessageEventHandler,
            'handle',
        );
        const spyEventHandlerSecondMessage = jest.spyOn(
            sendSecondMessageEventHandler,
            'handle',
        );

        eventDispatcher.register(
            'CustomerCreatedEvent',
            sendFirstMessageEventHandler,
        );
        eventDispatcher.register(
            'CustomerCreatedEvent',
            sendSecondMessageEventHandler,
        );

        expect(
            eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
        ).toMatchObject(sendFirstMessageEventHandler);
        expect(
            eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
        ).toMatchObject(sendSecondMessageEventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: 1,
            name: 'Customer name',
        });
       
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandlerFirstMessage).toHaveBeenCalled();
        expect(spyEventHandlerSecondMessage).toHaveBeenCalled();
    });

    it('should notify all event handlers when customer address change', () => {
        const eventDispatcher = new EventDispatcher();

        const sendMessageWhenAddressChangeHandler = new SendMessageWhenAddressChangedHandler();        
       
        const spyEventHandlerMessageAdressChanged = jest.spyOn(
            sendMessageWhenAddressChangeHandler,
            'handle',
        );

        let customer = new Customer('123', 'Customer 1');

        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
        customer.changeAddress(address);

        eventDispatcher.register(
            'CustomerAddressChangedEvent',
            sendMessageWhenAddressChangeHandler,
        );

        const customerAddressChangeEvent = new CustomerAddressChangedEvent(
            customer.id, customer.name, customer.Address
        );

       
        eventDispatcher.notify(customerAddressChangeEvent);

        expect(spyEventHandlerMessageAdressChanged).toHaveBeenCalled();
    });
});