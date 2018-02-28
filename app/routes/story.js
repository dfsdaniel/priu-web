import { A } from '@ember/array'
import Route from '@ember/routing/route';

export default Route.extend({
  
  model(params) {    
    const st01 = this.store.createRecord('story', {
        id: 1,
        title: 'Como usuário eu quero cadastrar filme no sistema',
        description: 'Descrição da story 01',
        benefit: 3,
        penalty: 5,
        cost: 3,
        risk: 3,
    });
    
    const comments = A();
    comments.push(this.store.createRecord('story-comment', {
        story: st01,
        dateTime: '02/28/2018 15:00',
        content: 'Comentário 01',

    }));
    comments.push(this.store.createRecord('story-comment', {
        story: st01,
        dateTime: '02/28/2018 13:00',
        content: 'Comentário 02'
    }));
    st01.set('comments', comments);
    
    this.store.createRecord('story', {
        id: 2,
        title: 'Como usuário eu quero listar todos os filmes',
        description: 'Descrição da story 02',
        benefit: 8,
        penalty: 2,
        cost: 8,
        risk: 8,
    });

    return this.store.peekRecord('story', params.story_id);
  }
});
