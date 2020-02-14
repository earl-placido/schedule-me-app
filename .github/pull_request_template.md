# Checklist


### General

- [ ] Does the code work?
- [ ] Is the code easily understood?
- [ ] No redundant or duplicate code
- [ ] Is the code as modular as possible?
- [ ] Can any global variables be replaced?
- [ ] No commented out code
- [ ] Do loops have a set length and correct termination conditions?
- [ ] Code cannot be replaced with library functions
- [ ] Can any logging or debugging code be removed?

### Security

- [ ] Are all data inputs checked (for the correct type, length, format, and range) and encoded?
- [ ] Where third-party utilities are used, are returning errors being caught?
- [ ] Are output values checked and encoded?
- [ ] Are invalid parameter values handled?


### Documentation

- [ ] Do comments focus on intent rather than on behaviour?
- [ ] No out-of-date comments
- [ ] Is any unusual behavior or edge-case handling described?
- [ ] Is there any incomplete code? If so, should it be removed or flagged with a suitable marker like ‘TODO’?
- [ ] Is the use and function of third-party libraries documented?
- [ ] Is the architecture documentation up-to-date?

### Testing

- [ ] Is the code testable? i.e. don’t add too many or hide dependencies, unable to initialize objects, test frameworks can use methods etc.
- [ ] Do tests exist and are they comprehensive?
- [ ] Do unit tests actually test that the code is performing the intended functionality?
- [ ] Could any test code be replaced with the use of an existing API?
