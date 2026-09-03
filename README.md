# Mayabi Date Invitation

Open `dist/index.html` to preview the website. It is mobile-first and contains two pages: the invitation and date planner.

## Change both names

Open `dist/assets/config.js` and change only these two values:

```js
inviteeName: 'Mayabi',
inviterName: 'Hasib'
```

The invitation, headings, messages, signature and Google Sheet submission will update automatically.

## Add the song

Rename your MP3 file to `our-song.mp3` and place it inside `dist/assets/`.

## Connect Google Sheets

1. Create a Google Sheet.
2. Open **Extensions → Apps Script**.
3. Replace the editor content with `google-apps-script.js`, then save.
4. Select **Deploy → New deployment → Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone**. Deploy and copy the Web App URL.
6. Open `dist/assets/planner.js` and replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL.

Without the URL, preview submissions are safely stored only in that phone's browser.

## Publish on GitHub Pages

Upload the files inside `dist` to the root of a GitHub repository. In repository settings, enable Pages from the main branch/root folder.
