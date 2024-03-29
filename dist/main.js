/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\nconst boardWidth = 10;\nconst container = document.querySelector('.container');\nconst startButton = document.querySelector('.welcome-button');\nlet vertical = true;\nlet dragged;\nconst regex = /ship(\\d)/;\nstartButton.addEventListener('click', () => {\n  clearWelcomeScreen();\n  createPregameScreen();\n});\nconst clearWelcomeScreen = () => {\n  let welcomeScreen = document.querySelector('.welcome-screen');\n  welcomeScreen.remove();\n};\nconst createPregameScreen = () => {\n  let gameContainer = document.createElement('div');\n  gameContainer.classList = 'game-container';\n  let helpText = document.createElement('div');\n  helpText.classList = 'help-text';\n  helpText.innerText = 'Place your ships on the board';\n  let shipsContainer = document.createElement('div');\n  shipsContainer.classList = 'ships-container';\n  for (let i = 1; i < 5; i++) {\n    let ship = document.createElement('div');\n    ship.classList.add('ship');\n    ship.classList.add('movable');\n    ship.setAttribute('id', `${i}`);\n    ship.style.height = `${i * 20}px`;\n    ship.style.width = '20px';\n    ship.draggable = true;\n    shipsContainer.appendChild(ship);\n  }\n  let rotateButton = document.createElement('button');\n  rotateButton.classList = 'rotate-button';\n  rotateButton.innerText = 'ROTATE';\n  let board = document.createElement('div');\n  board.classList = 'board';\n  board.setAttribute('id', 'playerBoard');\n  for (let i = 0; i < boardWidth * boardWidth; i++) {\n    let field = document.createElement('div');\n    field.classList = 'field';\n    field.setAttribute('id', `${i}`);\n    board.appendChild(field);\n  }\n  gameContainer.appendChild(helpText);\n  gameContainer.appendChild(shipsContainer);\n  gameContainer.appendChild(rotateButton);\n  gameContainer.appendChild(board);\n  container.appendChild(gameContainer);\n  startShipsPlacement();\n};\nconst startShipsPlacement = () => {\n  let fields = Array.from(document.querySelectorAll('.field'));\n  fields.forEach(field => field.addEventListener(\"dragover\", e => {\n    // prevent default to allow drop\n    e.preventDefault();\n  }, false));\n  fields.forEach(field => field.addEventListener('dragenter', e => {\n    findAndMark(e, fields);\n  }));\n  fields.forEach(field => field.addEventListener('dragleave', e => {\n    findAndMark(e, fields);\n  }));\n  fields.forEach(field => field.addEventListener('drop', e => {\n    e.preventDefault();\n    findAndMark(e, fields);\n    let correct = findAndMark(e, fields, true);\n    if (correct) {\n      dragged.remove();\n      placeShip(dragged.id);\n    }\n    // check initial ships if we can start next phase\n    let shipsToPlace = Array.from(document.querySelectorAll('.ships-container > .ship'));\n    if (!shipsToPlace.length) {\n      finishPreGame();\n    }\n  }));\n  let ships = Array.from(document.querySelectorAll('.ship'));\n  ships.forEach(ship => ship.addEventListener('drag', e => {\n    dragged = e.target;\n  }));\n  let rotateButton = document.querySelector('.rotate-button');\n  rotateButton.addEventListener('click', e => {\n    rotateShips();\n    // console.log('vertical '+vertical);\n  });\n};\n\nconst findAndMark = function (e, fields) {\n  let drop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  let fieldId = e.target.id;\n  let shipLength = dragged.id;\n  let markFields = [];\n  if (vertical) {\n    for (let i = 0; i < shipLength; i++) {\n      let nextFieldId = Number(fieldId) + 10 * i;\n      markFields.push(nextFieldId);\n    }\n  } else {\n    for (let i = 0; i < shipLength; i++) {\n      let nextFieldId = Number(fieldId) + 1 * i;\n      markFields.push(nextFieldId);\n    }\n  }\n  let correctPlacement = checkPlacement(markFields);\n  // console.log('correct placemenet here'+ correctPlacement)\n  if (!correctPlacement) {\n    return false;\n  }\n  markFields.forEach(markField => {\n    let field = fields[markField];\n    if (drop) {\n      field.classList.add('ship');\n      field.classList.add(`ship${shipLength}`);\n      field.classList.remove('movable');\n    } else {\n      field.classList.toggle('dragover');\n    }\n  });\n  return true;\n};\nconst rotateShips = () => {\n  let width;\n  let height;\n  let ships = Array.from(document.querySelectorAll('.ships-container > .ship'));\n  for (let i = 0; i < ships.length; i++) {\n    if (vertical) {\n      width = ships[i].id * 20;\n      ships[i].style.width = `${width}px`;\n      ships[i].style.height = '20px';\n      if (i + 1 == ships.length) {\n        vertical = false;\n      }\n    } else {\n      height = ships[i].id * 20;\n      ships[i].style.height = `${height}px`;\n      ships[i].style.width = '20px';\n      if (i + 1 == ships.length) {\n        vertical = true;\n      }\n    }\n  }\n};\nlet playerShips = [];\nlet computerShips = [];\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n    this.hit = () => {\n      this.hits += 1;\n    };\n    this.isSunk = () => {\n      return this.hits == this.length ? true : false;\n    };\n  }\n}\nconst placeShip = function (shipLength) {\n  let player = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  let ship = new Ship(shipLength);\n  if (player) {\n    playerShips.push(ship);\n  } else {\n    computerShips.push(ship);\n  }\n};\nconst checkPlacement = function (fieldsId) {\n  let player = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  if (!fieldsId.every(fieldId => fieldId < 100)) {\n    return false;\n  }\n  if (fieldsId[0] == 0) {\n    return true;\n  }\n  if (!vertical) {\n    // check for horizontal ships, if fieldId divided by 10 gives 0 in division remainder\n    // it means we're crossing the edge of board\n    let firstField = true;\n    for (let i = 0; i < fieldsId.length; i++) {\n      if (i == 0) {\n        firstField = false;\n        continue;\n      }\n      if (fieldsId[i] % 10 == 0 && !firstField) {\n        return false;\n      }\n    }\n  }\n  let board;\n  if (player) {\n    board = document.getElementById('playerBoard');\n  } else {\n    board = document.getElementById('computerBoard');\n  }\n  let fields = Array.from(board.querySelectorAll('.ship'));\n  if (!fields.length) {\n    return true;\n  } else {\n    let fieldNotBusy = true;\n    fieldsId.forEach(fieldId => {\n      if (fields.find(field => field.id == fieldId)) {\n        fieldNotBusy = false;\n      }\n    });\n    if (!fieldNotBusy) {\n      return false;\n    }\n  }\n  return true;\n};\nconst finishPreGame = () => {\n  let shipsContainer = document.querySelector('.ships-container');\n  let helpText = document.querySelector('.help-text');\n  let rotateButton = document.querySelector('.rotate-button');\n  shipsContainer.remove();\n  helpText.remove();\n  rotateButton.remove();\n  createComputerBoard();\n  createComputerShips();\n  placeComputerShips();\n  startGame();\n};\nconst createComputerBoard = () => {\n  let gameContainer = document.querySelector('.game-container');\n  let computerBoard = document.createElement('div');\n  computerBoard.classList = 'board';\n  computerBoard.setAttribute('id', 'computerBoard');\n  for (let i = 0; i < boardWidth * boardWidth; i++) {\n    let field = document.createElement('div');\n    field.classList = 'field';\n    field.setAttribute('id', `${i}`);\n    computerBoard.appendChild(field);\n  }\n  gameContainer.classList.add('orientation');\n  gameContainer.append(computerBoard);\n};\nconst createComputerShips = () => {\n  for (let i = 1; i < 5; i++) {\n    placeShip(i, false);\n  }\n};\nconst placeComputerShips = () => {\n  for (let i = 1; i < 5; i++) {\n    let randomVertical = Math.random() < 0.5;\n    let startField = Math.floor(Math.random() * 100);\n    console.log('startField: ' + startField + ' i: ' + i);\n    let shipCords = calcShipFields(startField, i, randomVertical);\n    shipCords.forEach(shipCord => {\n      let board = document.querySelector('#computerBoard');\n      let field = board.getElementsByTagName('div')[shipCord];\n      field.classList.add(`ship${i}`);\n    });\n  }\n};\nconst calcShipFields = (startField, i, vertical) => {\n  let fields = [];\n  if (vertical) {\n    for (let j = 0; j < i; j++) {\n      let nextFieldId = startField + 10 * j;\n      fields.push(nextFieldId);\n    }\n  } else {\n    for (let j = 0; j < i; j++) {\n      let nextFieldId = startField + 1 * j;\n      fields.push(nextFieldId);\n    }\n  }\n  let correctPlacement = checkPlacement(fields, false);\n  // console.log('correct placemenet '+ correctPlacement)\n  // console.log(fields);\n  if (!correctPlacement) {\n    let startField = Math.floor(Math.random() * 100);\n    fields = calcShipFields(startField, i, vertical);\n    return fields;\n  }\n  return fields;\n};\nconst startGame = () => {\n  const computerFields = Array.from(document.querySelectorAll('#computerBoard > .field'));\n  computerFields.forEach(computerField => {\n    computerField.addEventListener('mouseenter', e => {\n      if (!e.target.classList.contains('miss') && !e.target.classList.contains('hit')) {\n        e.target.classList.add('hover');\n      }\n    });\n    computerField.addEventListener('mouseleave', e => {\n      e.target.classList.remove('hover');\n    });\n    computerField.addEventListener('click', e => {\n      if (e.target.classList.contains('miss') || e.target.classList.contains('hit')) {\n        return;\n      }\n      e.target.classList.remove('hover');\n      playerHit(e, computerField);\n      computerHit();\n      if (computerShips.every(ship => ship.isSunk())) {\n        console.log('Player Won!');\n        showWinner('Player');\n      } else if (playerShips.every(ship => ship.isSunk())) {\n        console.log('Computer Won!');\n        showWinner('Computer');\n      }\n    });\n  });\n};\nconst playerHit = (e, computerField) => {\n  let hit = false;\n  for (let i = 0; i < e.target.classList.length; i++) {\n    if (regex.test(e.target.classList[i])) {\n      let shipId = e.target.classList[i].match(regex)[1];\n      hit = true;\n      computerShips.forEach(ship => {\n        if (ship.length == shipId) {\n          ship.hit();\n          console.log(ship.isSunk());\n        }\n      });\n    }\n  }\n  hit == true ? computerField.classList.add('hit') : computerField.classList.add('miss');\n};\nconst computerHit = () => {\n  let hit = false;\n  let playerFields = Array.from(document.querySelectorAll('#playerBoard > .field'));\n  let randomField = Math.floor(Math.random() * 100);\n  playerFields.forEach(playerField => {\n    if (playerField.id == randomField) {\n      if (playerField.classList.contains('miss')) {\n        computerHit();\n      } else if (playerField.classList.contains('hit')) {\n        computerHit();\n      } else {\n        for (let i = 0; i < playerField.classList.length; i++) {\n          if (regex.test(playerField.classList[i])) {\n            let shipId = playerField.classList[i].match(regex)[1];\n            hit = true;\n            playerShips.forEach(ship => {\n              if (ship.length == shipId) {\n                ship.hit();\n                console.log(ship.isSunk());\n              }\n            });\n          }\n        }\n        hit == true ? playerField.classList.add('hit') : playerField.classList.add('miss');\n      }\n    }\n  });\n};\nconst showWinner = winner => {\n  let gameContainer = document.querySelector('.game-container');\n  gameContainer.classList.remove('orientation');\n  while (gameContainer.firstChild) {\n    gameContainer.removeChild(gameContainer.lastChild);\n  }\n  let winnerMsg = document.createElement('div');\n  winnerMsg.classList = 'winnerMsg';\n  winnerMsg.innerText = `${winner} won!`;\n  let againButton = document.createElement('button');\n  againButton.classList = 'again-button';\n  againButton.innerText = 'Play again';\n  gameContainer.appendChild(winnerMsg);\n  gameContainer.appendChild(againButton);\n  againButton.addEventListener('click', () => {\n    gameContainer.remove();\n    createPregameScreen();\n  });\n};\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \":root {\\n    --background-color: #FFFFFF;\\n    --main-color: #00A7E1;\\n    --additional-color: #00171F;\\n}\\n\\n* {\\n\\tmargin: 0;\\n\\tpadding: 0;\\n    font-family: 'Golos Text', sans-serif;\\n}\\n\\nhtml,\\nbody {\\n  height: 100%;\\n}\\n\\n.header {\\n    display: flex;\\n    justify-content: center;\\n    margin-top: 1rem;\\n    padding-bottom: 1rem;\\n    border-bottom: 3px solid var(--additional-color);\\n    font-size: 4rem;\\n    font-weight: 600;\\n    color: var(--main-color);\\n}\\n\\n.container {\\n    height: 100%;\\n    display: flex;\\n    flex-direction: column;\\n}\\n\\n.welcome-button, .rotate-button, .again-button {\\n    color: var(--background-color);\\n    font-weight: 600;\\n    border: 3px solid var(--additional-color);\\n    background-color: var(--main-color);\\n    padding: 1rem 2rem;\\n    border-radius: 0.5rem;\\n    box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);\\n}\\n\\n.rotate-button {\\n    scale: 0.75;\\n}\\n\\n.welcome-button:hover, .rotate-button:hover, .again-button:hover{\\n    background-color: var(--additional-color);\\n    color: var(--main-color);\\n}\\n\\n.welcome-screen, .game-container{\\n    flex-grow: 1;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n}\\n\\n.game-container {\\n    flex-direction: column;\\n    justify-content: space-evenly;\\n}\\n\\n.orientation  {\\n    flex-direction: row;\\n}\\n\\n@media (max-width: 55em) {\\n    .orientation {\\n        flex-direction: column;\\n    }  \\n}\\n\\n.help-text {\\n    font-size: 1.25rem;\\n    text-decoration: underline;\\n    text-decoration-color: var(--main-color)\\n}\\n\\n.ships-container {\\n    width: 300px;\\n    height: 100px;\\n    border: 3px solid var(--additional-color);\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-evenly;\\n    align-items: center;\\n}\\n\\n.ship {\\n    background-color: var(--main-color);\\n}\\n\\n.movable {\\n    cursor: move;\\n}\\n\\n\\n.board {\\n    display: flex;\\n    flex-wrap: wrap;\\n    width: 200px;\\n    height: 200px;\\n    border: 2px solid var(--additional-color);\\n}\\n\\n.field {\\n    width: 20px;\\n    height: 20px;\\n    box-sizing: border-box;\\n    border: 1px solid #00171F;\\n}\\n\\n.dragover {\\n    background-color: var(--main-color);\\n    opacity: 25%;\\n}\\n\\n.miss {\\n    background-color: grey;\\n    opacity: 50%;\\n}\\n\\n.hit {\\n    background-color: red;\\n    opacity: 50%;\\n}\\n\\n.winnerMsg {\\n    font-size: 4rem;\\n    font-weight: 600;\\n    color: var(--main-color);\\n}\\n\\n.hover {\\n    background-color: grey;\\n    opacity: 25%;\\n}\\n\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;