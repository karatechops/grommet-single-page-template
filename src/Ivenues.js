// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import App from 'grommet/components/App';

class Ivenues extends React.Component {
  render() {
    return (
      <App className="i-venues" centered={false}>
        {this.props.children}
      </App>
    );
  }
}

export default Ivenues;
