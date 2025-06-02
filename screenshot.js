// Script Puppeteer para capturar screenshots de folhas Google Sheets publicadas
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  const page = await browser.newPage();

  const urls = [
    {
      nome: "quadro1",
      url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUIEENURtuEJ52Jr4OjMiNwX44zq7oUaX-dx_KZ7dTWLN2FTh1OmHXznFTWxCRkPTz6Uol-KmK6_pt/pubhtml?gid=2067354137&single=true"
    },
    {
      nome: "quadro2",
      url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUIEENURtuEJ52Jr4OjMiNwX44zq7oUaX-dx_KZ7dTWLN2FTh1OmHXznFTWxCRkPTz6Uol-KmK6_pt/pubhtml?gid=1057529267&single=true"
    },
    {
      nome: "quadro3",
      url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUIEENURtuEJ52Jr4OjMiNwX44zq7oUaX-dx_KZ7dTWLN2FTh1OmHXznFTWxCRkPTz6Uol-KmK6_pt/pubhtml?gid=1992541591&single=true"
    }
  ];

  for (const folha of urls) {
    await page.goto(folha.url, { waitUntil: 'networkidle2' });
    //await page.setViewport({ width: 1920, height: 1080 });
    await page.setViewport({ width: 2560, height: 1440 }); // simula ecrã grande
await page.evaluate(() => {
  document.body.style.zoom = '80%'; // reduz zoom do conteúdo para mostrar mais
});
    await page.screenshot({ path: path.join(__dirname, `img/${folha.nome}.png`), fullPage: true });
    console.log(`✅ Screenshot: ${folha.nome}`);
  }

  await browser.close();
})();
