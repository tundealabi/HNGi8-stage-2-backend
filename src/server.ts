import dotenv from 'dotenv';
dotenv.config();
process.env['NODE_CONFIG_DIR'] = __dirname + '/config';
import config from 'config';

import app from '.';

// task
console.log('My name is Tunde Alabi');
/**
 * Server Activation
 */

const PORT: number | string = process.env.PORT || config.get('app.appPort');
//  run()
app.listen(PORT, () => console.log(`server is hot @ ${PORT}`));
