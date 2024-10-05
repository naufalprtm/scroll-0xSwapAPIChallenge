"use strict";

import axios from 'axios';
import dotenv from 'dotenv';
import chalk from 'chalk';

// Load environment variables from .env file
dotenv.config();

/**
 * Fetch liquidity sources from the 0x API
 */
async function fetchLiquiditySources() {
    console.log(chalk.blue('=== Starting fetchLiquiditySources ==='));
    console.log(chalk.yellow('Initial state: chainId from .env:'), chalk.green(process.env.SCROLL_CHAIN_ID));

    try {
        // Define API endpoint and parameters
        const apiUrl = 'https://api.0x.org/swap/v1/sources';
        const params = {
            chainId: process.env.SCROLL_CHAIN_ID, // Retrieve chain ID from environment variables
            sellToken: process.env.SELL_TOKEN,     // Add your sellToken variable
            buyToken: process.env.BUY_TOKEN,       // Add your buyToken variable
            sellAmount: process.env.SELL_AMOUNT,   // Add your sellAmount variable
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

        // Check if records are present and valid
        const records = response.data.records || []; // Default to an empty array if not found
        if (Array.isArray(records) && records.length > 0) {
            console.log(chalk.blue(`${records.length} liquidity sources detected...`));
            
            // Log each liquidity source's name
            records.forEach((source, index) => {
                console.log(chalk.green(`Source ${index + 1}: ${source}`));
            });

            console.log(chalk.blue('=== fetchLiquiditySources completed successfully ==='));
            return records; // Return records for further processing
        } else {
            console.warn(chalk.red('No liquidity sources found or records is not an array.'));
            return []; // Return an empty array if no records are found
        }

    } catch (error) {
        // Log error details for debugging
        console.error(chalk.red('Error fetching liquidity sources:'), error.message);
        console.error('Full error object:', error);
        return []; // Return an empty array on error
    }
}

// Export the function for external use
export default fetchLiquiditySources;
