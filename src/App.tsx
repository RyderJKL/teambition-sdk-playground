import React from 'react';
import logo from './logo.svg';
import './App.css';
// import 'teambition-sdk/apis/task';
import { SDK } from 'teambition-sdk';
import {ProjectId, TaskId} from 'teambition-types';
import { of } from 'rxjs/observable/of'
import { useObservable } from 'rxjs-hooks';

function App() {
  const sdk = new SDK();

  const task = sdk.getTask('5ce399269705060001f15011' as TaskId)
      .values()
      .catch((error) => {
        console.error(error);
        return of("任务出错了")
      })
      .publishReplay(1)
      .refCount()

  const subTask = sdk.getTask('5f5dd60fda062b0044f8c54a' as TaskId)
      .values()
      .catch((error) => {
          console.error(error);
          return of("子任务出错了")
      })
      .publishReplay(1)
      .refCount();

  const project = sdk.getProject('5ce39925dd03e00018cd6c20' as ProjectId).values()
      .catch(error => {
          console.error(error);
          return of('任务出错了')
      })
      .publishReplay(1)
      .refCount();

  project.subscribe(() => console.log('Project'))
  task.subscribe(() => console.log('get task'));
  subTask.subscribe(() => console.log('get sub task'));

  // sdk.updateTask('5ce39925dd03e00018cd6c20')
  // project.subscribe();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
