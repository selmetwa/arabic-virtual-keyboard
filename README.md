# Arabic Virtual Keyboard

![Image of Keyboard]("src/public/keyboard.png")

## About
Arabic Virtual Keyboard is a tool that helps english speakers write in Arabic without having a dedicated arabic keyboard.

The keyboard is fully featured and contains support for all letters, numbers, special characters, diacritical marks, and text to speech.

[View Demo Here](https://www.google.com)

## Documentation

This keyboard was built as a web component and is fully compatiable with your JS, React, Angular or Vue projects.

You can use arabic-virtual-keyboard as a <script> tag from a CDN, or install it from npm.

## Installation Via NPM

`npm i arabic-virtual-keyboard`

## Installation Via CDN

`<script type="module" src="https://cdn.skypack.dev/arabic-virtual-keyboard"></script>`

## Usage

<div>
  <arabic-keyboard></arabic-keyboard>
</div>

## Attributes

`showEnglishValue` -> show transliterated english key
`showShiftedValue` -> show shifted value of key

| Attribute        | Default |
| ---------------- | :-----: |
| showEnglishValue |  false  |
| showShiftedValue |  false  |

## Usage With Attributes
<div>
  <arabic-keyboard showEnglishValue="true" showShiftedValue="true">
  </arabic-keyboard>
</div>

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
