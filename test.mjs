"use strict";

import chalk from 'chalk';
import fetchSwapQuote from './scripts/swapLiquidity.mjs';
import fetchTokenTaxInfo from './scripts/fetchTokenTaxInfo.mjs';
import fetchLiquiditySources from './scripts/fetchLiquiditySources.mjs';
import monetizeApp from './scripts/monetizeApp.mjs';

async function runAllScripts() {
    console.log(chalk.magenta('--- Running all scripts ---'));
    const results = [];

    let liquiditySourcesDetails = [];
    let tokenInfo = {};
    let swapSources = [];

    try {
        // Swap Liquidity Breakdown
        const startSwap = Date.now();
        console.log(chalk.cyan('--- Running Swap Liquidity Breakdown ---'));
        const swapQuoteData = await fetchSwapQuote(); // Fetch swap data including sources
        swapSources = swapQuoteData.sources; // Extract sources from swap response
        const swapTime = Date.now() - startSwap;
        results.push({ script: 'Swap Liquidity Breakdown', success: true, time: swapTime });

        // Token Tax Info
        const startTaxInfo = Date.now();
        console.log(chalk.cyan('--- Running Token Tax Info ---'));
        tokenInfo = await fetchTokenTaxInfo(); // Modify fetchTokenTaxInfo to return relevant data
        const taxInfoTime = Date.now() - startTaxInfo;
        results.push({ script: 'Token Tax Info', success: true, time: taxInfoTime });

        // Liquidity Sources
        const startLiquiditySources = Date.now();
        console.log(chalk.cyan('--- Running Liquidity Sources ---'));
        liquiditySourcesDetails = await fetchLiquiditySources(); // Fetch liquidity sources data
        const liquiditySourcesTime = Date.now() - startLiquiditySources;
        results.push({ script: 'Liquidity Sources', success: true, time: liquiditySourcesTime });

        // Monetization Script
        const startMonetization = Date.now();
        console.log(chalk.cyan('--- Running Monetization Script ---'));
        await monetizeApp();
        const monetizationTime = Date.now() - startMonetization;
        results.push({ script: 'Monetization Script', success: true, time: monetizationTime });

    } catch (error) {
        console.error(chalk.red('Error running scripts:'), error);
        results.push({ script: 'Error', success: false, time: null, error: error.message });
    } finally {
        console.log(chalk.magenta('--- Summary of Script Executions ---'));

        // Define fixed width for each column
        const scriptNameWidth = 35;
        const statusWidth = 10;
        const timeWidth = 15;

        // Print header for the summary table
        console.log(chalk.white(`\n${'Script Name'.padEnd(scriptNameWidth)} | Status    | Time (ms)`));
        console.log(chalk.white('-'.repeat(scriptNameWidth + statusWidth + timeWidth + 5)));

        // Display results in a consistent format
        results.forEach((result) => {
            const status = result.success ? chalk.green('Success') : chalk.red('Failed');
            const time = result.success ? result.time.toString() : 'N/A';
            const paddedScriptName = result.script.padEnd(scriptNameWidth);
            const paddedStatus = status.padEnd(statusWidth);
            const paddedTime = time.padEnd(timeWidth);
            console.log(chalk.white(`${paddedScriptName} | ${paddedStatus} | ${paddedTime}`));
        });

        // Display Swap Sources details
        if (swapSources.length > 0) {
            console.log(chalk.white(`\nSwap Sources: ${swapSources.length} sources detected:`));
            swapSources.forEach((source, index) => {
                console.log(chalk.white(`  Source ${index + 1}: ${source.name}, Proportion: ${source.proportion}`));
            });
        } else {
            console.log(chalk.yellow('No swap sources detected.'));
        }

        // Highlighting fetchLiquiditySources and token info specifically
        const liquidityResult = results.find(r => r.script === 'Liquidity Sources');
        if (liquidityResult) {
            console.log(chalk.white(`\nFetch Liquidity Sources: ${liquidityResult.success ? chalk.green('Success') : chalk.red('Failed')} | Time: ${liquidityResult.success ? liquidityResult.time + ' ms' : 'N/A'}`));
            console.log(chalk.white('Available Liquidity Sources:'));
            liquiditySourcesDetails.forEach((source, index) => {
                console.log(chalk.white(`  ${index + 1}. ${source}`));
            });
        }

        // Display token info
        if (tokenInfo.buyToken) {
            console.log(chalk.white(`\nBuy Token Info: ${tokenInfo.buyToken}`));
        }
        if (tokenInfo.sellToken) {
            console.log(chalk.white(`Sell Token Info: ${tokenInfo.sellToken}`));
        }

        // Display specific source information at the very bottom
        if (swapSources.length > 0) {
            console.log(chalk.green(`\nDetected ${swapSources.length} sources:`));
            swapSources.forEach((source, index) => {
                console.log(chalk.green(`  Source ${index + 1}: ${source.name}, Proportion: ${source.proportion}`));
            });
        } else {
            console.log(chalk.yellow('No swap sources detected.'));
        }
    }
}

runAllScripts()
    .then(() => {
        console.log('--- All scripts executed successfully ---');
    })
    .catch((error) => {
        console.error('Error in running all scripts:', error);
    });
