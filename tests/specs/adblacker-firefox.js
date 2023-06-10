import { expect, $ } from "@wdio/globals";
import '@testing-library/jest-dom'
import fs from 'fs';
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('../../', import.meta.url))
const extensionPath = path.resolve(__dirname, `adblacker.xpi`)



describe('AdBlacker', () => {
    before(async () => {
        const extension = fs.readFileSync(extensionPath);
        await browser.installAddOn(extension.toString('base64'), true);
    });

    it("finds the hello world page title", async () => {
        await browser.url(`http://localhost:8000/`);
        const title = await $("#head");
        await expect(title).toHaveTextContaining("Hello World");
    });

    it('finds the blacker div if an ad is being played', async () => {
        await browser.url(`http://localhost:8000/`);
        // Wait for an ad to be played 
        await expect($("#ad-countdown")).toHaveTextContaining(/(\d{1,2}\s*:\s*\d{2})/);
        // Assert blacker div exists
        await expect($("#adblacker")).toBeDisplayed();
    })
});


