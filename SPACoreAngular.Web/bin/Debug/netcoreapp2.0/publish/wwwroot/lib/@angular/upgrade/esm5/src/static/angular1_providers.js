/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// We have to do a little dance to get the ng1 injector into the module injector.
// We store the ng1 injector so that the provider in the module injector can access it
// Then we "get" the ng1 injector from the module injector, which triggers the provider to read
// the stored injector and release the reference to it.
var tempInjectorRef;
export function setTempInjectorRef(injector) {
    tempInjectorRef = injector;
}
export function injectorFactory() {
    if (!tempInjectorRef) {
        throw new Error('Trying to get the AngularJS injector before it being set.');
    }
    var injector = tempInjectorRef;
    tempInjectorRef = null; // clear the value to prevent memory leaks
    return injector;
}
export function rootScopeFactory(i) {
    return i.get('$rootScope');
}
export function compileFactory(i) {
    return i.get('$compile');
}
export function parseFactory(i) {
    return i.get('$parse');
}
export var angular1Providers = [
    // We must use exported named functions for the ng2 factories to keep the compiler happy:
    // > Metadata collected contains an error that will be reported at runtime:
    // >   Function calls are not supported.
    // >   Consider replacing the function or lambda with a reference to an exported function
    { provide: '$injector', useFactory: injectorFactory, deps: [] },
    { provide: '$rootScope', useFactory: rootScopeFactory, deps: ['$injector'] },
    { provide: '$compile', useFactory: compileFactory, deps: ['$injector'] },
    { provide: '$parse', useFactory: parseFactory, deps: ['$injector'] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjFfcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdXBncmFkZS9zcmMvc3RhdGljL2FuZ3VsYXIxX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQWNBLElBQUksZUFBOEMsQ0FBQztBQUNuRCxNQUFNLDZCQUE2QixRQUFrQztJQUNuRSxlQUFlLEdBQUcsUUFBUSxDQUFDO0NBQzVCO0FBQ0QsTUFBTTtJQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7S0FDOUU7SUFFRCxJQUFNLFFBQVEsR0FBa0MsZUFBZSxDQUFDO0lBQ2hFLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQztDQUNqQjtBQUVELE1BQU0sMkJBQTJCLENBQTJCO0lBQzFELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0NBQzVCO0FBRUQsTUFBTSx5QkFBeUIsQ0FBMkI7SUFDeEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDMUI7QUFFRCxNQUFNLHVCQUF1QixDQUEyQjtJQUN0RCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUN4QjtBQUVELE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHOzs7OztJQUsvQixFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0lBQzdELEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUM7SUFDMUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUM7SUFDdEUsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUM7Q0FDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICcuLi9jb21tb24vYW5ndWxhcjEnO1xuXG4vLyBXZSBoYXZlIHRvIGRvIGEgbGl0dGxlIGRhbmNlIHRvIGdldCB0aGUgbmcxIGluamVjdG9yIGludG8gdGhlIG1vZHVsZSBpbmplY3Rvci5cbi8vIFdlIHN0b3JlIHRoZSBuZzEgaW5qZWN0b3Igc28gdGhhdCB0aGUgcHJvdmlkZXIgaW4gdGhlIG1vZHVsZSBpbmplY3RvciBjYW4gYWNjZXNzIGl0XG4vLyBUaGVuIHdlIFwiZ2V0XCIgdGhlIG5nMSBpbmplY3RvciBmcm9tIHRoZSBtb2R1bGUgaW5qZWN0b3IsIHdoaWNoIHRyaWdnZXJzIHRoZSBwcm92aWRlciB0byByZWFkXG4vLyB0aGUgc3RvcmVkIGluamVjdG9yIGFuZCByZWxlYXNlIHRoZSByZWZlcmVuY2UgdG8gaXQuXG5sZXQgdGVtcEluamVjdG9yUmVmOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2V8bnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRUZW1wSW5qZWN0b3JSZWYoaW5qZWN0b3I6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZSkge1xuICB0ZW1wSW5qZWN0b3JSZWYgPSBpbmplY3Rvcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RvckZhY3RvcnkoKSB7XG4gIGlmICghdGVtcEluamVjdG9yUmVmKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gZ2V0IHRoZSBBbmd1bGFySlMgaW5qZWN0b3IgYmVmb3JlIGl0IGJlaW5nIHNldC4nKTtcbiAgfVxuXG4gIGNvbnN0IGluamVjdG9yOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2V8bnVsbCA9IHRlbXBJbmplY3RvclJlZjtcbiAgdGVtcEluamVjdG9yUmVmID0gbnVsbDsgIC8vIGNsZWFyIHRoZSB2YWx1ZSB0byBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuICByZXR1cm4gaW5qZWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb290U2NvcGVGYWN0b3J5KGk6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZSkge1xuICByZXR1cm4gaS5nZXQoJyRyb290U2NvcGUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVGYWN0b3J5KGk6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZSkge1xuICByZXR1cm4gaS5nZXQoJyRjb21waWxlJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY3RvcnkoaTogYW5ndWxhci5JSW5qZWN0b3JTZXJ2aWNlKSB7XG4gIHJldHVybiBpLmdldCgnJHBhcnNlJyk7XG59XG5cbmV4cG9ydCBjb25zdCBhbmd1bGFyMVByb3ZpZGVycyA9IFtcbiAgLy8gV2UgbXVzdCB1c2UgZXhwb3J0ZWQgbmFtZWQgZnVuY3Rpb25zIGZvciB0aGUgbmcyIGZhY3RvcmllcyB0byBrZWVwIHRoZSBjb21waWxlciBoYXBweTpcbiAgLy8gPiBNZXRhZGF0YSBjb2xsZWN0ZWQgY29udGFpbnMgYW4gZXJyb3IgdGhhdCB3aWxsIGJlIHJlcG9ydGVkIGF0IHJ1bnRpbWU6XG4gIC8vID4gICBGdW5jdGlvbiBjYWxscyBhcmUgbm90IHN1cHBvcnRlZC5cbiAgLy8gPiAgIENvbnNpZGVyIHJlcGxhY2luZyB0aGUgZnVuY3Rpb24gb3IgbGFtYmRhIHdpdGggYSByZWZlcmVuY2UgdG8gYW4gZXhwb3J0ZWQgZnVuY3Rpb25cbiAge3Byb3ZpZGU6ICckaW5qZWN0b3InLCB1c2VGYWN0b3J5OiBpbmplY3RvckZhY3RvcnksIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6ICckcm9vdFNjb3BlJywgdXNlRmFjdG9yeTogcm9vdFNjb3BlRmFjdG9yeSwgZGVwczogWyckaW5qZWN0b3InXX0sXG4gIHtwcm92aWRlOiAnJGNvbXBpbGUnLCB1c2VGYWN0b3J5OiBjb21waWxlRmFjdG9yeSwgZGVwczogWyckaW5qZWN0b3InXX0sXG4gIHtwcm92aWRlOiAnJHBhcnNlJywgdXNlRmFjdG9yeTogcGFyc2VGYWN0b3J5LCBkZXBzOiBbJyRpbmplY3RvciddfVxuXTtcbiJdfQ==