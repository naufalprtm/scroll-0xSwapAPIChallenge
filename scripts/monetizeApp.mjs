"use strict";

import axios from 'axios';
import dotenv from 'dotenv';
import chalk from 'chalk';

// Load environment variables from .env file
dotenv.config();

/**
 * Monetize the app through affiliate fees and surplus collection
 */
async function monetizeApp() {
    console.log(chalk.blue('=== Starting monetizeApp ==='));
    console.log(chalk.yellow('Initial state: Affiliate Address:'), chalk.green(process.env.WALLET_ADDRESS));

    try {
        // Define API endpoint and parameters for monetization
        const apiUrl = 'https://api.0x.org/swap/permit2/quote';
        const params = {
            chainId: process.env.SCROLL_CHAIN_ID,
            sellToken: process.env.SELL_TOKEN,
            buyToken: process.env.BUY_TOKEN,
            sellAmount: process.env.SELL_AMOUNT,
            taker: process.env.WALLET_ADDRESS,
            affiliateAddress: process.env.WALLET_ADDRESS, // Affiliate address
            feeRecipient: process.env.WALLET_ADDRESS, // Fee recipient address
            buyTokenPercentageFee: process.env.BUY_TOKEN_PERCENTAGE_FEE, // Percentage fee for buy token
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
        
        // You could also log details about the affiliate fees here if applicable
        console.log(chalk.blue('=== monetizeApp completed successfully ==='));
    } catch (error) {
        // Log error details for debugging
        console.error(chalk.red('Error in monetizeApp:'), error.message);
        console.error('Full error object:', error);
    }
}

// Export the function for external use
export default monetizeApp;
