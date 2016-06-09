// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';

const HomeSection = React.createClass({
  render: function () {
    return (
      <Section {...this.props}
        appCentered={true} justify="center" align="center" full={true}
        textCentered={true} pad={{vertical: "large"}}>
        {this.props.children}
      </Section>
    );
  }
});

const Home = React.createClass({
  contextTypes: {
    routePrefix: React.PropTypes.string.isRequired
  },

  _onClick: function () {
    // no-op
  },

  render: function() {
    return (
      <Article className="home" scrollStep={true} controls={true}>

        <HomeSection primary={true}>
          <Headline size="large">Grommet</Headline>
          <Headline size="small">The most advanced open source UX framework for
            enterprise applications.</Headline>
        </HomeSection>

        <HomeSection>
          <Headline size="large">Grommet</Headline>
          <Headline size="small">The most advanced open source UX framework for
            enterprise applications.</Headline>
        </HomeSection>

      </Article>
    );
  }

});

export default Home;
