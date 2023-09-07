import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormArray,
} from '@angular/forms';

/**
 * Marks all the controls and their nested controls as dirty.
 * @param abstractControls - an array of controls(can be FormControls, FormGroups or FormArrays)
 */
export function markAllControlsAsDirty(
  abstractControls: AbstractControl[]
): void {
  abstractControls.forEach((abstractControl) => {
    if (abstractControl instanceof FormControl) {
      (abstractControl as FormControl).markAsDirty({ onlySelf: true });
      (abstractControl as FormControl).markAsTouched({ onlySelf: true });
      (abstractControl as FormControl).updateValueAndValidity({
        onlySelf: true,
      });
    } else if (abstractControl instanceof FormGroup) {
      markAllControlsAsDirty(
        Object.values((abstractControl as FormGroup).controls)
      );
    } else if (abstractControl instanceof FormArray) {
      markAllControlsAsDirty((abstractControl as FormArray).controls);
    }
  });
}
