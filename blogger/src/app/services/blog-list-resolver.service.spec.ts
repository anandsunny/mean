import { TestBed } from '@angular/core/testing';

import { BlogListResolverService } from './blog-list-resolver.service';

describe('BlogListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogListResolverService = TestBed.get(BlogListResolverService);
    expect(service).toBeTruthy();
  });
});
