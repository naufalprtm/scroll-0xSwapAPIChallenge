import axios from 'axios';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

async function monetizeApp() {
  console.log(chalk.blue('=== Starting monetizeApp ==='));
  console.log(chalk.yellow('Initial state: Affiliate Address:'), chalk.green(process.env.WALLET_ADDRESS));

  try {
    const apiUrl = 'https://api.0x.org/swap/permit2/quote';
    const params = {
      chainId: process.env.SCROLL_CHAIN_ID,
      sellToken: '0x5300000000000000000000000000000000000004', // WETH
      buyToken: '0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32', // wstETH
      sellAmount: '100000000000000000000', // 100 WETH in wei
      taker: process.env.WALLET_ADDRESS,
      affiliateAddress: process.env.WALLET_ADDRESS,
      feeRecipient: process.env.WALLET_ADDRESS,
      buyTokenPercentageFee: 10, // 1% fee
    };

    console.log(chalk.magenta('Sending request to API with params:'), params);
    const headers = {
      '0x-api-key': process.env.API_KEY,
      '0x-version': 'v2',
    };
    console.log(chalk.cyan('Headers:'), headers);

    const response = await axios.get(apiUrl, { params, headers });

    console.log(chalk.green('API response status:'), response.status);
    console.log(chalk.green('Raw response data:'), JSON.stringify(response.data, null, 2));

    console.log(chalk.blue('=== monetizeApp completed successfully ==='));
  } catch (error) {
    console.error(chalk.red('Error in monetizeApp:'), error.message);
    console.error('Full error object:', error);
  }
}

export default monetizeApp;
