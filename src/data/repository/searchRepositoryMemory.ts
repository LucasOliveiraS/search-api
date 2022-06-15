import SearchRepository from '../../core/contracts/businessSearchRepository';

export default class SearchRepositoryMemory implements SearchRepository {
  loadData() {
    return {
      Posts: [
        {
          id: 1,
          title: 'Post Test',
          categories: ['A', 'B'],
        },
      ],
    };
  }

  search(params: any) {
    const data: any = this.loadData();
    const text = data['Posts'][0]['title'];
    const result = text.search(params.params.term);

    if (result !== -1) {
      return data['Posts'];
    }
    return 'Not found';
  }
}
