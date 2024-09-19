import { ServiceBusClient } from "@azure/service-bus";
import 'dotenv/config'

export class ServiceBusHandler{
    async receiveGeoInfo (queueName) {
        const connectionString = process.env.SERVICE_BUS_KEY;
        const serviceBusClient = new ServiceBusClient(connectionString);
        try {
            const receiver = serviceBusClient.createReceiver(queueName);
            console.log(`Receiving messages...`);
            const limit = 2;
            const receivedMessages = await receiver.receiveMessages(limit, { maxWaitTimeMs: 20000 });
            var locations = [];
            var location = {};
            location.position = {};
            location.sourceIP = "";
            location.event_category = "";
            location.position.lat = 0;
            location.position.lng = 0;
            location.label = "Security Alert";
            
            for (const message of receivedMessages) {
                //const body = JSON.parse(message.body);
                //console.log(`Source IP: ${body.source_ip}`);
                //console.log(`Destination IP: ${body.destination_ip}`);
                 location.sourceIP = message.body.source_ip;
                 location.event_category = message.body.event_category;
                 location.position.lat = message.body.latitude;
                 location.position.lng = message.body.Longitude;
                
                locations.push(location);
                
    
                // Complete the message to remove it from the queue
                await receiver.completeMessage(message);
            }
    
            await receiver.close();
           // console.log(locations);
            return locations;
        } catch (err) {
            console.error(`Failed to receive messages:`, err);
            throw err;
        } finally {
            await serviceBusClient.close();
        }
    }
}

