import { providers } from 'ethers';

import { EthereumConnection } from './types';

export class InjectedProvider extends EthereumConnection {
  public static readonly connection_name = 'injected_provider';
  public readonly provider: providers.JsonRpcProvider;
  public readonly account = 0; // Refers to the currently selected account in the wallet.

  public static get isAvailable(): boolean {
    return !!window.ethereum || !!window.web3;
  }

  private constructor(injetedProvider: providers.ExternalProvider) {
    super();
    this.provider = new providers.Web3Provider(injetedProvider);
  }

  public static async connect(): Promise<InjectedProvider> {
    // We can't use the check of the super constructor here, else this function does not work.
    if (!InjectedProvider.isAvailable) {
      throw new Error('No injected provider is available.');
    }

    let injectedProvider;

    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      injectedProvider = window.ethereum;
    } else {
      injectedProvider = window.web3.currentProvider;
    }

    injectedProvider.on('chainChanged', resetHandler);
    injectedProvider.on('disconnect', resetHandler);

    return new this(injectedProvider);
  }
}

function resetHandler() {
  window.location.replace(window.location.origin);
}
