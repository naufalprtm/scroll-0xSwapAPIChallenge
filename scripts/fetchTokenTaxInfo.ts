import axios from 'axios';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

async function fetchTokenTaxInfo() {
  console.log(chalk.blue('=== Starting fetchTokenTaxInfo ==='));
  console.log(
    chalk.yellow('Initial state: chainId:'),
    chalk.green(process.env.SCROLL_CHAIN_ID),
    chalk.yellow('Wallet Address:'),
    chalk.green(process.env.WALLET_ADDRESS)
  );

  try {
    const apiUrl = 'https://api.0x.org/swap/permit2/quote';
    const params = {
      chainId: process.env.SCROLL_CHAIN_ID,
      sellToken: '0x5300000000000000000000000000000000000004', // WETH
      buyToken: '0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32', // wstETH
      sellAmount: '100000000000000000000', // 100 WETH in wei
      taker: process.env.WALLET_ADDRESS,
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

    const tokenMetadata = response.data.tokenMetadata;
    console.log(chalk.blue('Parsing token metadata...'));
    console.log(chalk.green('Buy Token Info:'), tokenMetadata.buyToken);
    console.log(chalk.green('Sell Token Info:'), tokenMetadata.sellToken);

    if (tokenMetadata.buyToken.buyTaxBps > 0) {
      console.log(chalk.green(`Buy Token Tax: ${(tokenMetadata.buyToken.buyTaxBps / 100).toFixed(2)}%`));
    } else {
      console.log(chalk.yellow('No buy tax for the buy token.'));
    }

    if (tokenMetadata.sellToken.sellTaxBps > 0) {
      console.log(chalk.green(`Sell Token Tax: ${(tokenMetadata.sellToken.sellTaxBps / 100).toFixed(2)}%`));
    } else {
      console.log(chalk.yellow('No sell tax for the sell token.'));
    }

    console.log(chalk.blue('=== fetchTokenTaxInfo completed successfully ==='));
  } catch (error) {
    console.error(chalk.red('Error fetching token tax info:'), error.message);
    console.error('Full error object:', error);
  }
}

export default fetchTokenTaxInfo;
