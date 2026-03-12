const https = require('https');

https.get('https://v0-neumorphism-dark-mode.vercel.app/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const cssMatches = data.match(/href=\"([^\"]+\.css)\"/g);
        if (!cssMatches) {
            console.log('No CSS found');
            return;
        }

        cssMatches.forEach(match => {
            let url = match.substring(6, match.length - 1);
            if (url.startsWith('/')) url = 'https://v0-neumorphism-dark-mode.vercel.app' + url;

            https.get(url, (resCSS) => {
                let cssData = '';
                resCSS.on('data', (chunk) => cssData += chunk);
                resCSS.on('end', () => {
                    const blocks = cssData.split('}');

                    console.log('\n--- CSS Blocks with Box Shadow ---');
                    blocks.forEach(block => {
                        if (block.includes('box-shadow') || block.includes('--')) {
                            console.log(block.trim() + '}');
                        }
                    });
                });
            });
        });
    });
});
