  // switch to keydown event
  // handleKeyChange(event) {
  //   const inputType = event.inputType;

  //   // Handle Delete
  //   if (inputType === "deleteContentBackward") {
  //     if (!!this.selectedText) {
  //       return this.updateState({
  //         textValue: deleteSelectedText(this.textValue, this.selectedText),
  //         selectedText: "",
  //       });
  //     }

  //     const { newText, cursorPosition } = handleDeleteText(this.textarea);
  //     return this.updateState({
  //       textValue: newText,
  //       cursorPosition,
  //     });
  //   }

  //   // Handle Insertion
  //   // TODO: Handle Pasting [x]
  //   // TODO: handle inserting at cursor position [x]
  //   // TODO: replace selected text [x]
  //   // TODO: replace selected text with pasted text []
  //   if (inputType === "insertText") {
  //     const inputCharacter = event.data;
  //     const cursorPosition = this.textarea.selectionStart;
  //     let _textValue = this.textValue;
  //     if (!!this.selectedText) {
  //       _textValue = deleteSelectedText(this.textValue, this.selectedText);
  //     }
  //     if (isNumber(inputCharacter)) {
  //       const { newText, newCursorPosition } = numberFactory(inputCharacter, _textValue, cursorPosition);
  //       return this.updateState({
  //         textValue: newText,
  //         cursorPosition: newCursorPosition,
  //       });
  //     }

  //     if (isLetter(inputCharacter)) {
  //       // Handle Letters with no 1-1 english equivalent
  //       if (inputCharacter === "'") {
  //         return this.updateState({
  //           textValue: specialLetterFactory(this.textValue),
  //         });
  //       }

  //       return this.updateState({
  //         textValue: this.textValue += letterFactory(inputCharacter),
  //       });
  //     }
  //   }
  // }


  handleClick(event) {
    const eventObject = event.target.value;
    const buttonType = eventObject && eventObject.split("_")[0];
    const buttonValue = eventObject && eventObject.split("_")[1];

    if (buttonType === "number") {
      return this.updateState({
        textValue: (this.textValue += numberFactory(buttonValue)),
      });
    }

    if (buttonType === "alphabet") {
      return this.updateState({
        textValue: (this.textValue += letterFactory(buttonValue)),
      });
    }
  }


  if (key === "Backspace") {
    if (!!this.selectedText) {
      return this.updateState({
        textValue: deleteSelectedText(_textValue, this.selectedText),
        selectedText: "",
      });
    }

    const { newText, newCursorPosition } = handleDeleteText(this.textarea);
    return this.updateState({
      textValue: newText,
      cursorPosition: newCursorPosition,
      previousKey: key,
    });
  }