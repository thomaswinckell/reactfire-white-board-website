import React                                from 'react';
import chai                                 from 'chai';
import {createRenderer}                     from 'react-addons-test-utils';
import SkinDeep                             from 'skin-deep';
import sinon                                from 'sinon';
import sinonChai                            from 'sinon-chai';

import * as ErrorActions                    from '../../error/ErrorActions';

import { Store }                            from 'airflux';
import Firebase                             from 'firebase';


//FIXME
//import { default as AuthStore, __RewireAPI__ as AuthStoreRewire }  from '../AuthStore';
/*
const firebaseUrlTest = 'whiteboardtest.firebaseio.com';
//AuthStore.__Rewire__('firebaseUrl', firebaseUrlTest);
AuthStoreAPI.__set__('firebaseUrl', firebaseUrlTest);
AuthStoreAPI.__ResetDependency__('firebaseUrl');
const { expect } = chai;
*/

chai.should();
chai.use(sinonChai);


describe('AuthStore', () => {

  let vdom, instance, tree;

  beforeEach( () => {

  });

  //TODO need a way to mock FirebaseUrl
  //Actually config is overwrite
  it('should connect to Firebase', () => {

  });
});
