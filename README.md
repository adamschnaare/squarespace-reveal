# ssReveal
A RevealJS-based announcements/events reader for SquareSpace feeds

## Installation
1. Copy [thisfile](www.google.com) and paste it into SquareSpace's footer for your site. At your SquareSpace account, navigate to `Settings > Advanced > Code Injection`, and paste this code into the **Footer section**.
```
// Config
var ssReveal = {
    config: {
        baseUrl: 'http://themill-church.squarespace.com',
        feedUrl: 'http://themill-church.squarespace.com/events/?format=json-pretty',
        range: 'upcoming', // past,upcoming
        linkText: 'See Details'
    }
};
```

## Configuration

## Usage
