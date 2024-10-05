import axios from 'axios';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

async function fetchLiquiditySources() {
  console.log(chalk.blue('=== Starting fetchLiquiditySources ==='));
  console.log(chalk.yellow('Initial state: chainId from .env:'), chalk.green(process.env.SCROLL_CHAIN_ID));

  try {
    const apiUrl = 'https://api.0x.org/swap/v1/sources';
    const params = { chainId: process.env.SCROLL_CHAIN_ID };

    console.log(chalk.magenta('Sending request to API with params:'), params);
    const headers = {
      '0x-api-key': process.env.API_KEY,
      '0x-version': 'v2',
    };
    console.log(chalk.cyan('Headers:'), headers);

    const response = await axios.get(apiUrl, { params, headers });

    console.log(chalk.green('API response status:'), response.status);
    console.log(chalk.green('Raw response data:'), JSON.stringify(response.data, null, 2));

    if (response.data.sources && Array.isArray(response.data.sources)) {
      console.log(chalk.blue('Parsing liquidity sources...'));
      response.data.sources.forEach((source: any, index: number) => {
        console.log(chalk.green(`Source ${index + 1}: Name: ${source.name}, Proportion: ${source.proportionBps} bps`));
      });
    } else {
      console.warn(chalk.red('No liquidity sources found or sources is not an array.'));
    }

    console.log(chalk.blue('=== fetchLiquiditySources completed successfully ==='));
  } catch (error) {
    console.error(chalk.red('Error fetching liquidity sources:'), error.message);
    console.error('Full error object:', error);
  }
}

export default fetchLiquiditySources;
