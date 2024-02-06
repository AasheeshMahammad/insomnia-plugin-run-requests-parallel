![example event parameter](https://github.com/AasheeshMahammad/insomnia-plugin-run-requests-parallel/actions/workflows/node.js.yml/badge.svg?event=push)
![example event parameter](https://github.com/AasheeshMahammad/insomnia-plugin-run-requests-parallel/actions/workflows/npm-publish.yml/badge.svg)

[![Version](https://img.shields.io/badge/npmjs-1.5.0-red)](https://www.npmjs.com/package/insomnia-plugin-run-requests-parallel)
[![Version](https://img.shields.io/badge/Insomnia_Plugin_Hub-1.5.0-purple)](https://insomnia.rest/plugins/insomnia-plugin-run-requests-parallel)

You can **install it directly** from the [Insomnia Plugin Hub](https://insomnia.rest/plugins/insomnia-plugin-run-requests-parallel).

# Insomnia plugin: Run requests in Parallel

<img src="/assets/icon.png" width="200" height="200">

Insomnia plugin that provides the action 'Run All Requests' on a folder that contains requests in a Parallel manner.

This allows you to easily run all requests in a given folder in sequential or parallel, and see the results (http response code, response time, etc) in a list with a single click.

In addition, the plugin validates the response code of each request, and displays a warning if any of the request results do not match the expected response code.
To configure the expected response code, add the response code to the request name in brackets, e.g. `Get User [200]`, if no response code is mentioned `200` is default.
If the response code of the request does not match the expected response code from the name, the request will be marked with 'Failed' in the list.

## Action on request folder

![Action on the folder](/assets/action-on-folder.png)

## 'Run All Requests' Overview / Result / Validation Modal

![List of requests to run](/assets/overview-result-request-list.png)

## Plugin Installation

Go to `Application -> Preferences -> Plugins` and enter `insomnia-plugin-run-requests-parallel` in the `npm package name` field and click on the button `Install Plugin`.

This will download and install the plugin. After installation, you will see the plugin in the list of installed plugins
and the action "Run All Requests" will be available in the context menu of a folder, no restart required.
[(download here)](https://github.com/AasheeshMahammad/insomnia-plugin-run-requests-parallel/releases/latest)

![Installation](/assets/installation.png)
