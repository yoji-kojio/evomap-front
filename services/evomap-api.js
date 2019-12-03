export default class EvomapApi {
  constructor(axios, resource) {
    this.axios = axios;
    this.resource = resource;
  }

  create(params) {
    return this.axios.post(this.resourceUrl, params);
  }

  update(id, params) {
    return this.axios.put(this.singleResourceUrl(id), params);
  }

  delete(id) {
    return this.axios.delete(this.singleResourceUrl(id));
  }

  get(params) {
    return this.axios.get(this.resourceUrl, params);
  }

  getUserCareerByUsername(username) {
    return this.axios.get(`${this.resourceUrl}/${username}/get-career`, {});
  }

  getUserRequirementsByUsername(username) {
    return this.axios.get(`${this.resourceUrl}/${username}/get-requirements`, {});
  }

  getUserRecommendedContents(username) {
    return this.axios.get(`${this.resourceUrl}/${username}/get-recommended-contents`, {});
  }

  finishRequirement(userRequirementId) {
    return this.axios.get(`http://localhost:3000/api/v1/user_requirements/${userRequirementId}/finish-requirement`, {});
  }

  getOne(id, childResource) {
    return this.axios.get(this.singleResourceUrl(id, childResource));
  }

  get resourceUrl() {
    return `/${this.resource}`;
  }

  singleResourceUrl(id, childResource) {
    const child = childResource ? `/${childResource}` : '';
    return `${this.resourceUrl}/${id}${child}`;
  }
}