const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

const sourcePath = path.join(process.cwd(), 'public/data/elements.json');
const elements = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

async function translateElements(targetLang, outputPath) {
  console.log(`Starting translation for ${targetLang}...`);
  const translatedElements = [];
  
  // To avoid hitting rate limits easily, translating in batches or individual fields
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    console.log(`Translating ${el.name} to ${targetLang}...`);
    try {
      // Create a copy 
      const tEl = { ...el };
      
      const res = await translate({
        name: el.name,
        description: el.description
      }, { to: targetLang });
      
      tEl.name = res.name;
      tEl.category = el.category; // Kept in English for CSS classes
      tEl.description = res.description;
      
      translatedElements.push(tEl);
      
      // tiny wait
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`Error translating ${el.name}`, err);
      // fallback
      translatedElements.push(el);
    }
  }
  
  fs.writeFileSync(path.join(process.cwd(), outputPath), JSON.stringify(translatedElements, null, 2));
  console.log(`Finished ${targetLang} translations.`);
}

async function run() {
  await translateElements('pt', 'public/data/elements_pt-BR.json');
  await translateElements('es', 'public/data/elements_es.json');
  
  // also create en-US as a pure copy of default elements.json
  fs.writeFileSync(path.join(process.cwd(), 'public/data/elements_en-US.json'), fs.readFileSync(sourcePath, 'utf8'));
  console.log('All done!');
}

run();
