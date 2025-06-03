// Script Puppeteer para capturar screenshots de folhas Google Sheets publicadas
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  const page = await browser.newPage();

  const urls = [
    {
      nome: "grupos_masc",
      url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUIEENURtuEJ52Jr4OjMiNwX44zq7oUaX-dx_KZ7dTWLN2FTh1OmHXznFTWxCRkPTz6Uol-KmK6_pt/pubhtml?gid=2067354137&single=true"
    },
    {
      nome: "grupos_mix",
      url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUIEENURtuEJ52Jr4OjMiNwX44zq7oUaX-dx_KZ7dTWLN2FTh1OmHXznFTWxCRkPTz6Uol-KmK6_pt/pubhtml?gid=1057529267&single=true"
    },
    {
      nome: "2masc",
      url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUIEENURtuEJ52Jr4OjMiNwX44zq7oUaX-dx_KZ7dTWLN2FTh1OmHXznFTWxCRkPTz6Uol-KmK6_pt/pubhtml?gid=1992541591&single=true"
    }
  ];

  for (const folha of urls) {
  await page.goto(folha.url, { waitUntil: 'networkidle2' });

  if (folha.nome === "grupos_masc" || folha.nome === "grupos_mix") {
    await page.setViewport({ width: 2650, height: 1400 });         // mais largo, menos alto
    await page.evaluate(() => {
      document.body.style.zoom = '75%';
    });
  } else if (folha.nome === "2masc") {
    await page.setViewport({ width: 2000, height: 2800 });        // mais estreito, mais alto
    await page.evaluate(() => {
      document.body.style.zoom = '85%';
    });
  }
  await page.waitForFunction(() => {
    return !document.body.innerText.includes("A carregar");
  }, { timeout: 10000 }).catch(() => console.warn("⚠️ Timeout à espera do carregamento."));

  // Espera adicional para garantir renderização completa
  await page.waitForTimeout(3000);
   
  await page.screenshot({ path: path.join(__dirname, `img/${folha.nome}.png`), fullPage: true });
  console.log(`✅ Screenshot: ${folha.nome}`);
}

  await browser.close();
})();
