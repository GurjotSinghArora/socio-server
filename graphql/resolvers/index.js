const postsResolvers = require('./posts');
const usersResolvers = require('./users');


module.exports = {
    Post:{
        likeCount(parent){
            return parent.likes.length
        }
    },

    Query:{
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    }


};