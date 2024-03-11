## Steps to reproduce
1. Create at least one photo album on the device or simulator
2. Run the project and grant permission
3. Press "Delete" in one of the album rows
4. Press "Delete" in the native alert asking to confirm album deletion:
<img width="314" alt="image" src="https://github.com/stevengoldberg/expo-media-library-delete-bug/assets/2230992/3bad82c0-3b0d-4ca5-ba2d-6521f4f8e76b">

**Expected behavior**:
The promise will resolve `true` and the album will be deleted without deleting its assets.

**Actual behavior**:
A second native alert is triggered asking to confirm asset deletion:

<img width="320" alt="image" src="https://github.com/stevengoldberg/expo-media-library-delete-bug/assets/2230992/02073762-68aa-4573-9405-fc3a437dc2d3">
