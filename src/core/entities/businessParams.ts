export type Paramemeters = {
  term: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  categories?: string;
  openNow?: boolean;
  openAt?: number;
  sortBy?: string;
  limit?: number;
  offset?: number;
};

export class BusinessParams {
  params: Paramemeters;

  constructor(params: Paramemeters) {
    this.params = params;
    this.params.radius = params.radius || 10;
    this.params.openNow = params.openNow || false;
    this.params.sortBy = params.sortBy || 'best_match';
    this.params.limit = params.limit || 10;
    this.params.offset = params.offset || 0;

    this.validate();
  }

  isValidParameters(params: Paramemeters): params is Paramemeters {
    const keys = [
      'term',
      'latitude',
      'longitude',
      'radius',
      'categories',
      'openNow',
      'openAt',
      'sortBy',
      'limit',
      'offset',
    ];
    return Object.keys(params).every((key) => keys.includes(key));
  }

  validateParameters() {
    if (!this.isValidParameters(this.params)) {
      throw new Error('Invalid search parameter');
    }
  }

  validateTerm() {
    if (!this.params.term) {
      throw new Error('Search term cannot be empty');
    }
  }

  validateRadius() {
    if (this.params.radius && this.params.radius > 50) {
      throw new Error('Radius cannot be greater than 50km');
    }
  }

  validateSortBy() {
    if (
      this.params.sortBy &&
      !['best_match', 'distance', 'price'].includes(this.params.sortBy)
    ) {
      throw new Error('Invalid sortBy value');
    }
  }

  validateSortByGeolocation() {
    if (
      this.params.sortBy == 'distance' &&
      !this.params.latitude &&
      !this.params.longitude
    ) {
      throw new Error('Must specify lat and lng');
    }
  }

  validate() {
    this.validateParameters();
    this.validateTerm();
    this.validateRadius();
    this.validateSortBy();
    this.validateSortByGeolocation();
  }
}
