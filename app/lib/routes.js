Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
    name: 'home',
    controller: 'HomeController',
    action: 'action',
    where: 'client'
});

Router.route('/node/:nodeId', {
    name: 'nodes',
    controller: 'NodeController',
    action: 'action',
    where: 'client'
});
