"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchPuppeteer = void 0;
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_recaptcha_1 = __importDefault(require("puppeteer-extra-plugin-recaptcha"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
async function launchPuppeteer(metamaskPath, userDataDir, options) {
    puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_recaptcha_1.default)()).use((0, puppeteer_extra_plugin_stealth_1.default)());
    const pBrowser = await puppeteer_extra_1.default.launch({
        ...(options.puppeteerOptions ?? {}),
        headless: options.headless,
        userDataDir,
        args: [
            "--accept-lang=en",
            "--window-size=1920,1080",
            `--disable-extensions-except=${metamaskPath}`,
            `--load-extension=${metamaskPath}`,
            ...(options.puppeteerOptions?.args || []),
            ...(options.headless ? ["--headless=new"] : []),
        ],
    });
    const { DPuppeteerBrowser } = await Promise.resolve().then(() => __importStar(require("../puppeteer")));
    return new DPuppeteerBrowser(pBrowser, userDataDir, options.metaMaskFlask);
}
exports.launchPuppeteer = launchPuppeteer;
// import { DappeteerBrowser } from "../browser";
// import { DappeteerLaunchOptions } from "../types";
// export async function launchPuppeteer(
//   metamaskPath: string,
//   userDataDir: string,
//   options: DappeteerLaunchOptions
// ): Promise<DappeteerBrowser> {
//   const pBrowser = await (
//     await import("puppeteer")
//   ).default.launch({
//     ...(options.puppeteerOptions ?? {}),
//     headless: options.headless,
//     userDataDir,
//     args: [
//       "--accept-lang=en",
//       "--window-size=1920,1080",
//       `--disable-extensions-except=${metamaskPath}`,
//       `--load-extension=${metamaskPath}`,
//       ...(options.puppeteerOptions?.args || []),
//       ...(options.headless ? ["--headless=new"] : []),
//     ],
//   });
//   const { DPuppeteerBrowser } = await import("../puppeteer");
//   return new DPuppeteerBrowser(pBrowser, userDataDir, options.metaMaskFlask);
// }
