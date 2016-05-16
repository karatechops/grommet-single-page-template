// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var Headline = require('grommet/components/Headline');

var HomeSection = React.createClass({
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

var Home = React.createClass({

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

module.exports = Home;
