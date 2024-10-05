# scroll-0xSwapAPIChallenge

This repository contains a series of scripts built for the **0x Swap API Challenge**. The project is designed to interact with the 0x Swap API, fetching liquidity sources, performing swaps, and gathering token tax information. Additionally, the scripts implement an app monetization strategy using the 0x API. The scripts are written in TypeScript, using Hardhat, Axios, and Chalk for HTTP requests and logging.

## Features
- **Swap Liquidity Breakdown**: Retrieves and displays swap liquidity details.
- **Token Tax Info**: Fetches tax-related details for the tokens involved in the swap.
- **Liquidity Sources**: Lists all liquidity sources used by the 0x Swap API.
- **App Monetization**: Implements a monetization strategy using the API.

## Prerequisites
Before running the scripts, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Hardhat](https://hardhat.org/)
- A valid [0x API Key](https://0x.org/docs/api#getting-started) (free registration).

## Installation
1. Clone the repository:

        git clone https://github.com/naufalprtm/scroll-0xSwapAPIChallenge.git
        cd scroll-0xSwapAPIChallenge


2. Install dependencies:

        npm install

3. Set up environment variables:
    Create a `.env` file in the root of the project and fill it with the following keys:

    ```plaintext
    SCROLL_CHAIN_ID=534352
    SELL_TOKEN=0x5300000000000000000000000000000000000004
    BUY_TOKEN=0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32
    SELL_AMOUNT=100000000000000000000
    API_KEY=your_0x_api_key_here
    WALLET_ADDRESS=your_wallet_address_here
    PRIVATE_KEY=your_private_key_here
    ```

## Running the Scripts

You can run all the scripts in sequence using the following command:

    npx hardhat run test.mjs


# The following scripts are executed:

- `Swap Liquidity Breakdown:` Performs a swap and displays the liquidity details.
- `Token Tax Info:` Retrieves and displays tax information for the tokens involved.
- `Liquidity Sources:` Fetches a list of all available liquidity sources.
- `Monetization:` Implements the monetization logic for your app.

# Example Output

    Script Name                         | Status    | Time (ms)
    -----------------------------------------------------------------
    Swap Liquidity Breakdown            | Success | 1599
    Token Tax Info                      | Success | 1102
    Liquidity Sources                   | Success | 225
    Monetization Script                 | Success | 1009

    Fetch Liquidity Sources: Success | Time: 225 ms
    Available Liquidity Sources:
      1. 0x
      2. Aave_V2
      3. Balancer
      4. Balancer_V2
      5. BancorV3
      6. Compound
      7. CryptoCom
      8. Curve
      9. Curve_V2
      10. DODO
      11. DODO_V2
      12. KyberDMM
      13. KyberElastic
      14. Lido
      15. MakerPsm
      16. MultiHop
      17. PancakeSwap_V3
      18. ShibaSwap
      19. SushiSwap
      20. Synapse
      21. Uniswap
      22. Uniswap_V2
      23. Uniswap_V3

    Buy Token Info: 0xf610a9dfb7c89644979b4a0f27063e9e7d7cda32
    Sell Token Info: 0x5300000000000000000000000000000000000004
    Detected 1 sources:
      Source 1: Nuri_CL, Proportion: 100.00%
  
