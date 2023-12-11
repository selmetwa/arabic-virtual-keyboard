import { crypt, checkPreviousLetter } from "../../utils/index.js";
import {
  desktop_button_groups,
  mobile_button_groups,
} from "../../constants/button_groups.js";

function removeSpecialCharacterActiveState(shadowRoot) {
  const keys = ["-", "y--", "w--", "a--", "Y--", "W--", "A--"];
  keys.forEach((key) => {
    const cryptedClassname = crypt("salt", key);
    const target = `.button_${cryptedClassname}`;
    const keysPressed = shadowRoot.querySelectorAll(target);
    const nodes = Array.from(keysPressed);

    nodes.forEach((node) => {
      node && node.classList.remove("active");
    });
  });
}

function removeDiacriticActiveState(shadowRoot) {
  const keys = [
    "=",
    "a=",
    "an=",
    "u=",
    "un=",
    "i=",
    "in=",
    "h=",
    "s=",
    "A=",
    "AN=",
    "U=",
    "UN=",
    "I=",
    "IN=",
    "H=",
    "S=",
  ];
  keys.forEach((key) => {
    const cryptedClassname = crypt("salt", key);
    const target = `.button_${cryptedClassname}`;
    const keysPressed = shadowRoot.querySelectorAll(target);
    const nodes = Array.from(keysPressed);

    nodes.forEach((node) => {
      node && node.classList.remove("active");
    });
  });
}

export const RemoveActiveClassFactory = (
  event,
  state,
  isMobile,
  shadowRoot,
  handleToggleButtonGroups,
  handleRemoveActiveState
) => {
  let key;
  if (event.key === "'") {
    const previousLetter = checkPreviousLetter(
      state.textValue,
      state.cursorPosition
    );
    if (["d'", "g'", "s'", "t'", "h'", "H'"].includes(previousLetter)) {
      const nodeToRemoveActiveState =
        shadowRoot.querySelector(".button_2d");
      if (nodeToRemoveActiveState) {
        nodeToRemoveActiveState.classList.remove("active");
      }
      key = previousLetter;
    } else {
      key = event.key;
    }
  } else if (event.key === "=") {
    return removeDiacriticActiveState(shadowRoot);
  } else if (event.key === "-") {
    return removeSpecialCharacterActiveState(shadowRoot);
  } else if (event.key === "Meta") {
    key = "meta";
  } else if (event.code === "Space") {
    key = "space";
  } else {
    key = event.key;
  }

  handleRemoveActiveState(key);

  if (["CapsLock", "Shift"].includes(key)) {
    if (isMobile) {
      handleToggleButtonGroups(mobile_button_groups);
      return;
    }
    handleToggleButtonGroups(desktop_button_groups);
  }
};