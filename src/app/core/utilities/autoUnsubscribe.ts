export function AutoUnsubscribe() {
  return function (constructor: any) {
    const orig = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (const prop in this) {
        const property = this[prop];

        if (typeof property?.subscribe === 'function') {
          property.unsubscribe();
        }
      }

      orig?.apply();
    };
  };
}

// export function AutoUnsubscribe(constructor: any) {
//   const original = constructor.prototype.ngOnDestroy;

//   constructor.prototype.ngOnDestroy = function () {
//     for (const prop in this) {
//       const property = this[prop];
//       if (property && typeof property.unsubscribe === 'function') {
//         property.unsubscribe();
//       }
//     }
//     original?.apply(this, arguments);
//   };
// }
