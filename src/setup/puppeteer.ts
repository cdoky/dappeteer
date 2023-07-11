import { DappeteerBrowser } from "../browser";
import { DappeteerLaunchOptions } from "../types";
import puppeteer from 'puppeteer-extra'

import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

export async function launchPuppeteer(
  metamaskPath: string,
  userDataDir: string,
  options: DappeteerLaunchOptions
): Promise<DappeteerBrowser> {
  puppeteer.use(RecaptchaPlugin()).use(StealthPlugin())

  const pBrowser = await puppeteer.launch({
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
  const { DPuppeteerBrowser } = await import("../puppeteer");
  return new DPuppeteerBrowser(pBrowser, userDataDir, options.metaMaskFlask);
}