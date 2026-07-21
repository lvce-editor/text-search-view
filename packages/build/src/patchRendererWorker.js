export const patchRendererWorker = (content, remoteUrl = '', useRemoteUrl = true) => {
  let newContent = content

  newContent = newContent.replaceAll('http://localhost:3001/tests/', '/tests/')

  if (useRemoteUrl && remoteUrl && !newContent.includes('// const textSearchWorkerUrl = ')) {
    const occurrence = `const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-view/dist/textsearchViewMain.js\``
    const replacement = `// const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-view/dist/textsearchViewMain.js\`
const textSearchWorkerUrl = \`${remoteUrl}\``

    newContent = newContent.replace(occurrence, replacement)
  }

  if (!useRemoteUrl && remoteUrl && newContent.includes('// const textSearchWorkerUrl = ')) {
    const occurrence = `// const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-view/dist/textsearchViewMain.js\`
const textSearchWorkerUrl = \`${remoteUrl}\``
    const replacement = `const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-view/dist/textsearchViewMain.js\``
    newContent = newContent.replace(occurrence, replacement)
  }

  const brokenSideBarSnippet = `  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {
    const actionsDomIndex = commands.findIndex(command => command[2] === 'setActionsDom');
    if (actionsDomIndex) {
      actionsDom = commands[actionsDomIndex][3];
      commands.splice(actionsDomIndex, 1);
    }
    const eventsIndex = commands.findIndex(command => command[0] === 'Viewlet.registerEventListeners');
    const events = commands[eventsIndex][2];
    actionsUid = create$14();
    commands.push(['Viewlet.createFunctionalRoot', moduleId, actionsUid, true], ['Viewlet.registerEventListeners', actionsUid, events], ['Viewlet.setDom2', actionsUid, actionsDom], ['Viewlet.setUid', actionsUid, childUid]);`

  const partiallyFixedSideBarSnippet = `  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {
    const actionsDomIndex = commands.findIndex(command => command[2] === 'setActionsDom');
    if (actionsDomIndex !== -1) {
      actionsDom = commands[actionsDomIndex][3];
      commands.splice(actionsDomIndex, 1);
    }
    const eventsIndex = commands.findIndex(command => command[0] === 'Viewlet.registerEventListeners');
    const events = eventsIndex === -1 ? [] : commands[eventsIndex][2];
    actionsUid = create$14();
    commands.push(['Viewlet.createFunctionalRoot', moduleId, actionsUid, true], ['Viewlet.registerEventListeners', actionsUid, events], ['Viewlet.setDom2', actionsUid, actionsDom], ['Viewlet.setUid', actionsUid, childUid]);`

  const safeSideBarSnippet = `  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {`

  if (newContent.includes(brokenSideBarSnippet)) {
    newContent = newContent.replace(brokenSideBarSnippet, safeSideBarSnippet)
  }

  if (newContent.includes(partiallyFixedSideBarSnippet)) {
    newContent = newContent.replace(partiallyFixedSideBarSnippet, safeSideBarSnippet)
  }

  const missingActionsUidSnippet = `  }, false, true);
  if (state.currentViewletRequestId !== requestId || state.currentViewletId !== moduleId) {`
  const fixedActionsUidSnippet = `  }, false, true);
  let actionsUid = -1;
  if (state.currentViewletRequestId !== requestId || state.currentViewletId !== moduleId) {`
  const existingActionsUidSnippet = `  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {`

  if (
    newContent.includes(missingActionsUidSnippet) &&
    !newContent.includes(fixedActionsUidSnippet) &&
    !newContent.includes(existingActionsUidSnippet)
  ) {
    newContent = newContent.replace(missingActionsUidSnippet, fixedActionsUidSnippet)
  }

  const duplicateActionsUidSnippet = `  let actionsUid = -1;
  if (state.currentViewletRequestId !== requestId || state.currentViewletId !== moduleId) {
    disposeFunctional(childUid);
    await savePromise;
    return state;
  }
  let actionsUid = -1;
  if (commands) {`
  const singleActionsUidSnippet = `  let actionsUid = -1;
  if (state.currentViewletRequestId !== requestId || state.currentViewletId !== moduleId) {
    disposeFunctional(childUid);
    await savePromise;
    return state;
  }
  if (commands) {`

  if (newContent.includes(duplicateActionsUidSnippet)) {
    newContent = newContent.replace(duplicateActionsUidSnippet, singleActionsUidSnippet)
  }

  const duplicateActionsUidWithActionsDomSnippet = `  let actionsUid = -1;
  if (state.currentViewletRequestId !== requestId || state.currentViewletId !== moduleId) {
    disposeFunctional(childUid);
    await savePromise;
    return state;
  }
  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {`
  const singleActionsUidWithActionsDomSnippet = `  let actionsUid = -1;
  if (state.currentViewletRequestId !== requestId || state.currentViewletId !== moduleId) {
    disposeFunctional(childUid);
    await savePromise;
    return state;
  }
  let actionsDom = [];
  if (commands) {`

  if (newContent.includes(duplicateActionsUidWithActionsDomSnippet)) {
    newContent = newContent.replace(duplicateActionsUidWithActionsDomSnippet, singleActionsUidWithActionsDomSnippet)
  }

  const openViewletSnippet = `const openViewlet$1 = async (state, moduleId, focus = false, args) => {
  await execute$3('Layout.openSideBarViewlet', moduleId);
  return state;
};`
  const openViewletSearchSnippet = `const openViewlet$1 = async (state, moduleId, focus = false, args) => {
  await execute$3('Layout.openSideBarViewlet', moduleId);
  if (moduleId === Search) {
    await loadModule(load$3, moduleId);
  }
  return state;
};`

  if (newContent.includes(openViewletSnippet)) {
    newContent = newContent.replace(openViewletSnippet, openViewletSearchSnippet)
  }

  const commandInitializerSnippet = `const initializeModule = module => {
  if (module.Commands) {
    for (const [key, value] of Object.entries(module.Commands)) {`
  const asyncCommandInitializerSnippet = `const initializeModule = async module => {
  if (module.Commands) {
    const commands = module.getCommands && Object.keys(module.Commands).length === 0 ? await module.getCommands() : module.Commands;
    for (const [key, value] of Object.entries(commands)) {`
  newContent = newContent.replace(commandInitializerSnippet, asyncCommandInitializerSnippet)

  newContent = newContent.replace(
    `    const module = await state.load(moduleId);
    initializeModule(module);`,
    `    const module = await state.load(moduleId);
    await initializeModule(module);`,
  )
  newContent = newContent.replace(
    `    const module = await state$A.load(moduleId);
    initializeModule(module);`,
    `    const module = await state$A.load(moduleId);
    await initializeModule(module);`,
  )

  const getSearchModuleIdSnippet = `    case 'Search':
      return Search;
    case 'SearchProcess':
      return SearchProcess;`
  const getSearchProcessModuleIdSnippet = `    case 'SearchProcess':
      return SearchProcess;`

  if (newContent.includes(getSearchModuleIdSnippet)) {
    newContent = newContent.replace(getSearchModuleIdSnippet, getSearchProcessModuleIdSnippet)
  }

  const loadSearchModuleSnippet = `    case Search:
      return Promise.resolve().then(function () { return ViewletSearch_ipc; });
    case SearchProcess:
      return Promise.resolve().then(function () { return SearchProcess_ipc; });`
  const loadSearchProcessModuleSnippet = `    case SearchProcess:
      return Promise.resolve().then(function () { return SearchProcess_ipc; });`

  if (newContent.includes(loadSearchModuleSnippet)) {
    newContent = newContent.replace(loadSearchModuleSnippet, loadSearchProcessModuleSnippet)
  }

  const searchCommandLoadSnippet = `  if (getPrefix(command) === Search) {
    await loadModule(load$3, Search);
    return;
  }`

  if (!newContent.includes(searchCommandLoadSnippet)) {
    newContent = newContent.replace(
      `  await getOrLoadModule(ModuleMap.getModuleId(command));`,
      `${searchCommandLoadSnippet}
  await getOrLoadModule(ModuleMap.getModuleId(command));`,
    )
    newContent = newContent.replace(
      `  await getOrLoadModule(getModuleId$2(command));`,
      `${searchCommandLoadSnippet}
  await getOrLoadModule(getModuleId$2(command));`,
    )
  }

  while (
    newContent.includes(`${searchCommandLoadSnippet}
${searchCommandLoadSnippet}`)
  ) {
    newContent = newContent.replace(
      `${searchCommandLoadSnippet}
${searchCommandLoadSnippet}`,
      searchCommandLoadSnippet,
    )
  }

  return newContent
}
