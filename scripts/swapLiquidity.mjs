"use strict";

import axios from 'axios';
import dotenv from 'dotenv';
import chalk from 'chalk';

// Load environment variables from .env file
dotenv.config();

/**
 * Fetch swap quotes from the 0x API
 */
async function fetchSwapQuote() {
    console.log(chalk.blue('=== Starting fetchSwapQuote ==='));
    console.log(chalk.yellow('Initial state: Wallet Address:'), chalk.green(process.env.WALLET_ADDRESS));

    const sources = []; // Array to store source data

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

        // Process route data from the API response
        const route = response.data.route;
        if (route && route.fills) {
            console.log(chalk.blue(`${route.fills.length} sources detected:`));
            route.fills.forEach((fill, index) => {
                // Log each fill source and proportion
                console.log(chalk.green(`Source ${index + 1}: ${fill.source}, Proportion: ${(fill.proportionBps / 100).toFixed(2)}%`));
                sources.push({
                    name: fill.source,
                    proportion: (fill.proportionBps / 100).toFixed(2) + '%'
                });
            });
        } else {
            console.log(chalk.yellow('No fills found in the route.'));
        }
        
        console.log(chalk.blue('=== fetchSwapQuote completed successfully ==='));
        return { sources }; // Return the sources
    } catch (error) {
        // Log error details for debugging
        console.error(chalk.red('Error in fetchSwapQuote:'), error.message);
        console.error('Full error object:', error);
        return { sources: [] }; // Return empty sources on error
    }
}

// Export the function for external use
export default fetchSwapQuote;
