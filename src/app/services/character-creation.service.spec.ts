import { TestBed } from '@angular/core/testing';

import { CharacterCreationService } from './character-creation.service';

describe('CharacterCreationService', () => {
  let service: CharacterCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
