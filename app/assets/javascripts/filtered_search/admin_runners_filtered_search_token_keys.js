import FilteredSearchTokenKeys from './filtered_search_token_keys';

const tokenKeys = [{
  key: 'status',
  type: 'string',
  param: 'status',
  symbol: '',
  icon: 'messages',
  tag: 'status',
}];

const AdminRunnersFilteredSearchTokenKeys = new FilteredSearchTokenKeys(tokenKeys);

export default AdminRunnersFilteredSearchTokenKeys;
