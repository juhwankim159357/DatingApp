import { TestBed } from '@angular/core/testing';

import { MemberListResolver } from './member-list.resolver';

describe('MemberListResolver', () => {
  let resolver: MemberListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MemberListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
