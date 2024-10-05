"use strict";

import axios from 'axios';
import dotenv from 'dotenv';
import chalk from 'chalk';

// Load environment variables from .env file
dotenv.config();

/**
 * Fetch tax information for specified tokens
 */
async function fetchTokenTaxInfo() {
    console.log(chalk.blue('=== Starting fetchTokenTaxInfo ==='));
    console.log(chalk.yellow('Initial state: chainId:'), chalk.green(process.env.SCROLL_CHAIN_ID), chalk.yellow('Wallet Address:'), chalk.green(process.env.WALLET_ADDRESS));

    let tokenInfo = {}; // Declare tokenInfo here

    try {
        // Define API endpoint and parameters
        const apiUrl = 'https://api.0x.org/swap/permit2/quote';
        const params = {
            chainId: process.env.SCROLL_CHAIN_ID,
            sellToken: process.env.SELL_TOKEN,
            buyToken: process.env.BUY_TOKEN,
            sellAmount: process.env.SELL_AMOUNT,
            taker: process.env.WALLET_ADDRESS,
        };

        console.log(chalk.magenta('Sending request to API with params:'), params);

        // Set up request headers including API key
        const headers = {
            '0x-api-key': process.env.API_KEY,
            '0x-version': 'v2',
        };

        console.log(chalk.cyan('Headers:'), headers);

        // Make the API call
        const response = await axios.get(apiUrl, { params, headers });
        console.log(chalk.green('API response status:'), response.status);
        console.log(chalk.green('Raw response data:'), JSON.stringify(response.data, null, 2));

        // Extract token metadata from the response
        tokenInfo.buyToken = response.data.buyToken || {};
        tokenInfo.sellToken = response.data.sellToken || {};

        console.log(chalk.blue('Parsing token metadata...'));

        // Log buy and sell token info
        console.log(chalk.green('Buy Token Info:'), tokenInfo.buyToken);
        console.log(chalk.green('Sell Token Info:'), tokenInfo.sellToken);

        // Check and display buy tax information
        if (tokenInfo.buyToken.buyTaxBps > 0) {
            console.log(chalk.green(`Buy Token Tax: ${(tokenInfo.buyToken.buyTaxBps / 100).toFixed(2)}%`));
        } else {
            console.log(chalk.yellow('No buy tax for the buy token.'));
        }

        // Check and display sell tax information
        if (tokenInfo.sellToken.sellTaxBps > 0) {
            console.log(chalk.green(`Sell Token Tax: ${(tokenInfo.sellToken.sellTaxBps / 100).toFixed(2)}%`));
        } else {
            console.log(chalk.yellow('No sell tax for the sell token.'));
        }

        console.log(chalk.blue('=== fetchTokenTaxInfo completed successfully ==='));
        return tokenInfo; // Return the tokenInfo object directly
    } catch (error) {
        // Log error details for debugging
        console.error(chalk.red('Error fetching token tax info:'), error.message);
        console.error('Full error object:', error);
        return undefined; // Explicitly return undefined on error
    }
}

// Export the function for external use
export default fetchTokenTaxInfo;
