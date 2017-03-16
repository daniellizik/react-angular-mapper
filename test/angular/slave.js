import angular from 'angular'
import mapper from 'angular-runtime-dependency-mapper'
import  { constants } from '~/src/containers/layout'

angular
  .module('app.block', [])
  .directive('appBlock', () => ({
    restrict: 'AE',
    template: `
      <p>blah</p>
    `
  }))

angular
  .module('app.header', [])
  .component('appHeader', {
    controllerAs: 'vm',
    bindings: {
      header: '@'
    },
    template: `
      <h1>{{vm.header || 'default header'}}</h1>
    `
  })

angular
  .module('app.table', [])
  .component('appTable', {
    controllerAs: 'vm',
    controller: function() {
      this.rows = ['dog', 'cat', 'fish', 'horse', 'dragon']
      this.activeRow = 0
      this.click = (i) => this.activeRow = i
    },
    template: `
      <div>
        <app-header header="blah"></app-header>
        <app-block></app-block>
        <table>
          <tbody>
            <tr 
              ng-style="{color: $index === vm.activeRow ? 'blue' : 'black'}"
              ng-click="vm.click($index)"
              style="cursor:pointer"
              ng-repeat="row in vm.rows">
              <td>
                {{$index}}
              </td>
              <td>{{row}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  })

angular
  .module('app', ['app.header', 'app.table', 'app.block'])
  .component('root', {
    template: `
      <div>
        <app-header></app-header>
        <app-table></app-table>
      </div>
    `
  })
  .run(() => {
    mapper(angular, ['app']).then(res => {
      const list = JSON.parse(JSON.stringify(res))
      window.addEventListener('message', ({data, origin}) => {
        if (data.type === constants.FETCH_LIST_INIT)
          return window.parent.postMessage({ list, type: constants.FETCH_LIST_SUCCESS }, window.location.origin)
      })
    })
  })

