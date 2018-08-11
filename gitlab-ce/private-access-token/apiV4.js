
const got = require('got');
const config = require('./config');

console.log('Using config: ' + JSON.stringify(config, null, 2));

const printResponse = (resp) => {
  console.log(JSON.stringify(JSON.parse(resp.body), null, 2));
}

const getUser = async () => {
  console.log('User: ');

  const url = config.baseUrl + '/users?username=' + config.username
  const user = await got(url, {
    headers: {
      'Private-Token': config.accessToken
    }
  });

  printResponse(user);
}

const listUserProjects = async () => {
  console.log('List of projects: ');

  const url = config.baseUrl + '/users/' + config.userId + '/projects'
  const projects = await got(url, {
    headers: {
      'Private-Token': config.accessToken
    }
  });

  printResponse(projects);
}

const listMergeRequests = async () => {
  console.log('List of merge requests: ');

  const url = config.baseUrl + '/projects/' + config.projectId + '/merge_requests'
  const mergeRequests = await got(url, {
    headers: {
      'Private-Token': config.accessToken
    }
  });

  printResponse(mergeRequests);
}

const main = async () => {
  if (process.argv[2] === 'list-projects') {
    await listUserProjects();
  } else if (process.argv[2] === 'get-user') {
    await getUser();
  } else if (process.argv[2] === 'list-mr') {
    await listMergeRequests();
  } else {
    throw new Error('You must provide a command');
  }
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})();