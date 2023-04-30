Changes needed

package.json
Change this:
```json
"peerDependencies": {
  "react": "^16.0.0 || ^17.0.0 || ^18.0.0",
  "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0"
},
```
to this:
```json
"peerDependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
},
```
and change these dependencies:
```json
"react": "^17.0.2",
"react-dom": "^17.0.2",
```
to
```json
"react": "^18.2.0",
"react-dom": "^18.2.0",
```