'use server';

import figlet from 'figlet';

export async function generateAsciiArt(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
        figlet.text(text, { font: 'Standard' as figlet.Fonts }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data || '');
        });
    });
}
