# Arabic Virtual Keyboard
<img width="811" alt="keyboard" src="https://github.com/selmetwa/arabic-virtual-keyboard/assets/46908343/d7a6f2a9-018f-4930-93a5-18ed0b4b87eb">

[![](https://data.jsdelivr.com/v1/package/npm/arabic-virtual-keyboard/badge)](https://www.jsdelivr.com/package/npm/arabic-virtual-keyboard)

## About
Arabic Virtual Keyboard is a tool that helps english speakers write in Arabic without having a dedicated arabic keyboard.

The keyboard is fully featured and contains support for all letters, numbers, special characters, diacritical marks, and text to speech.

[View Demo Here](https://selmetwa.github.io/arabic-virtual-keyboard-demo/)

## Documentation

This keyboard was built as a web component and is fully compatiable with your JS, React, Angular or Vue projects.

You can use arabic-virtual-keyboard as a <script> tag from a CDN, or install it from npm.

## Installation Via NPM
```
npm i arabic-virtual-keyboard
```

## Installation Via CDN

```
<script type="module" src="https://cdn.jsdelivr.net/npm/arabic-virtual-keyboard/+esm"></script>
```

## Usage

```
<div>
  <arabic-keyboard></arabic-keyboard>
</div>
```

## Usage in React
This requires use of the @lit/react package
```
npm install @lit/react

import React from 'react';

import { ArabicKeyboard as ArabicKeyboardWC } from 'arabic-virtual-keyboard'
import {createComponent} from '@lit/react';

const ArabicKeyboard = createComponent({
  tagName: 'arabic-keyboard',
  elementClass: ArabicKeyboardWC,
  react: React,
});

function App() {
  return (
    <div>
      <ArabicKeyboard showEnglishValue="true" showShiftedValue="true"></ArabicKeyboard>
    </div>
  )
}

export default App
```

## Attributes

`showEnglishValue` -> show transliterated english key
`showShiftedValue` -> show shifted value of key

| Attribute        | Default |
| ---------------- | :-----: |
| showEnglishValue |  false  |
| showShiftedValue |  false  |

## Usage With Attributes
```
<div>
  <arabic-keyboard showEnglishValue="true" showShiftedValue="true">
  </arabic-keyboard>
</div>
```
## Styling
Restyle the keyboard by utilizing css custom properties

| Property                         | Default             |
| -------------------------------- | ------------------- |
| --keyboard-row-gap               | 4px                 |
| --font-size                      | 18px                |
| --max-keyboard-width             | 800px               |
| --row-height                     | 50px                |
| --border-radius                  | 4px                 |
| --button-background-color        | #ececec             |
| --border                         | 1px solid #999999   |
| --button-active-background-color | #d6d6d6             |
| --button-active-border           | 1px solid #8f8f8f   |
| --button-padding                 | 4px                 |
| --button-color                   | #000000             |
| --button-shifted-color           | #ff0000             |
| --button-eng-color               | #0000ff             |
| --button-hover-background-color  | #e0e0e0             |
| --textarea-background-color      | #ffffff             |
| --font-family                    | "Arial", sans-serif |
