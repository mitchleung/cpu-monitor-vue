# cpu-monitor-vue
This CPU monitor has been reconstructed with [VueJS 3](https://vuejs.org/) and [TailwindCSS](https://tailwindcss.com/) but it still requires [CPU Monitor Express Server](https://github.com/mitchleung/cpu-monitor-express-webapp) to run on your machine in order to display CPU loading and temperature.

Now you can adjust some of the settings with CPU monitor's Settings page, 
- protocol, default to http,
- hostname, e.g. IP address of your local machine,
- api port number, default using 3000 as CPU Monitor Express Server,
- api path, default path is /api/all and should be the same as CPU Monitor Express Server,
- refresh rate (in milliseconds), default to 1000

If you run CPU Monitor on any cloud services other than your local machine, you would want to change the hostname to point it back your machine's IP address. Otherwise, the hostname should be whatever hostname getting from URL.
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
