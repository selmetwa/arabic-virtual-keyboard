/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
export function when(condition, trueCase, falseCase) {
    return condition ? trueCase() : falseCase?.();
}
//# sourceMappingURL=when.js.map