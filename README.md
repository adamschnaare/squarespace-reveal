# ssReveal
A RevealJS-based announcements/events reader for SquareSpace feeds

## Installation
1. Copy [ssReveal-footer.html](https://raw.githubusercontent.com/adamschnaare/ssReveal/master/dist/ssReveal-footer.html) and paste it into SquareSpace's footer for your site. At your SquareSpace account, navigate to `Settings > Advanced > Code Injection`, and paste this code into the **Footer section**.
2. Create a page on your SquareSpace account for your slideshow. I'd recommend making it an unlinked page.
3. On that page (2), click `Settings > Advanced` and paste [ssReveal-header.html](https://raw.githubusercontent.com/adamschnaare/ssReveal/master/dist/ssReveal-header.html) into the **header** section.
4. In that section, edit the config section (the very top, shown below), pasting in **your correct Urls**. See Configuration section for details

```
// Config
var ssReveal = {
    config: {
        baseUrl: 'https://themill-church.squarespace.com',
        feedUrl: 'https://themill-church.squarespace.com/events/?format=json-pretty',
        range: 'upcoming', // past,upcoming
        linkText: 'See Details'
    }
};
```

## Configuration
`baseUrl`: Your website url up to the `.com`, or whatever. Be sure it starts with `https` not `http`
`feedUrl`: Your events feed url. Add `?format=json-pretty` to the end. Be sure it starts with `https` not `http`
`range`: whether you want `past` or `upcoming` events
`linkText`: the text that shows up on the links back to the actual event pages

## Usage
Once setup, just navigate to your create page url, and you're good to go!
