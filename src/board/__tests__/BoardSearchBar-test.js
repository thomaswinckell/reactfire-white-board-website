import React                                from 'react';
import chai                                 from 'chai';
import {createRenderer}                     from 'react-addons-test-utils';
import SkinDeep                             from 'skin-deep';
import sinon                                from 'sinon';
import sinonChai                            from 'sinon-chai';

import * as Actions                         from '../BoardManagerActions';

import BoardSearchBar                       from '../BoardSearchBar';

const { expect } = chai;

chai.should();
chai.use(sinonChai);

describe('Board Search Bar', () => {

  let vdom, instance, tree;

  beforeEach( () => {

      tree      = SkinDeep.shallowRender(<BoardSearchBar/>);
      instance  = tree.getMountedInstance();
      vdom      = tree.getRenderOutput();

      //replace the action with a spy to check if the action is called
      Actions.filterText = sinon.spy();
      //children is a function because of the translated message is put in the placeholder
      tree.props.children().props.onChange( {target : { value : 14} } )
  });

  it('should render a BoardSearchBar', () => {
      expect(instance.constructor.name).to.eql('BoardSearchBar');
  });

  it('the state is modified after user input', () => {
      expect(instance.state.value).to.eql(14);
  });

  it('Should emit filterText Action after user input', () => {
      Actions.filterText.should.have.been.calledWith(14);
  });

  it('Should emit filterText Action with the right value', () => {
      Actions.filterText.should.have.not.been.calledWith(13);
  });
});
