console.log = data => process.stdout.write(data)

global.window = {
  SERVER_SIDE_RENDERING: true,
  setTimeout: setTimeout,
  document: { body: {}, addEventListener: () => {}, location: {search: {}}, cookie: {} },
  location: { href: '', pathname: ' ', hostname: '' },
  localStorage: { getItem: () => {}, setItem: () => {} },
  sessionStorage: { getItem: () => {}, setItem: () => {} },
}