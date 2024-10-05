import fetchSwapQuote from './scripts/swapLiquidity.mjs';
import fetchTokenTaxInfo from './scripts/fetchTokenTaxInfo.mjs';
import fetchLiquiditySources from './scripts/fetchLiquiditySources.mjs';
import monetizeApp from './scripts/monetizeApp.mjs';
import chalk from 'chalk';

async function runAllScripts() {
    console.log(chalk.magenta('--- Running all scripts ---'));

    const results: { script: string; success: boolean; time: number | null; error?: string }[] = [];

    try {
        const startSwap = Date.now();
        console.log(chalk.cyan('--- Running Swap Liquidity Breakdown ---'));
        await fetchSwapQuote();
        const swapTime = Date.now() - startSwap;
        results.push({ script: 'Swap Liquidity Breakdown', success: true, time: swapTime });
        console.log(chalk.green(`Swap Liquidity Breakdown completed in ${swapTime}ms.`));

        const startTaxInfo = Date.now();
        console.log(chalk.cyan('--- Running Token Tax Info ---'));
        await fetchTokenTaxInfo();
        const taxInfoTime = Date.now() - startTaxInfo;
        results.push({ script: 'Token Tax Info', success: true, time: taxInfoTime });
        console.log(chalk.green(`Token Tax Info completed in ${taxInfoTime}ms.`));

        const startLiquiditySources = Date.now();
        console.log(chalk.cyan('--- Running Liquidity Sources ---'));
        await fetchLiquiditySources();
        const liquiditySourcesTime = Date.now() - startLiquiditySources;
        results.push({ script: 'Liquidity Sources', success: true, time: liquiditySourcesTime });
        console.log(chalk.green(`Liquidity Sources fetched successfully in ${liquiditySourcesTime}ms.`));

        const startMonetization = Date.now();
        console.log(chalk.cyan('--- Running Monetization Script ---'));
        await monetizeApp();
        const monetizationTime = Date.now() - startMonetization;
        results.push({ script: 'Monetization Script', success: true, time: monetizationTime });
        console.log(chalk.green(`Monetization script completed successfully in ${monetizationTime}ms.`));
    } catch (error) {
        console.error(chalk.red('Error running scripts:'), error);
        results.push({ script: 'Error', success: false, time: null, error: error.message });
    } finally {
        console.log(chalk.magenta('--- Summary of Script Executions ---'));
        results.forEach((result) => {
            if (result.success) {
                console.log(chalk.green(`${result.script}: Success | Time: ${result.time}ms`));
            } else {
                console.log(chalk.red(`${result.script}: Failed | Error: ${result.error}`));
            }
        });
    }
}

runAllScripts()
    .then(() => {
        console.log('--- All scripts executed successfully ---');
    })
    .catch((error) => {
        console.error('Error in running all scripts:', error);
    });
