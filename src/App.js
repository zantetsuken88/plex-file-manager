import React from 'react';
import './App.css';
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';

const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `http://localhost:3020` // Or you local Server Node V1 installation.
}

function App() {
  return (
    <div className="App">
      <header>
        <p>PontyPlex - File Manager</p>
      </header>
      <body>
        <div style={{ height: '480px' }}>
          <FileManager>
            <FileNavigator
              id="filemanager-1"
              api={connectorNodeV1.api}
              apiOptions={apiOptions}
              capabilities={connectorNodeV1.capabilities}
              listViewLayout={connectorNodeV1.listViewLayout}
              viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
            />
          </FileManager>
        </div>
      </body>
    </div>
  );
}

export default App;
