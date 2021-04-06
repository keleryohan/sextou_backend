import { createConnections } from 'typeorm';

createConnections().then(() => console.log('🎁 Sucessfully connected with database'));