import React                                from 'react';
import chai                                 from 'chai';
import {createRenderer}                     from 'react-addons-test-utils';
import SkinDeep                             from 'skin-deep';
import sinon                                from 'sinon';
import sinonChai                            from 'sinon-chai';

import AddBoard                             from '../AddBoard';

const { expect } = chai;

chai.should();
chai.use(sinonChai);

describe('Add Board', () => {

  let vdom, instance, tree;
  let onBoardSubmitSpy;
  beforeEach( () => {
      onBoardSubmitSpy = sinon.spy();
      tree      = SkinDeep.shallowRender(<AddBoard onBoardSubmit={onBoardSubmitSpy}/>);
      instance  = tree.getMountedInstance();
      vdom      = tree.getRenderOutput();

      tree.props.children[0].props.children().props.onChange( {target : {value : 'newBoard'} } );
      tree.props.children[1].props.children().props.onChange( {target : {value : 'description'} } );
  });

  it('should render a AddBoard Form', () => {
      expect(instance.constructor.name).to.eql('AddBoard');
  });

  it('the state is modified after user input', () => {
      expect(instance.state.name).to.eql('newBoard');
  });

  it('should submit a new board with the state values', () => {
      let e = { preventDefault : sinon.spy() }
      tree.props.onSubmit(e);
      e.preventDefault.should.have.been.called;
      onBoardSubmitSpy.should.have.been.calledWith({name : 'newBoard', description : 'description'})
  });

  it('shouldn\'t submit a new board with empty values', () => {
      tree.props.children[0].props.children().props.onChange( {target : {value : ''} } );
      tree.props.children[1].props.children().props.onChange( {target : {value : ''} } );
      let e = { preventDefault : sinon.spy() }
      tree.props.onSubmit(e);
      onBoardSubmitSpy.should.not.have.been.calledWith({name : '', description : ''})
  });

});
