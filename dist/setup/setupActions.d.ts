import { DappeteerPage } from "../page";
import { MetaMaskOptions } from "../types";
export declare function showTestNets(metaMaskPage: DappeteerPage): Promise<void>;
export declare function enableEthSign(metaMaskPage: DappeteerPage): Promise<void>;
export declare function acceptTheRisks(metaMaskPage: DappeteerPage): Promise<void>;
export declare function confirmWelcomeScreen(metaMaskPage: DappeteerPage): Promise<void>;
export declare function declineAnalytics(metaMaskPage: DappeteerPage): Promise<void>;
export declare function importAccount(metaMaskPage: DappeteerPage, { seed, password, }: MetaMaskOptions): Promise<void>;
export declare const closePopup: (page: DappeteerPage) => Promise<void>;
export declare const closeWhatsNewModal: (page: DappeteerPage) => Promise<void>;
